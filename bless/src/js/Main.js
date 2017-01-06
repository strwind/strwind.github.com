import css from '../less/main.less';

const Main = {
    init: function () {
        this.slideUp();
        this.slideRow();
    },
    
    
    slideUp: function () {
        var swiper = new Swiper('.swiper-container-up', {
            paginationClickable: true,
            direction: 'vertical'
        });
    },
    
    slideRow: function () {
        var swiper = new Swiper('.swiper-container-row', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            }
        });
    }
    
};

Main.init();
