/*
* @Author: yajie
* @Date:   2018-03-07 18:07:29
* @Last Modified by:   yajie
* @Last Modified time: 2018-03-07 19:46:57
*/
'use strict';
require('./index.css'); 
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center',desc : '个人中心',href : './user-center.html'},
            {name : 'order-list',desc : '我的订单',href : './order-list.html'},
            {name : 'pass-update',desc : '修改密码',href : './pass-update.html'},
            {name : 'about',desc : '关于MMall',href : './about.html'},
        ]
    },
    init : function (option) {
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //
    renderNav : function(){
        // 计算 active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength ; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        //2渲染list 数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        })
        // 把 html 放入容器
        $('.nav-side').html(navHtml);
    }

};

module.exports = navSide;
