// 基本定义和实例
{
    class Parent{
        constructor(name = "Demon"){
            this.name = name;
        }
    }
    let v_parent = new Parent('v');
    console.log('实例', v_parent); //  {name: "v"}
}

// 继承
{
    class Parent{
        constructor(name = "Demon"){
            this.name = name;
        }
    }

    class Child extends Parent{
        constructor(name = 'child'){
            super(name); // 必须放在第一句，子类向父类传递数据
            this.type = 'child';
        }
    }

    console.log('继承', new Child()); // {name: "child", type: "child"}
}

// getter and setter
{
    class Parent{
        constructor(name = "Demon"){
            this.name = name;
        }

        get longName(){
            return '77' + this.name;
        }

        set longName(value){
            this.name = value;
        }
    }

    let v = new Parent();
    console.log('getter', v.longName); // getter 77Demon
    v.longName = 'Kong';
    console.log('setter', v.longName); // setter 77Kong
}

// 静态方法
{
    class Parent{
        constructor(name = "Demon"){
            this.name = name;
        }

        static tell(){
            console.log('tell');
        }
    }

    Parent.tell(); // tell 静态方法直接用类名调用。
}

// 静态属性
{
    class Parent{
        constructor(name = "Demon"){
            this.name = name;
        }

        static tell(){
            console.log('tell');
        }
    }

    Parent.type = 'test'; // 在类定义完成后，直接用 类名.属性名 的方式定义静态属性。
    console.log('静态属性', Parent.type); // 静态属性 test
}