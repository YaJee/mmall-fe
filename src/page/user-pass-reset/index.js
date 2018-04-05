/*
* @Author: yajie
* @Date:   2018-04-05 16:47:32
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 18:40:48
*/


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm = require('util/mm.js');


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : '',

    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        console.log('mei zhiixin. ')
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;


        $('#submit-username').click(function(){

            var username = $.trim($('#username').val());

            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名');
            }
        }),

        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            console.log(answer);
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token  = res;
                  
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入答案');
            }
        }),

        $('#submit-password').click(function(){

            var password = $.trim($('#password').val());
            if(password && password.length > 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function(res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                     formError.show(errMsg);
                })
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        })
        
    },
    
    loadStepUsername : function(){
        console.log('mmsadf')
        $('.step-username').show();       
    },
    loadStepQuestion : function(){
        //formError.hide();
         $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);       
    },
    loadStepPassword : function(){
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();       
    }
}
$(function(){
    page.init();
})


