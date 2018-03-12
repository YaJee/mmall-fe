/*
* @Author: yajie
* @Date:   2018-03-07 16:59:11
* @Last Modified by:   yajie
* @Last Modified time: 2018-03-07 17:49:46
*/
'use strict';
require('./index.css'); 
var _mm = require('util/mm.js');

//通用页面头
var header = {

    init : function () {
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    }
    ,
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后，做搜索提交。
        $('#search-input').keyup(function(e){
            // 13是回车键的 keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })


    },
    //搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交时 keyword存在，则正常跳转
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //如果 keyword 为空，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();