// export let A = 123;

// export function test(){
//     console.log('test');
// }

// export class Hello{
//     test(){
//         console.log('hello class');
//     }
// }

let A = 123;

function test(){
    console.log('test');
}

class Hello{
    test(){
        console.log('hello class');
    }
}

// 推荐使用这种方式导出，是导入使用模块更加自由
export default {
    A,
    test,
    Hello,
}