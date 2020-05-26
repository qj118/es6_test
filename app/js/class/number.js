{
    console.log('二进制',0B1111110111); // 1015 二进制以0b开头
    console.log('八进制', 0O1767); // 1015 八进制以0o开头
    console.log('十六进制', 0x3F7); // 1015 十六进制以0x开头
}

{
    // isFinite 判断一个数值是否是有限的
    console.log('15', Number.isFinite(15)); // true
    console.log('NaN', Number.isFinite(NaN)); // false
    console.log('1/0', Number.isFinite(1/0)); // false

    // isNaN 判断参数是否是一个非数值类型，是数值返回 false
    console.log('NaN', Number.isNaN(NaN)); // true
    console.log('0', Number.isNaN(0)); // false
}

// 整数判断
{
    console.log('25', Number.isInteger(25)); // true
    console.log('25.0', Number.isInteger(25.0)); // true
    console.log('25.1', Number.isInteger(25.1)); // false
}

// 数值范围
{
    console.log(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER); // -9007199254740991 9007199254740991
    console.log('1015', Number.isSafeInteger(1015)); // true 判断一个数值是否在安全范围内
}

// 取整
{
    console.log(10.15, Math.trunc(10.15)); // 10
    console.log(2.7, Math.trunc(2.7)); // 2
}

// 判断数值的符号
{
    console.log('-5', Math.sign(-5)); // -1, 负数返回 -1
    console.log('0', Math.sign(0)); // 0, 零返回 0
    console.log('5', Math.sign(5)); // 1, 正数返回 1
    console.log('foo', Math.sign('foo')); // NaN, 在输入参数为不能转换成数字的字符串时，返回非数字
}

// 立方根
{
    console.log('-1', Math.cbrt(-1)); // -1
    console.log('8', Math.cbrt(8)); // 2
}