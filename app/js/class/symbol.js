// Symbol 用来提供一个独一无二的值。
{
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1 === a2); // false

    /** 
     *  为 symbol 变量声明配值，在下一次声明的时候，会检测是否有相同的配值已经声明过，
     *  如果有，则直接返回该配值的 symbol；
     *  如果没有，则以配值创建一个 symbol。
     */
    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3 === a4); // true
}

// 应用
{
    let a1 = Symbol.for('abc');
    let obj = {
        [a1]: '123', // 用属性表达式取出来的值是 Symbol(abc)，和下面的'abc' 属性不冲突
        abc: 345,
        c: 456
    };
    console.log("obj", obj); // {abc: 345, c: 456, Symbol(abc): "123"}

    // 常规的 entries API 无法取出 Symbol 属性
    for(let [key, value] of Object.entries(obj)){
        console.log(key + " = " + value); // abc = 345 Enter c = 456
    }

    /** Object.getOwnPropertySymbols 可以取出 Symbol 属性, 
     *  返回值是数组, 下标是 Symbol。
     */
    Object.getOwnPropertySymbols(obj).forEach(element => {
        console.log(element, obj[element]); // Symbol(abc) "123"
    });

    /** Reflect.ownKeys 可以取出所有属性。
     *  返回数组，索引为属性名。
     */
    Reflect.ownKeys(obj).forEach(( item ) => {
        console.log('ownKeys', item, obj[item]); // // ownKeys abc 345 ...(其余两组)
    });
}

