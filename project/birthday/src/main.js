
define(function (require) {
    require('./single').init();
    require('./snow').snow();
    if (location.search.indexOf('a') !== -1) {
        $('#audio').attr('src', "resource/birthday.mp3");
    }
    console.log('Powered by strwind');
});
