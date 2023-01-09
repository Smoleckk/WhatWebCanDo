//<!--file access-->
function getReadFile(reader, i) {
    return function () {
        var li = document.querySelector('[data-idx="' + i + '"]');

        li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
    }
}

function readFiles(files) {
    document.getElementById('count').innerHTML = files.length;

    var target = document.getElementById('target');
    target.innerHTML = '';

    for (var i = 0; i < files.length; ++i) {
        var item = document.createElement('li');
        item.setAttribute('data-idx', i);
        var file = files[i];

        var reader = new FileReader();
        reader.addEventListener('load', getReadFile(reader, i));
        reader.readAsText(file);

        item.innerHTML = '' + file.name + ', ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '';
        target.appendChild(item);
    };
}