/*
* @Author: yajie
* @Date:   2018-04-05 14:49:00
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 18:33:32
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
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;

        //验证username
        $('#username').blur(function(){
            //
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            //异步验证用户名是否存在

            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            })

        })
        //提交表单
        $('#submit').click(function(){
            _this.submit();
        });

        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    //提交表单
    submit : function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#passwordConfirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
            
        },
        validateResult = this.formValidata(formData);
        if(validateResult.status){
            console.log(formData);
            console.log('=======');
            console.log(formData);
            _user.register(formData,function(res){
                console.log(formData);
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidata : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validata(formData.username,'require')){
              result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validata(formData.password,'require')){
              result.msg = '密码不能为空';
            return result;
        }
        if(formData.password < 6){
              result.msg = '密码长度不能少于6位';
            return result;
        }
        if( formData.password !== formData.passwordConfirm){

              result.msg = '两次密码4444输入不一致';
            return result;
        }
        if(!_mm.validata(formData.phone,'phone')){
              result.msg = '手机号格式不正确';
            return result;
        }
        if(!_mm.validata(formData.email,'email')){
              result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_mm.validata(formData.question,'require')){
              result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validata(formData.answer,'require')){
              result.msg = '密码提示问题答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function(){
    page.init();
})


