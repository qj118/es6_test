export default class Timer{
    /**
     * 倒计时函数
     * @param {Date} end 终止时间
     * @param {function} update 时间更新回调函数
     * @param {function} handle 倒计时回调函数
     */
    countdown(end, update, handle){
        const now = new Date().getTime();
        const self = this;
        if(now - end > 0){
            handle.call(self);
        }else{
            let last_time = end - now; // 剩余时间
            const px_d = 1000*60*60*24;
            const px_h = 1000*60*60;
            const px_m = 1000*60;
            const px_s = 1000;

            // 获取天、时、分、秒
            let d = Math.floor(last_time / px_d);
            let h = Math.floor((last_time - d * px_d) / px_h);
            let m = Math.floor((last_time - d * px_d - h * px_h) / px_m);
            let s = Math.floor((last_time - d * px_d - h * px_h - m * px_m) / px_s);

            let r = [];
            if(d > 0){
                r.push(`<em>${d}</em>天`);
            }
            if(r.length || h > 0){
                r.push(`<em>${h}</em>时`);
            }
            if(r.length || m > 0){
                r.push(`<em>${m}</em>分`);
            }
            if(r.length || s > 0){
                r.push(`<em>${s}</em>秒`);
            }

            self.last_time = r.join(''); 
            update.call(self, r.join('')); // 更新回调，将字符串模板写会页面
            // 1s 查询一次
            setTimeout(() => {
                self.countdown(end, update, handle);
            }, 1000);
        }
    }
}