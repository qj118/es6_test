{
    let arr = ['hello', 'es6'];
    // 调用 iterator 的接口
    let it = arr[Symbol.iterator]();
    // value 表示遍历的值，done 表示是否遍历完成
    console.log(it.next()); // {value: "hello", done: false} 
    console.log(it.next()); // {value: "es6", done: false}
    console.log(it.next()); // {value: undefined, done: true}
}

// 自定义 iterator 接口
{
    let obj = {
        start: [1, 3, 2],
        end: [7, 9, 8],
        [Symbol.iterator](){
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end); // 将 start 和 end 数组合并成一个数组
            let len = arr.length;
            return {
                next: () => {
                    if(index < len){
                        return {
                            value: arr[index++],
                            done: false,
                        };
                    }else{
                        return {
                            value: arr[index++],
                            done: true,
                        }
                    }
                }
            }; 
        },
    };

    for(let key of obj){
        console.log(key);
    }
}

// for of 循环只有在有 iterator 接口时才能使用
{
    let arr = ['hello', 'es6'];
    for(let value of arr){
        console.log('value', value); // value hello value es6
    }
}