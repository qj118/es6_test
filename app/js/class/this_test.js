{
    function Timer(){
        this.s1 = 0;
        this.s2 = 0;

        // 箭头函数的this始终指向外层函数的函数
        setInterval(() => this.s1++, 1000);
        // 普通函数的 this 指向运行时所在的作用域
        setInterval(function(){
            this.s2++;
        }, 1000);
    }

    let timer = new Timer();

    setTimeout(() => console.log('s1: ', timer.s1), 3100); // s1: 3
    setTimeout(() => console.log('s2: ', timer.s2), 3100); // s2: 0
}

// {
//     let obj = {
//         x: 0,
//         f1: function(){
//             console.log(this.x);
//         }
//     }
//     let f1 = obj.f1;
//     let x = 1;

//     obj.f1();
//     f1();

// }