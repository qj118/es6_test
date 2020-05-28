// Proxy 通过监听对象的访问来代理对象的操作
{
    let obj = {
        time: '2020-5-27',
        name: 'net',
        _r: 123,
    };

    let monitor = new Proxy(obj, {
        // 代理对象属性的读取
        get: (target, key) => {
            return target[key].replace('2020', '2019');
        },
        // 代理对象设置属性
        set: (target, key, value) => {
            if(key === 'name'){
                return target[key] = value;
            }else{
                return target[key];
            }
        },
        // 代理 key in Object 操作
        has: (target, key) => {
            if(key === 'name'){
                return target[key];
            }else{
                return false;
            }
        },
        // 代理 delete 操作
        deleteProperty: (target, key) => {
            if(key.indexOf('_') > -1){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        // 代理 Object.keys, Object.getOwnPropertySymbols, Object.getPropertyNames
        ownKeys: (target) => {
            return Object.keys(target).filter(item => item != 'time');
        },
    });

    // get
    console.log('get', monitor.time); // get 2019-5-27

    // set
    monitor.time = '2020';
    monitor.name = 'demon';
    console.log('set', monitor.time, monitor.name); // set 2019-5-27 demon

    // has
    console.log('has', 'name' in monitor, 'time' in monitor); // has true false

    // delete
    delete monitor.name;
    delete monitor._r;
    console.log('delete', monitor); // delete Proxy {time: "2020-5-27", name: "demon"}

    // ownKeys
    console.log('ownKeys', Object.keys(monitor)); // ownKeys ["name", "_r"] (delete 代码被注释后的结果)
}


// Reflect 用反射的方式访问对象的属性
{
    let obj = {
        time: '2020-5-27',
        name: 'net',
        _r: 123,
    };

    // get
    console.log('get', Reflect.get(obj, 'time')); // get 2020-5-27

    // set
    Reflect.set(obj, 'name', 'Demon'); // set {time: "2020-5-27", name: "Demon", _r: 123}
    console.log('set', obj);

    // has
    console.log('has', Reflect.has(obj, 'name')); // has true
}

{
    function validator(target, validator){
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if(target.hasOwnProperty(key)){ 
                    let va = this._validator[key]; // 用箭头函数没有 this, 无法访问到 validator, 所以在构造函数中尽量不不适用箭头函数
                    if(!!va(value)){ // 验证设置的值
                        return Reflect.set(target, key, value, proxy); // 使用反射的方式设置属性值
                    }else{
                        throw Error(`不能设置${key}到${value}`);
                    }
                }else{
                    throw Error(`${key} 不存在`);
                }
            },
        });
    }
    // 数据验证
    const personValidators = {
        name: (val) => {
            return typeof val === 'string';
        },
        age: (val) => {
            return typeof val === 'number' && val > 18;
        }
    }

    class Person{
        constructor(name, age){
            this.name = name;
            this.age = age;
            return validator(this, personValidators); // 返回 Proxy，代理 Person，用 personValidator 验证数据。
        }
    }

    const person = new Person('Demon', 30); 
    console.info(person); // Proxy {name: "Demon", age: 30}
    person.age = 6; // Uncaught Error: 不能设置age到6
}