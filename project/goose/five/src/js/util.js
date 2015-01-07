/**
 * util工具单例 
 */
define(function (require) {
    var util = {
        /**
         * 权重方案 
         * 双：两个方向都可以走
         * 单：只有一个方向可以走
         * @param {number} nums 连子的个数
         * @param {boolean} prevSide 正方向是否可以走
         * @param {boolean} nextSide 反方向是否可以走
         * @param {boolean} isAI 该步是否是ai在下棋
         */
        weightStatus: function(nums, prevSide, nextSide, isAI) {
            var weight = 0;
            switch (nums) {
            case 1:
                if (prevSide && nextSide) {
                    weight = isAI ? 15 : 10; //双一 
                }
                break;
            case 2:
                if (prevSide && nextSide) {
                    weight = isAI ? 100 : 50; //双二 
                }
                else if (prevSide || nextSide) {
                    weight = isAI ? 10 : 5; //单二 
                }
                break;
            case 3:
                if (prevSide && nextSide) {
                    weight = isAI ? 500 : 200; //双三 
                }
                else if (prevSide || nextSide) {
                    weight = isAI ? 30 : 20; //单三 
                }
                break;
            case 4:
                if (prevSide && nextSide) {
                    weight = isAI ? 5000 : 2000; //双四 
                }
                else if (prevSide || nextSide) {
                    weight = isAI ? 400 : 100; //单四 
                }
                break;
            case 5:
                weight = isAI ? 100000 : 10000; //五 
                break;
            default:
                weight = isAI ? 500000 : 250000;
                break;
            }
            return weight;
        }
    };
    
    return util;
});
