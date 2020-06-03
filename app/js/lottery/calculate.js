export default class Calculate{
    /**
     * 计算注数
     * @param {number} active 当前选中的号码的个数
     * @param {string} play_name 当前的玩法标识
     * @return {number} 注数
     */
    computeCount(active, play_name){
        let count = 0;
        const exist = this.play_list.has(play_name);
        const arr = new Array(active).fill('0'); // 初始化数组的个数并用0填充
        for(let i = 1; i <= active; i++)
        {
            arr[i-1] = i;
        }

        if(exist && play_name.at(0) === 'r'){ // 每一种组合玩儿法的标签是以 r 开头 + 选择的个数 的字符串
            count = Calculate.combine(arr, play_name.split('')[1]).length;
        }
        return count;
    }

    /**
     * 奖金范围预测
     * @param {number} active 当前选中的号码的个数
     * @param {string} play_name 当前的玩法标识
     * @return {array} 奖金范围
     */
    computeBonus(active, play_name){
        const self = this;
        const play  = play_name.split('');
        let arr = new Array(play[1] * 1).fill(0);
        let min, max;

        if(play[0] === 'r'){
            let min_active = 5 + active - 11; // 11 选 5  计算最小命中数
            if(min_active > 0){
                if(min_active - play[1] >= 0){ // 
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr, play[1]).length;
                }else{
                    if(play[1] - 5 > 0 && active - play[1] >= 0){ // 任五以上，并且选了多注
                        arr = new Array(active - 5).fill(0);
                        min = Calculate.combine(arr, play[1] -5).length;
                    }else{
                        min = active - play[1] > -1 ? 1 : 0;
                    }
                }
            }else{
                min = active - play[1] > -1 ? 1 : 0;
            }
            let max_active = Math.min(active, 5); // 计算最大命中数
            if(play[1] - 5 > 0){ // 任五以上
                if(active - play[1] >= 0){
                    arr = new Array(active - 5).fill(0);
                    max = Calculate.combine(arr, play[1] - 5).length;
                }else{
                    max = 0;
                }
            }else if(play[1] - 5 < 0){
                arr = new Array(max_active).fill(0);
                max = Calculate.combine(arr, play[1]).length;
            }else{
                max = 1;
            }
        }
        return [min, max].map(item => item * self.play_list.get(play_name).bonus);
    }

    /**
     * 组合运算[C(m, n)]，m 是玩法值，n 是选择的球的个数
     * @param {array} arr 参与组合运算的数组
     * @param {number} size 组合运算的基数，结果中每个元素的大小
     * @return {number} 计算注数
     */
    static combine(arr, size){
        let allResult = [];
        (function f(arr, size, result){
            let arrLen = arr.length;
            if(size > arrLen){
                return;
            }
            if(size === arrLen){
                allResult.push([].concat(result, arr)); // 剩下的数组中的个数刚好等于 size，直接写入结果数组即可
            }else{
                for(let i = 0; i < arrLen; i++){
                    let newResult = [].concat(result); // 每次循环新建一个result
                    newResult.push(arr[i]); // 将参数中的 result 和当前元素做连接
                    if(size === 1){ // size 为 1 时，说明该结果已经满足条件，直接放到最终的结果数组中
                        allResult.push(newResult);
                    }else{
                        let newArr = [].concat(arr);
                        newArr.splice(0, i + 1); // 删除前 i 个元素
                        f(newArr, size - 1, newResult);
                    }
                }
            }
        })(arr, size, []);
        //console.log(allResult);
        return allResult;
    }
}