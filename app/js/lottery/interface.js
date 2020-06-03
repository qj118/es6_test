import $ from 'jquery';

class Interface{
    /**
     * 获取遗漏数据，即该号码有多少期没有出现
     * @param {string} issue 当前期号
     */
    getOmit(issue){
        let self = this; // 给箭头函数使用，防止 this 指向不明确
        return new Promise((resolve, reject) => {
            // 发送请求从后端获取数据
            $.ajax({
                url: 'get/omit',
                data: {
                    issue: issue,
                },
                dataType: 'json',
                success: (res) => { // res 是从后台获取的数据
                    self.setOmit(res.data);
                    resolve.call(self, res);
                },
                error: (err) => {
                    reject.call(err);
                },
            });
        });
    }

    /**
     * 获取开奖号码
     * @param {string} issue  当前期号
     */
    getOpenCode(issue){
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/opencode',
                data: {
                    issue: issue,
                },
                dataType: 'json',
                success: (res) => {
                    self.setOpenCode(res.data);
                    resolve.call(self, res);
                },
                error: (err) => {
                    reject.call(err);
                },
            });
        });
    }

    /**
     * 获取当前状态
     * @param {当前期号} issue 
     */
    getState(issue){
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/state',
                data: {
                    issue: issue,
                },
                dataType: 'json',
                success: (res) => {
                    resolve.call(self, res);
                },
                error: (err) => {
                    reject.call(err);
                },
            });
        });
    }
}

export default Interface;