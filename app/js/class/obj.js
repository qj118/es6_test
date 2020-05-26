{
    let o = 1;
    let k = 2;
    // ES5 初始化属性
    let es5 = {
        o: o,
        k: k,
    };
    // ES6 初始化属性
    let es6 = { 
        o,
        k,
    };
    console.log(es5, es6); // {o: 1, k: 2} {o: 1, k: 2}

    // ES5 定义对象中的方法
    let es5_method = {
        hello: function(){
            console.log('hello');
        }
    };
    // ES6 定义对象中的方法
    let es6_method = {
        hello(){
            console.log('hello');
        }
    };
    es5_method.hello(); // hello
    es6_method.hello(); // hello
}

// 属性表达式
{
    let a = 'b';
    let es5 = {
        b: 'c',
    };
    let es6 = {
        [a]: 'c', // [a], 表示取变量 a 的值作为属性名
    };

    console.log(es5, es6); // {b: "c"} {b: "c"}
}

// 新增 API
{
    // Object.is 与 === 的功能相同
    console.log('字符串', Object.is('mmq', 'mmq'), 'mmq' === 'mmq');
    console.log('数组', Object.is([], []), [] === []); // 数组属于引用类型，两个数组就算内容相同但也不是同一个对象
}

{
    // Object.assign
    let aObj = {
        a: 'a',
        b: 'b',
    };
    let bObj = {
        c: 'c',
        d: 'd',
    };
    /**
     * 将第二个往后的所有参数对象中的属性拷贝到第一个参数对象中；
     * 1. 只拷贝自身属性，不拷贝继承属性；
     * 2. 只拷贝可枚举属性；
     * 3. 拷贝属于深拷贝。
     */
    Object.assign(aObj, bObj); 
    console.log(aObj); // {a: "a", b: "b", c: "c", d: "d"}
    console.log(bObj); // {c: "c", d: "d"}
}

{
    let test = {
        k: 123,
        o: 456,
    };
    // 遍历对象属性
    for(let [key, value] of Object.entries(test)){
        console.log(key + " = " + value);
    }
}

// 对象的扩展运算符
{
    // 复制对象，深拷贝
    let aObj = {
        a: 1,
        b: 2,
    };
    let bObj = {...aObj};
    console.log('bObj', bObj); // bObj {a: 1, b: 2}
    console.log(aObj === bObj); // false
    // 等同于使用 Object.assign 做以下操作
    let cObj = Object.assign({}, aObj);
    console.log('cObj', cObj); // cObj {a: 1, b: 2}
    console.log(aObj === cObj); // false
}

{
    // 合并对象，深拷贝
    let aObj = {
        a: 1,
        b: 2,
    };
    let bObj = {
        c: 3,
        d: 4,
    };
    let cObj = {...aObj, ...bObj};
    console.log('cObj', cObj); // cObj {a: 1, b: 2, c: 3, d: 4}
    // 等同于使用 Object.assign 做以下操作
    console.log(Object.assign({}, aObj, bObj)); // {a: 1, b: 2, c: 3, d: 4}
}

{
    // 与解构赋值相结合
    let {a, b, ...c} = {
        a: 'mmq',
        b: 'she',
        c: 'demon',
        d: 'kong',
    } ;
    console.log(c); // {c: "demon", d: "kong"}
}