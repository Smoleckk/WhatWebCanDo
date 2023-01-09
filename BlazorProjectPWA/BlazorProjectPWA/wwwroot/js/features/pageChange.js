//page change
function hiddenPage() {
    var target = document.getElementById('target');

    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else {
        target.innerText = 'Page Visibility API not supported.';
    }

    function handleVisibilityChange() {
        var timeBadge = new Date().toTimeString().split(' ')[0];
        var newState = document.createElement('p');
        newState.innerHTML = '' + timeBadge + ' Page visibility changed to ' + (document[hidden] ? 'hidden' : 'visible') + '.';
        target.appendChild(newState);
    }

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    if (hidden in document) {
        document.getElementById('status').innerHTML = document[hidden] ? 'hidden' : 'visible';
    }
}

function getUserMedia(constraints) {
    // if Promise-based API is available, use it
    if (navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // otherwise try falling back to old, possibly prefixed API...
    var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (legacyApi) {
        // ...and promisify it
        return new Promise(function (resolve, reject) {
            legacyApi.bind(navigator)(constraints, resolve, reject);
        });
    }
}

function getStream(type) {
    if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {};
    constraints[type] = true;

    getUserMedia(constraints)
        .then(function (stream) {
            var mediaControl = document.querySelector(type);

            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            mediaControl.play();
        })
        .catch(function (err) {
            alert('Error: ' + err);
        });
}