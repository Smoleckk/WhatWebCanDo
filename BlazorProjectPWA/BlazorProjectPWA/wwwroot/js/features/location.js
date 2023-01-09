//<!--location-->
function getLocation() {
    var target = document.getElementById('target');
    var watchId;

    function appendLocation(location, verb) {
        verb = verb || 'updated';
        var newLocation = document.createElement('p');
        newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
        target.appendChild(newLocation);
    }

    if ('geolocation' in navigator) {
        document.getElementById('askButton').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(function (location) {
                appendLocation(location, 'fetched');
            });
            watchId = navigator.geolocation.watchPosition(appendLocation);
        });
    } else {
        target.innerText = 'Geolocation API not supported.';
    }
}

function readBatteryLevel() {
    var $target = document.getElementById('target');

    if (!('bluetooth' in navigator)) {
        $target.innerText = 'Bluetooth API not supported.';
        return;
    }

    navigator.bluetooth.requestDevice({
        filters: [{
            services: ['battery_service']
        }]
    })
        .then(function (device) {
            return device.gatt.connect();
        })
        .then(function (server) {
            return server.getPrimaryService('battery_service');
        })
        .then(function (service) {
            return service.getCharacteristic('battery_level');
        })
        .then(function (characteristic) {
            return characteristic.readValue();
        })
        .then(function (value) {
            $target.innerHTML = 'Battery percentage is ' + value.getUint8(0) + '.';
        })
        .catch(function (error) {
            $target.innerText = error;
        });
}

function getOrientation() {
    var $ = document.querySelector.bind(document);
    var $$ = function (selector) {
        return [].slice.call(document.querySelectorAll(selector), 0);
    }
    var target = $('#logTarget');

    function logChange(event) {
        var timeBadge = new Date().toTimeString().split(' ')[0];
        var newState = document.createElement('p');
        newState.innerHTML = '' + timeBadge + ' ' + event + '.';
        target.appendChild(newState);
    }

    var prefix = null;
    if ('requestFullscreen' in document.documentElement) {
        prefix = 'fullscreen';
    } else if ('mozRequestFullScreen' in document.documentElement) {
        prefix = 'mozFullScreen';
    } else if ('webkitRequestFullscreen' in document.documentElement) {
        prefix = 'webkitFullscreen';
    } else if ('msRequestFullscreen') {
        prefix = 'msFullscreen';
    }

    var onFullscreenChange = function () {
        var elementName = 'not set';
        if (document[prefix + 'Element']) {
            elementName = document[prefix + 'Element'].nodeName;
        }
        logChange('New fullscreen element is ' + elementName + '');
        onFullscreenHandler(!!document[prefix + 'Element']);
    }

    if (document[prefix + 'Enabled']) {
        var onFullscreenHandler = function (started) {
            $('#exit').style.display = started ? 'inline-block' : 'none';
            $$('.start').forEach(function (x) {
                x.style.display = started ? 'none' : 'inline-block';
            });
        };

        document.addEventListener(prefix.toLowerCase() + 'change', onFullscreenChange);

        var goFullScreen = null;
        var exitFullScreen = null;
        if ('requestFullscreen' in document.documentElement) {
            goFullScreen = 'requestFullscreen';
            exitFullScreen = 'exitFullscreen';
        } else if ('mozRequestFullScreen' in document.documentElement) {
            goFullScreen = 'mozRequestFullScreen';
            exitFullScreen = 'mozCancelFullScreen';
        } else if ('webkitRequestFullscreen' in document.documentElement) {
            goFullScreen = 'webkitRequestFullscreen';
            exitFullScreen = 'webkitExitFullscreen';
        } else if ('msRequestFullscreen') {
            goFullScreen = 'msRequestFullscreen';
            exitFullScreen = 'msExitFullscreen';
        }

        var goFullscreenHandler = function (element) {
            return function () {
                var maybePromise = element[goFullScreen]();
                if (maybePromise && maybePromise.catch) {
                    maybePromise.catch(function (err) {
                        logChange('Cannot acquire fullscreen mode: ' + err);
                    });
                }
            };
        };

        $('#startFull').addEventListener('click', goFullscreenHandler(document.documentElement));
        $('#startBox').addEventListener('click', goFullscreenHandler($('#box')));

        $('#exit').addEventListener('click', function () {
            document[exitFullScreen]();
        });
    }
}