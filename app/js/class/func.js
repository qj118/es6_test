// 默认值
{
    // 有默认值的参数后面不可以再跟没有默认值的参数
    function test(x, y = 'world'){
        console.log('default', x, y);
    }
    test(); // undefined world
    test('hello'); // hello world
    test('hello', 'es6'); // hello es6
}

// 作用域
{
    let x = 'test';
    function test(x, y = x){
        console.log('作用域', x, y); // 参数中的 x 会把块作用域中的 x 覆盖掉，导致取不到块作用域中的 x
    }
    test(); // undefined undefined
    test("she"); // she she 

    function test2(c, y = x){
        console.log('作用域', c, y);
    }
    test2("she"); // she test
}

// rest 参数
{
    // 将输入的参数转换为数组放入 arg 中，rest 参数后面不可以再有别的参数
    function test(...arg){
        console.log(arg);
        for(let v of arg){
            console.log('rest', v);
        }
    }

    test(10, 15, 'mmq'); // [10, 15, "mmq"]
}

// 扩展运算符
{
    // 将数组拆分成单个的元素
    console.log(...[2, 7, 7]); // 2 7 7
}

// 箭头函数
{
    /**
     * 函数名：arrow
     * @param   v
     * @returns v * 2 
     */
    let arrow = v => v * 2;
    console.log('arrow', arrow(7));

    let arrow2 = () => 5; // 无需传参的时候，用()代替参数的位置
    console.log('arrow', arrow2());
}

// 尾调用
{
    function tail(x){
        console.log('tail', x);
    }
    function fx(x){
        return tail(x);
    }
    fx(277);
}