// Set
{
    let list = new Set();
    list.add(5);
    list.add(7);
    console.log('size', list.size); // 2 返回 set 的大小
}

{
    // 用数组初始化 set
    let arr = [1, 2, 3, 4, 5];
    let list = new Set(arr);

    console.log('size', list.size); // 5
    console.log(list); // {1 ,2 ,3 ,4, 5}
}

{
    // Set 中不允许元素重复，类型不同的元素不重复
    let arr = [1, 2, 3, "2", 3];
    let list = new Set(arr);
    console.log('unique', list); // {1, 2, 3, "2"}
}

{
    // 常用方法
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    console.log('has', list.has('add')); // has true
    console.log('delete', list.delete('add'), list); // delete true {"delete", "clear", "has"}
    list.clear();
    console.log('clear', list); // clear {}
}

{
    // Set 的 key 和 value 是一致的
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);
    /**
     * keys values 返回的结果是一样的，
     * 使用 entries 可以查看。
     */
    for(let [key, value] of list.entries()){
        console.log(key + " = " + value); // add = add ...
    }
    // 可以直接使用 Set 变量名称进行遍历无需加 keys 或 values 方法。
    for(let value of list){
        console.log('value', value); // value add ...
    }
    // 也可以直接使用 forEach
    list.forEach((item) => {
        console.log(item); //add ...
    });
}

/**
 * WeakSet
 * 1. 元素只能是对象类型；
 * 2. 仅仅保存指向对象的引用；
 * 3. 不检测引用对象是否已被垃圾回收；
 * 4. 无 clear 方法；
 * 5. 无法遍历；
 * 6. 无 size属性。
 */
{
    let weakList = new WeakSet();
    let arg = {}
    weakList.add(arg);
    console.log('weak list', weakList); // {{}}
}

// Map
{
    let map = new Map();
    let arr = ['277'];
    // map 的 key 可以是任意类型 set(key, value)
    map.set(arr, 456);
    // get(key) 返回 value
    console.log('map', map, map.get(arr)); // map {["277"] => 456} 456
}

{
    let map = new Map([['a', 123], ['b', 456]]); // 数组中的项还是数组
    console.log(map); // {"a" => 123, "b" => 456}
    console.log('size', map.size); // size 2
    // 常用方法
    console.log('delete', map.delete('a'), map); // delete true {"b" => 456}
    map.clear();
    console.log('clear', map);// clear {}
}

{
    // 遍历
    let map = new Map([['a', 123], ['b', 456]]);
    // 遍历所有的 key 
    for(let key of map.keys()){
        console.log('key', key);
    }
    // 遍历所有的 value
    for(let value of map.values()){
        console.log('value', value);
    }
    // 遍历所有的 key 和 value
    for(let [key, value] of map.entries()){
        console.log(key + " => " + value);
    }
    // forEach
    map.forEach( (key, value) => {
        console.log('forEach', key + " => " + value);
    } );
}

/**
 * WeakSet
 * 1. 元素的key只能是对象类型；
 * 2. 无 clear 方法；
 * 3. 无法遍历；
 * 4. 无 size属性。
 */
{
    let weakMap = new WeakMap();

    let o = {};
    weakMap.set(o, 123);
    console.log(weakMap.get(o)); // 123
}

/**
 * 数据结构对比
 * 注意：增查改删如果想要看到正确的输出结果，需要将后面的操作注释掉。否则，后面的结果会影响前面的结果。
 */
{
    // map 与 数组对比
    let map = new Map();
    let array = [];

    // 增
    map.set('t', 1);
    array.push({t: 1});
    console.info('map-array', map, array); // map-array {"t" => 1} [{t: 1}]

    // 查
    let map_exist = map.has('t');
    let array_exist = array.find(item => item.t); 
    console.info('map-array-find', map_exist, array_exist); // map-array-find true {t: 1}

    // 改
    map.set('t', 2);
    array.forEach(item => item.t == 1 ? item.t = 2 : ''); // 遍历找到
    console.info('map-array-modify', map, array); // map-array-modify {"t" => 2} [{t: 2}]

    // 删
    map.delete('t');
    let index = array.findIndex( item => item.t );
    array.splice(index, 1); // 从索引位置删除 1 个元素
    console.info('map-array-delete', map, array); // map-array-delete {} []
    // 顺序执行后，数组相关的输出都会变成空
}

{
    // Set 与数组对比
    let set = new Set();
    let array = [];

    // 增
    set.add({t: 1});
    array.push({t: 1});
    console.info('set-array', set, array); // set-array {{t: 1}} [{t: 1}]

    // 查
    /**
     * 对于集合来说，元素如果是对象，保存的是引用类型，所以只有将同一个对象放入 has 才能返回 true。
     * 这里方法是确定set中是否有过一个属性名为 t, 属性值为 1 的元素，是不是同一个元素这个不做判断。
     */
    let set_exist = false;
    for(let item of set){
        if(item.t == 1){
            set_exist = true;
        }
    }
    let array_exist = array.find(item => item.t); 
    console.info('set-array-find', set_exist, array_exist); // set-array-find true {t: 1}

    // 改
    set.forEach(item => item.t == 1 ? item.t = 3 : '');// 或者直接使用 item.t = 3
    array.forEach(item => item.t == 1 ? item.t = 2 : '');
    console.info('set-array-modify', set, array); // set-array-modify {{t: 3}} [{t: 2}]

    // 删
    set.forEach(item => item.t == 1? set.delete(item) : "");
    let index = array.findIndex( item => item.t );
    array.splice(index, 1); // 从索引位置删除 1 个元素
    console.info('set-array-delete', set, array); // set-array-delete {} []
}

// Map Set 与 Object 对比
{
    let item = {t: 1};
    let map = new Map();
    let set = new Set();
    let obj = {};

    //增
    map.set('t', 1);
    set.add(item);
    obj['t'] = 1;

    console.info('map-set-object', map, set, obj); // map-set-object {"t" => 1} {{t: 1}} {t: 1}

    //查
    console.info({
        map_exist: map.has('t'),
        set_exist: set.has(item),
        obj_exist: 't' in obj,
    }); // {map_exist: true, set_exist: true, obj_exist: true}

    // 改
    map.set('t', 2);
    item.t = 3;
    obj['t'] = 4;
    console.info('map-set-object-modify', map, set, obj); // map-set-object-modify {"t" => 2} {{t: 3}} {t: 4}

    // 删
    map.delete('t');
    set.delete(item);
    delete obj['t'];
    console.info('map-set-object-delete', map, set, obj); // map-set-object-delete {} {} {}
}