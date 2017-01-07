import css from '../less/main.less';
import Model from './Model.js';

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
        let name = this.getQuery('imgName') || Model.defaultImg;
        this.page1Img.src = ROOT_SRC + name;
    },
    
    rendRowSlide: function() {
        let imgList = this.getRandomImgList();
        let tempHtml = '';
        imgList.forEach((imgName)=> {
            tempHtml += `
               <div class="swiper-slide">
                    <img class="swiper-img" src="${ROOT_SRC + imgName }">
                </div>
            `;
        });
        this.rowSwiperWrapper.innerHTML = tempHtml;
    },
    
    rendRowAdvice: function (index) {
        index = index || CURRENT_INDEX;
        let tempHtml = '';
        let item = Model.imgGroup[index];
        item.links.forEach((link, index)=> {
            if (index < 4) {
                tempHtml += `
                   <li><a href="${link.url}">${link.text}</a></li>
                `;
            }
        });
        this.linkList.innerHTML = tempHtml;
        this.keyWord.innerHTML = item.title;
    },
    
    getRandomImgList: function() {
        let random = Math.random();
        let list = [];
        Model.imgGroup.forEach((item)=> {
            let index = Math.floor(random * item.path.length);
            let name = item.path[index];
            list.push(name);
        });
        return list;
    },
    
    getQuery: function(query) {
        let hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        let map = {};
        hash.map((item)=> {
            let arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        return map[query];
    },
    
    setQuery: function(key, value) {
        let hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        let map = {};
        hash.map((item)=> {
            let arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        map[key] = value;
        let resultHash = '#';
        for(let i in map) {
            if (i && map[i]) {
                resultHash += i + '=' + map[i] + '&';
            }
        }
        document.location.hash = resultHash;
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
                let imgIndex = swiper.activeIndex;
                let newImgList = self.getRandomImgList();
                // 替换图片
                if (self.rowSwiperImgList) {
                    let imgName = newImgList[imgIndex];
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
