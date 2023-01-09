﻿//<!--clickboard copy-->
function copy() {

    var logTarget = document.getElementById('logTarget');

    function useAsyncApi() {
        return document.querySelector('input[value=async]').checked;
    }

    function log(event) {
        var timeBadge = new Date().toTimeString().split(' ')[0];
        var newInfo = document.createElement('p');
        newInfo.innerHTML = '' + timeBadge + ' ' + event + '.';
        logTarget.appendChild(newInfo);
    }

    function performCopyEmail() {
        var selection = window.getSelection();
        var emailLink = document.querySelector('.js-emaillink');

        if (useAsyncApi()) {
            navigator.clipboard.writeText(emailLink.textContent)
                .then(() => log('Async writeText successful, "' + emailLink.textContent + '" written'))
                .catch(err => log('Async writeText failed with error: "' + err + '"'));
        } else {
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNode(emailLink);
            selection.addRange(range);

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                log('Copy email command was ' + msg);
            } catch (err) {
                log('execCommand Error', err);
            }

            selection.removeAllRanges();
        }
    }

    function performCutTextarea() {
        var cutTextarea = document.querySelector('.js-cuttextarea');

        if (useAsyncApi()) {
            navigator.clipboard.writeText(cutTextarea.textContent)
                .then(() => {
                    log('Async writeText successful, "' + cutTextarea.textContent + '" written');
                    cutTextarea.textContent = '';
                })
                .catch(err => log('Async writeText failed with error: "' + err + '"'));
        } else {
            var hasSelection = document.queryCommandEnabled('cut');
            cutTextarea.select();

            try {
                var successful = document.execCommand('cut');
                var msg = successful ? 'successful' : 'unsuccessful';
                log('Cutting text command was ' + msg);
            } catch (err) {
                log('execCommand Error', err);
            }
        }
    }

    function performPaste() {
        var pasteTextarea = document.querySelector('.js-cuttextarea');

        if (useAsyncApi()) {
            navigator.clipboard.readText()
                .then((text) => {
                    pasteTextarea.textContent = text;
                    log('Async readText successful, "' + text + '" written');
                })
                .catch((err) => log('Async readText failed with error: "' + err + '"'));
        } else {
            pasteTextarea.focus();
            try {
                var successful = document.execCommand('paste');
                var msg = successful ? 'successful' : 'unsuccessful';
                log('Pasting text command was ' + msg);
            } catch (err) {
                log('execCommand Error', err);
            }
        }
    }

    // Get the buttons
    var cutTextareaBtn = document.querySelector('.js-textareacutbtn');
    var copyEmailBtn = document.querySelector('.js-emailcopybtn');
    var pasteTextareaBtn = document.querySelector('.js-textareapastebtn');

    // Add click event listeners
    copyEmailBtn.addEventListener('click', performCopyEmail);
    cutTextareaBtn.addEventListener('click', performCutTextarea);
    pasteTextareaBtn.addEventListener('click', performPaste);

    function logUserOperation(event) {
        log('User performed ' + event.type + ' operation. Payload is: ' + event.clipboardData.getData('text/plain') + '');
    }

    document.addEventListener('cut', logUserOperation);
    document.addEventListener('copy', logUserOperation);
    document.addEventListener('paste', logUserOperation);

}