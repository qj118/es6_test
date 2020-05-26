// Array.of
{
    // 将一组数据变量转换成数组
    let arr = Array.of(1, 3, 5, 7, 9);
    console.log('arr = ', arr); // arr = [1, 3, 5, 7, 9]

    let empty = Array.of();
    console.log('empty = ', empty); // empty = []
}

// Array.from
{
    // 将伪数组或集合转换成真正的数组
    let p = document.querySelectorAll('p'); // 获取 index.ejs 中所有的 p 元素
    let pArr = Array.from(p); // 将 p 元素的集合转换成一个数组
    console.log(pArr); // 每个 p 元素为一个对象
    pArr.forEach( (item) => {
        console.log(item.textContent); // 输出 p 元素的一个属性值
    });

    // Array.from 还可以使用第二个参数来操作数组中的每一个元素
    let double_arr = Array.from([1, 3, 5], (item) => { return item * 2 });
    console.log(double_arr); // [2, 6, 10]
}

// fill
{
    console.log('fill-7', [1, 'a', undefined].fill(7)); // [7, 7, 7] 将整个数组被 7 填充
    console.log('fill, pos', ['a', 'b', 'c'].fill(7, 1, 2)); // ['a', 7, 'c']从下标 1 开始替换，到下标 2 截止，下标 2 不替换。（前闭后开）
}

{
    // .keys 返回一个数组索引的迭代器
    for(let index of [1, 'c', 'mmq'].keys()){
        console.log("key " + index); // key 0 Enter key 1 Enter key 2
    }

    // .values 返回一个数组值的迭代器
    for(let value of [1, 'c', 'mmq'].values()){
        console.log("value " + value); // value 1 Enter value c Enter value mmq
    }

    // .entries 返回一个索引和值组成的迭代器
    for(let [index, value] of [1, 'c', 'mmq'].entries()){
        console.log('entry => ' + index + " : " + value); // entry => 0 : 1 Enter entry => 1 : c Enter entry => 2 : mmq
    }
}

{
    /**
     * 第一个参数是被替换的起始索引;
     * 第二个参数是读取替换值的起始索引；
     * 第三个参数是读取替换值的截止索引，但不包括该索引。
     */
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 5)); // [4, 5, 3, 4, 5] 用索引 3, 4 的值替换索引从 0 开始的值。
}


// find 和 findIndex
{
    console.log([1, 2, 3, 4, 5, 6].find(( item ) => {
        return item > 3;
    })); // 4, 找到数组中大于 3 的元素，找到即停止。

    console.log([1, 2, 3, 4, 5, 6].findIndex(( item ) => {
        return item > 3;
    })); // 3, 找到数组中大于 3 的元素的下标，找到即停止。
}

{
    console.log('number', [1, 2, NaN].includes(1)); // true
    console.log('number', [1 ,2, NaN].includes(NaN)); // true
}