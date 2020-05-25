{
    console.log('a', `\u0061`);
    console.log(`\u20BB7`);// 当字符编码大于0xFFFF, 会将前四个字节翻译成一个字符，最后的7翻译成一个字符

    console.log(`\u{20BB7}`);// 𠮷
}

// ES5
{
    let s = '𠮷'; 
    console.log('length', s.length); // length 2，表示 𠮷 是两个字符长度，四个字节存储
    console.log('0', s.charAt(0)); // 取出第一个字符，乱码
    console.log('1', s.charAt(1)); // 取出第二个字符，乱码
    console.log('0', s.charCodeAt(0)); // 取出第一个字符的Unicode码值，可以取出码值 55362
    console.log('1', s.charCodeAt(1)); // 取出第二个字符的Unicode码值，可以取出码值 57271

    console.log(String.fromCharCode("0x20bb7")); // 乱码
}

// ES6 扩展
{
    let s1 = '𠮷a';
    console.log('length', s1.length);
    console.log('code0', s1.codePointAt(0)); // 取出前四个字节构成的字符 134071
    console.log('code0', s1.codePointAt(0).toString(16)); // code0 20bb7
    console.log('code1', s1.codePointAt(1)); // 取出后三四位字节 57271
    console.log('code2', s1.codePointAt(2)); // 取出最后两个字节 97

    console.log(String.fromCodePoint("0x20bb7")); // 𠮷
}

// 遍历
{
    let str = '\u{20bb7}abc';
    for(let i = 0; i < str.length; i++)
    {
        console.log('es5', i, str[i]); // 20bb7 依然是按照两个字符处理的，前两个字符输出乱码
    }
    for(let code of str) // 字符串遍历接口可以正常遍历
    {
        console.log('es6', code); 
    }
}

{
    let str = "string";
    console.log('includes', str.includes('s')); // true
    console.log('start', str.startsWith('str')); // true
    console.log('end', str.endsWith('ng')); // true
}

{
    let str = "abc";
    console.log(str.repeat(2));// abcabc
}

// 字符串模板
{
    let name = "Demon";
    let info = "hello world";
    // 定义模板
    let m = `I am ${name}, ${info}!`; 

    console.log(m); // I am Demon, hello world!
}

// 补白
{
    console.log('1'.padStart(2, '0')); // 字符串占两位，不够前面补0，输出 01
    console.log('1'.padEnd(2, '0')); // 字符串占两位，不够后面补0，输出 10
}

// 标签模板
{
    let user = {
        name: 'Demon',
        info: 'Hello ES6',
    };
    abc`I am ${user.name}, ${user.info}!`;
    // 对模板进行一个拆分
    function abc(s, v1, v2){
        console.log(s); // ["I am ", ", ", "!"] 原生字符串模板
        console.log(v1); // Demon 变量1
        console.log(v2); // Hello ES6 变量2
        return s + v1 + v2;
    }
}

// raw 
{
    console.log(String.raw`Hi\n${1 + 2}`); // \n 不翻译成回车，原封不动的打印，结果：Hi\n3
    console.log(`Hi\n${1 + 2}`); // \n 被翻译成回车
}