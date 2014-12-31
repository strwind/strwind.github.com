
define(function (require) {
    require('./single').init();
    require('./snow').snow();
    $('#audio').attr('src', "resource/birthday.mp3");
    console.log('Powered by strwind');
});
