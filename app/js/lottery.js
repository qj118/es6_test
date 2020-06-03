import 'babel-polyfill';
import $ from 'jquery';
import Base from './lottery/base';
import Calculate from './lottery/calculate';
import Interface from './lottery/interface';
import Timer from './lottery/timer';

/**
 * 类的深度拷贝
 * @param {Object} target 目标类
 * @param {Object} source 原始类
 */
const copyProperties = (target, source) => {
    for(let key of Reflect.ownKeys(source)){
        if(key !== 'constructor' && key !== 'prototype' && key !== 'name'){
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

/**
 * 类的多重继承
 * @param  {...any} mixins 多个类
 */
const mix = (...mixins) => {
    class Mix{};
    for(let mixin of mixins){
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix;
}

/**
 * Lottery 继承 Base, Calculate, Interface, Timer
 */
export default class Lottery extends mix(Base, Calculate, Interface, Timer){

    constructor(name = 'syy', cname = '11选5', issue = '**', state = '**'){
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;
        this.el = '';
        this.omit = new Map();
        this.open_code = new Set();
        this.open_code_list = new Set();
        this.play_list = new Map();
        this.number = new Set();
        this.issue_el = '#curr_issue';
        this.countdown_el = '#countdown';
        this.state_el = '.state_el';
        this.cart_el = '.codelist';
        this.omit_el = '';
        this.cur_play = 'r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * 状态更新
     */
    updateState(){
        let self = this;
        this.getState().then((res) => {
            self.issue = res.issue;
            self.end_time = res.end_time;
            self.state = res.state;
            $(self.issue_el).text(res.issue);
            $(self.state_el).text(res.state);
            self.countdown(res.end_time, (time) => {
                $(self.countdown_el).html(time);
            }, () => {
                setTimeout(() => {
                    self.updateState();
                    self.getOmit(self.issue).then((res) => {});
                    self.getOpenCode(self.issue).then((res) => {});
                }, 500);
            });
        });
    }
    // 绑定按钮事件
    initEvent(){
        let self = this;
        $('#plays').on('click', 'li', self.changePlayNav.bind(self));
        $('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
        $('#confirm_sel_code').on('click', self.addCode.bind(self));
        $('.dxjo').on('click', 'li', self.assistHandle.bind(self));
        $('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
    }
}