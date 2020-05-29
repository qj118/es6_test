// import 'babel-polyfill';
// import "./class/model";

// import { A, test, Hello } from './class/model';
// import * as lesson from './class/model';
import modelx from './class/model'; // mdoelx 这个名字可以是任意的。

console.log(modelx.A);
modelx.test();
let hello = new modelx.Hello();
hello.test();