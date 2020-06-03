import $ from 'jquery';

export default class Base{
    
    /**
     * 初始化奖金和玩法及说明
     */
    initPlayList(){
        // map 的级联设置
        this.play_list.set('r2', {
            bonus: 6,
            tip: '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元。',
            name: '任二',
        })
        .set('r3', {
            bonus: 19,
            tip: '从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元。',
            name: '任三',
        })
        .set('r4', {
            bonus: 78,
            tip: '从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元。',
            name: '任四',
        })
        .set('r5', {
            bonus: 540,
            tip: '从01~11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元。',
            name: '任五',
        })
        .set('r6', {
            bonus: 90,
            tip: '从01~11中任选6个或多个号码，所选号码与开奖五个号码相同，即中奖<em class="red">90</em>元。',
            name: '任六',
        })
        .set('r7', {
            bonus: 26,
            tip: '从01~11中任选7个或多个号码，所选号码与开奖五个号码相同，即中奖<em class="red">26</em>元。',
            name: '任七',
        })
        .set('r8', {
            bonus: 9,
            tip: '从01~11中任选8个或多个号码，所选号码与开奖五个号码相同，即中奖<em class="red">9</em>元。',
            name: '任八',
        })
    }

    /**
     * 初始化号码
     */
    initNumber(){
        for(let i = 1; i < 12; i++){
            this.number.add(('' + i).padStart(2, '0')); // 补白
        }
    }

    /**
     * 设置遗漏数据
     * @param {Map} omit 从后台获取的遗漏数据
     */
    setOmit(omit){
        let self = this;
        self.omit.clear();
        for(let [index, item] of omit.entries()){
            self.omit.set(index, item);
        }
        $(self.omit_el).each((index, item) => {
            $(item).text(self.omit.get(index));
        });
    }

    /**
     * 设置开奖号码
     * @param {Set} code 从后台获取开奖号码
     */
    setOpenCode(code){
        let self = this;
        self.open_code.clear();
        for(let item of code.values()){
            self.open_code.add(item);
        }
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }

    /**
     * 号码选中/取消
     * @param {event} e 当前事件
     */
    toggleCodeActive(e){
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }

    /**
     * 切换玩儿法
     * @param {event} e 当前事件
     */
    changePlayNav(e){
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.addClass('active').siblings().removeClass('active');
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        let play = self.cur_play.split("")[1];
        let tpl = `<em>选号区</em>至少选${play}个`;
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);     
        $('#play_tips').html(tpl);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }

    /**
     * 快捷操作区
     * @param {event} e 当前事件
     */
    assistHandle(e){
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        let index = $cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        if(index === 0){ // 全选
            $('.boll-list .btn-boll').addClass('btn-boll-active');
        }
        if(index === 1){ // 大
            $('.boll-list .btn-boll').each((i, t) => {
                if(t.textContent - 5 > 0){
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index === 2){ // 小
            $('.boll-list .btn-boll').each((i, t) => {
                if(t.textContent - 6 < 0){
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index === 3){ // 奇
            $('.boll-list .btn-boll').each((i, t) => {
                if(t.textContent % 2 == 1){
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index === 4){ // 偶
            $('.boll-list .btn-boll').each((i, t) => {
                if(t.textContent % 2 == 0){
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        self.getCount();
    }

    /**
     * 获取彩票名称
     */
    getName(){
        return this.name;
    }

    /**
     * 添加号码
     */
    addCode(){
        let self = this;
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g); 
        console.log($active);
        let active  = $active ? $active.length : 0;
        let count = self.computeCount(active, self.cur_play);
        if(count){
            self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
        }

    }

    /**
     * 添加单次号码
     * @param {Array} code 选择的号码
     * @param {string} type 玩法
     * @param {string} typeName 玩法名称
     * @param {number} count 注数
     */
    addCodeItem(code, type, typeName, count){
        let self = this;
        const tpl = `
        <li codes="${type} | ${code}" bonus=${count * 2} count="${count}">
            <div class="code">
                <b>${typeName}${count > 1 ? '复式':'单式'}</b>
                <b class="em">${code}</b>
                [${count}注，<em class="code-list-money">${count * 2}</em>元]
            </div>
        </li>
        `;
        $(self.cart_el).append(tpl);
        self.getTotal();
    }

    /**
     * 计算注数和奖金并显示
     */
    getCount(){
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;
        let count = self.computeCount(active, self.cur_play);
        let range = self.computeBonus(active, self.cur_play);
        let money = count * 2;
        let win_min = range[0] - money;
        let win_max = range[1] - money;
        let tpl; // 字符串模板
        if(count === 0){
            tpl = `您选了 <b class="red">${count}</b> 注，共 <b class="red">${count * 2}</b> 元`
        }else if(range[0] === range[1]){
            tpl = `您选了 <b>${count}</b> 注，共 <b class="red">${count * 2}</b> 元 
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong> 元，
            您将${win_min > 0 ? '盈利' : '亏损'}
            <strong class="${win_min >= 0 ? 'red' : 'green'}">${Math.abs(win_min)}</strong> 元</em>`
        }else{
            tpl = `您选了 <b>${count}</b> 注，共 <b class="red">${count * 2}</b> 元 
            <em>若中奖，奖金：<strong class="red">${range[0]}</strong> 元至 <strong class="red">${range[1]}</strong> 元，
            您将${win_max < 0 ? '亏损' : '盈利'}
            <strong class="${win_min >= 0 ? 'red' : 'green'}">${Math.abs(win_min)}</strong> 
            至 <strong class="${win_max >= 0 ? 'red' : 'green'}">${Math.abs(win_max)}</strong>
            元</em>`;
        }
        $('.sel_info').html(tpl);
    }

    /**
     * 计算总金额
     */
    getTotal(){
        let count = 0;
        $('.codelist li').each((index, item) => {
            count += $(item).attr('count') * 1;
        })
        $('#count').text(count);
        $('#money').text(count * 2);
    }

    /**
     * 生成随机号码
     * @param {number} num 生成个数
     */
    getRandom(num){
        let arr = [], index;
        let number = Array.from(this.number);
        while(num --){
            index = Number.parseInt(Math.random() * number.length); // Math.random 生成的是0~1之间的随机数
            arr.push(number[index]);
            number.splice(index, 1); // 被选择后再数组中删除该数
        }
        return arr.join(' ');
    }

    /**
     * 添加随机号码
     * @param {event} e 当前事件
     */
    getRandomCode(e){
        e.preventDefault();
        let num = e.currentTarget.getAttribute('count');
        let play = this.cur_play.match(/\d+/g)[0];
        let self = this;

        if(num === '0'){
            $(self.cart_el).html('');
        }else{
            for(let i = 0; i < num; i++){
                self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
            }
        }
    }
}