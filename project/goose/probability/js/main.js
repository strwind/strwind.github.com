/*
10根红头棍子 + 10根绿头棍子
每轮抽十次
10根相同得100块
9根相同得50块？
5根相同得-50块
愿意玩么？
*/

/**
 * 概率单例 
 */
var probability = {
    /**
     * 阶乘计算公式 
     * @param {number} n
     * @return {number} 阶乘的值
     */
    factorial: function (n) {
        if (n <= 1) {
            return 1;
        }
        else {
            return n * arguments.callee( n-1 );
        }
    },
    /**
     * A(n,m) 排列计算 
     * @param {number} m 参与选择的元素个数
     * @param {number} n 元素的总个数
     * @return {number} 排列个数 
     */
    getAnm: function (m, n) {
        if (m > n) {
            return -1;
        }
        return this.factorial(n) / this.factorial(n - m);
    },
    
    /**
     * C(n,m) 组合计算 
     * @param {number} m 参与选择的元素个数
     * @param {number} n 元素的总个数
     * @return {number} 组合个数 
     */
    getCnm: function (m, n) {
        if (m > n) {
            return -1;
        }
        return this.getAnm(m, n) / this.factorial(m);
    }
};

var game = {
    
    /**
     * 棍子总数 
     * @type {number}
     */
    total: 20,
    
    /**
     * 每队棍子的根数
     * @type {number}
     */
    team: 10,
    
    /**
     * 获取抽到指定个数的概率
     * @param {number} n 需要相同的个数
     * @return {number} 概率 
     */
    getRatio: function (n) {
        return probability.getCnm(n, this.team) / probability.getCnm(this.team, this.total);
    }
};


//10根相同得100，抽到的十根有可能是红的，也有可能是绿的，所以乘以2
var same10 = game.getRatio(10) * 2 * 100;

//9根相同得50
var same9 = game.getRatio(9) * 2 * 50;

//5根相同得-50
var same5 = game.getRatio(5) * 2 * 50;

if (same10 + same9 > same5) {
    console.log('和你玩');
}
else {
    console.log('不和你玩');
}

console.log(same10 + same9);
console.log(same5);

