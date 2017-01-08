
const Model = require('./Model.js');
const Util = require('./Util.js');
const Swiper = require('../lib/swiper.min.js');

const ROOT_SRC = "./build/img/";
const CURRENT_INDEX = 0;

const Main = {
    init: function() {
        this.rowSwiperWrapper = document.querySelector('#rowSwiperWrapper');
        this.page1Img = document.querySelector('#page1Img');
        this.keyWord = document.querySelector('#keyWord');
        this.linkList = document.querySelector('#linkList');
        this.initSlideUp();
        this.initSlideRow();
        this.rendRowAdvice();
        this.bindEvent();
    },
    
    rendSlideUp: function() { 
        let name = Util.getQuery('imgName') || Model.defaultImg;
        this.page1Img.src = ROOT_SRC + name;
    },
    
    rendRowSlide: function() {
        let imgList = this.getRandomImgList();
        let tempHtml = '';
        imgList.forEach((imgName, index)=> {
            tempHtml += `<div class="swiper-slide">
                             <img class="swiper-img" data-index="${index}" src="${ROOT_SRC + imgName}">
                         </div>`;
        });
        this.rowSwiperWrapper.innerHTML = tempHtml;
    },
    
    rendRowAdvice: function (index) {
        index = index || CURRENT_INDEX;
        let tempHtml = '';
        let item = Model.imgGroup[index];
        item.links.forEach(function(link, index) {
            if (index < 4) {
                tempHtml += `<li><a href="${link.url}">${link.text}</a></li>`;
            }
        });
        this.linkList.innerHTML = tempHtml;
        this.keyWord.innerHTML = item.title;
    },
    
    getRandomImgList: function() {
        let random = Math.random();
        let list = [];
        Model.imgGroup.forEach(function(item) {
            let index = Math.floor(random * item.path.length);
            let name = item.path[index];
            list.push(name);
        });
        return list;
    },

    initSlideUp: function() {
        this.rendSlideUp();
        let self = this;
        let swiper = new Swiper('.swiper-container-up', {
            paginationClickable: true,
            direction: 'vertical',
            onTransitionEnd: function(swiper){
              // 滑下来后，锁住别往上滑动了
              if (swiper.activeIndex === 1) {
                  swiper.lockSwipes();
              }
            }
        });
    },
    
    initSlideRow: function() {
        this.rendRowSlide();
        if (!this.rowSwiperImgList) {
            this.rowSwiperImgList = this.rowSwiperWrapper.querySelectorAll('.swiper-img');
        }
        let self = this;
        this.swiperRow = new Swiper('.swiper-container-row', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: CURRENT_INDEX,
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            onTransitionStart: function(swiper){
                let imgIndex = swiper.activeIndex;
                let newImgList = self.getRandomImgList();
                // 替换图片
                if (self.rowSwiperImgList) {
                    Util.setQuery('imgName', newImgList[imgIndex]);
                    setTimeout(()=>{
                        if (newImgList[imgIndex - 1] && self.rowSwiperImgList[imgIndex - 1]) {
                             self.rowSwiperImgList[imgIndex - 1].src = ROOT_SRC + newImgList[imgIndex- 1];
                        }
                        if (newImgList[imgIndex + 1] && self.rowSwiperImgList[imgIndex + 1]) {
                             self.rowSwiperImgList[imgIndex + 1].src = ROOT_SRC + newImgList[imgIndex + 1];
                        }
                    }, 0);
                }
                // 替换推荐
                self.rendRowAdvice(imgIndex);
            }
        });
    },
    
    bindEvent: function () {
        let imgList = this.getRandomImgList();
        let next = true;
        document.querySelector('.swiper-container-row').addEventListener('click', function (e) {
            let index = e.target.getAttribute('data-index');
            if ( index == imgList.length - 1) {
                next = false;
            }
            if (index == 0) {
                next = true;
            }
            next ? this.swiperRow.slideNext() : this.swiperRow.slidePrev();
        }.bind(this), false);
        
    }
};

Main.init();
