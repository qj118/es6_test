// 基本定义
{
    let tell = function* (){
        yield 'a';
        yield 'b';
        return 'c';
    };

    let k = tell();

    /**
     * generator 通过 yield 和 next 相配合;
     *  1. next 每执行一次到 yield 停止，并将 yield 的值写入 value 中；
     *  2. 如果遇到 return ，将 return 的值写入 value，并将 done 置成 true；
     *  3. 如果没有 return，读不值的时候，即 value 为 undefined 时候，done 置成 true。
     */
    console.log(k.next()); // {value: "a", done: false}
    console.log(k.next()); // {value: "b", done: false}
    console.log(k.next()); // {value: "c", done: true}
    console.log(k.next()); // {value: undefined, done: true}
}

// 使用 generator 作为迭代器
{
    let obj = {};
    obj[Symbol.iterator] = function* (){
        yield 1;
        yield 2;
        yield 3;
    }

    for(let value of obj){
        console.log('value', value); // value 1 2 3
    }
}

// 处理状态机
{
    let state = function* (){
        while(1){
            yield 'A';
            yield 'B';
            yield 'C';
        }
    }
    let status = state();
    for(let i = 0; i < 7; i++){
        console.log(status.next()); // value 在 3 中状态中循环
    }
}

/** 示例: 控制抽奖次数
 * 将抽奖逻辑和抽奖次数限制隔离开，用 generator 实现次数的限制。
 */

{
    let draw = function(count){
        // 具体抽奖逻辑省略
        console.info(`剩余 ${count} 次`);
    }

    let residue = function* (count){
        while(count > 0){
            count --;
            yield draw(count);
        }
    }

    let star = residue(5);
    let btn = document.createElement('button');
    btn.id = 'start';
    btn.textContent = '抽奖';
    document.body.appendChild(btn);
    document.getElementById('start').addEventListener('click', () => {
        star.next();
    }, false);
}

/**
 * 示例：长轮询
 * 定时去服务器获取新的状态。
 */
{
    let ajax = function* (){
        yield new Promise((resolve, reject) => {
            // 模拟接口逻辑
            setTimeout(() => {
                resolve({code: 0}); 
            }, 200);
        }); // 这个时候 generator 返回的就是一个 value 值为 Promise 的实例。
    };

    let pull = () => {
        let generator = ajax();
        let step = generator.next();
        // 获取 Promise，并调用 then。
        step.value.then((d) => {
            /**
             * resolve 函数：
             *  如果传递过来的值是 0，则返回；
             *  如果传递过来的值不是零，则循环等待。
             */
            if(d.code != 0){ 
                setTimeout(() => {
                    console.info('wait'); 
                    pull();
                },1000);
            }else{
                console.info(d);
            }
        });
    };

    /**
     * 1. resolve({code: 0}) 则直接输出 {code: 0}
     * 2. resolve({code: 1}) 则每隔1s输出一个 wait。
     */
    pull();
}