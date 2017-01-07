//import css from '../less/main.less';

const Model = require('./Model.js');
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
    },
    
    rendSlideUp: function() { 
        var name = this.getQuery('imgName') || Model.defaultImg;
        this.page1Img.src = ROOT_SRC + name;
    },
    
    rendRowSlide: function() {
        var imgList = this.getRandomImgList();
        var tempHtml = '';
        imgList.forEach(function(imgName) {
            tempHtml += '<div class="swiper-slide">';
            tempHtml +=     '<img class="swiper-img" src="' + ROOT_SRC + imgName + '">';
            tempHtml += '</div>';
        });
        this.rowSwiperWrapper.innerHTML = tempHtml;
    },
    
    rendRowAdvice: function (index) {
        index = index || CURRENT_INDEX;
        var tempHtml = '';
        var item = Model.imgGroup[index];
        item.links.forEach(function(link, index) {
            if (index < 4) {
                tempHtml += '<li><a href="' + link.url + '">' + link.text + '</a></li>';
            }
        });
        this.linkList.innerHTML = tempHtml;
        this.keyWord.innerHTML = item.title;
    },
    
    getRandomImgList: function() {
        var random = Math.random();
        var list = [];
        Model.imgGroup.forEach(function(item) {
            var index = Math.floor(random * item.path.length);
            var name = item.path[index];
            list.push(name);
        });
        return list;
    },
    
    getQuery: function(query) {
        var hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        var map = {};
        hash.map(function(item) {
            var arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        return map[query];
    },
    
    setQuery: function(key, value) {
        var hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        var map = {};
        hash.map(function(item) {
            var arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        map[key] = value;
        var resultHash = '#';
        for(var i in map) {
            if (i && map[i]) {
                resultHash += i + '=' + map[i] + '&';
            }
        }
        document.location.hash = resultHash;
    },
    
    initSlideUp: function() {
        this.rendSlideUp();
        var self = this;
        var swiper = new Swiper('.swiper-container-up', {
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
        var self = this;
        var swiper = new Swiper('.swiper-container-row', {
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
                var imgIndex = swiper.activeIndex;
                var newImgList = self.getRandomImgList();
                // 替换图片
                if (self.rowSwiperImgList) {
                    var imgName = newImgList[imgIndex];
                    self.setQuery('imgName', imgName);
                    self.rowSwiperImgList[imgIndex].src = ROOT_SRC + imgName;
                }
                // 替换推荐
                self.rendRowAdvice(imgIndex);
            }
        });
    }
    
};

Main.init();
