//share
function share() {
    if (!("share" in navigator)) {
        alert('Web Share API not supported.');
        return;
    }

    navigator.share({
        title: 'What Web Can Do Today',
        text: 'Can I rely on the Web Platform features to build my app? An overview of the device integration HTML5 APIs',
        url: 'https://whatwebcando.today/'
    })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error));
}