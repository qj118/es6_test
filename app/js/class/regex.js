// ES5 语法
{
    /**
     * 第一个参数为正则，必须为字符串形式；
     * 第二个参数为修饰符：
     *      i, 表示忽略大小写；
     *      g, 表示全文搜索，如果不添加则表示搜索到第一个匹配为止；
     *      m, 表示多行匹配。
     */
    let regex = new RegExp('xyz', 'i');
    /**
     *  只有一个参数，用 ‘//’包含正则，最后是修饰符
     */
    let regex2 = new RegExp(/xyz/i);

    console.log(regex.test('xyz123'), regex2.test('xyz123')); // true true
}

// ES6 扩展
{
    /**
     * 第一个参数可以是正则表达式；
     * 第二个参数的修饰符覆盖正则表达式里的修饰符。
     */
    let regex = new RegExp(/xyz/ig, 'i');
    console.log(regex.flags); // i
}

{
    let s = "bbb_bb_b";
    /**
     * g, y 都是全局匹配
     * g 在执行下一次匹配的时候，从下一个位置往后进行匹配，不匹配继续向下执行，直到匹配，返回；
     * y 在执行下一次匹配的时候，从下一个位置进行匹配，如果不匹配不再往下执行，返回 null。
     */
    let a1 = /b+/g;
    let a2 = /b+/y;

    console.log('one', a1.exec(s), a2.exec(s)); // bbb bbb
    console.log('two', a1.exec(s), a2.exec(s)); // bb null

    // 修饰 y 属性是否开启
    console.log(a1.sticky, a2.sticky); // false, true
}

{
    console.log('u-1', /^\uD83D/.test('\uD83D\uDC2A')); // true , test 中的字符串被当做两个字符
    console.log('u-2', /^\uD83D/u.test('\uD83D\uDC2A')); // false, test 中的字符串被当做一个字符

    console.log(/\u{61}/.test('a')); // false
    console.log(/\u{61}/u.test('a')); // true, 如果需要将 Unicode 转换成字符，需要使用 u 修饰符

    console.log(`\u{20BB7}`); // 一个被大于两个字节组成的字符 ‘𠮷’

    let s = '𠮷';

    console.log('u', /^.$/.test(s)); // false ‘.’ 并不能匹配所有字符，只能匹配由小于两个字节组成的字符
    console.log('u-2', /^.$/u.test(s));// ture 当一个字符由两个以上字节组成，需要加上 u 修饰符进行匹配

    console.log('test', /𠮷{2}/.test('𠮷𠮷')); // false
    console.log('test-2', /𠮷{2}/u.test('𠮷𠮷')); // ture
}