$(function() {
    //城市切换
    $('.city_div').hover(function () {
        $(this).addClass('active_l');
        $('#show_div').show();
    }, function () {
        $(this).removeClass('active_l');
        $('#show_div').hide();
    });
    $('#show_div').hover(function () {
        $(this).show();
    }, function () {
        $('.city_div').hover(function () {
            $(this).addClass('active_l');
            $('#show_div').show();
        }, function () {
            $(this).removeClass('active_l');
            $('#show_div').hide();
        });
    });
    $('#show_div ul li a').on('click', function () {
        var text = $(this).html();
        $(this).addClass('active');
        $(this).parent().siblings().children('a').removeClass('active');
        $('.city_div span').html(text);
    });
    //tab切换
    $('.a_tab').on('click',function(){
        var index=$(this).index();
        $(this).addClass('active_tab').siblings().removeClass('active_tab');
        if(index==0){
            $('.border_div1').show();
            $('.border_div').hide();
            $('.border_div2').hide();
        }else if(index==1){
            $('.border_div').show();
            $('.border_div1').hide();
            $('.border_div2').hide();
        }else{
            $('.border_div1').hide();
            $('.border_div').hide();
            $('.border_div2').show();
        }
    });
    //所有input获得焦点时的状态
    $('.chren_div .input_d input').focus(function(event){
        $(this).parent().css({
            border:'1px solid blue'
        })
        $(this).parent().parent().find('.remove_d').css({
        	display:'block'
        });
        $(this).parent().parent().children('.user_error1').show();
        $(this).parent().parent().children('.user_error2').hide();
        $(this).parent().parent().children('.user_error3').hide();
    });
    //清除输入内容  有bug
    $('.remove_d').on('click',function(){
        if($(this).prev().find('input').val().length>0){
            $(this).prev().find('input').val('');
            $(this).prev().css({
                border:'1px solid red'
            });
            $(this).parent().children('.user_error1').hide();
            $(this).parent().children('.user_error3').hide();
            $(this).parent().children('.user_error2').show().html("不能为空");
        }else{
            return false;
        }
    });
    //user_name验证
    $('.name').blur(function(){
    	var str = $(this).parent();
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("用户名不能为空");
            $(this).parent().parent().children('sub_name').val('1');
            return false;
        }
        var re =/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]{3,19}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("用户名格式不正确");
            $(this).parent().parent().children('sub_name').val('1');
            return false;
        }else{
        	$.ajax({
                type: "POST",
                url: '/Auto007/user/validateName',
                data: {"name":$(this).val()},
                dataType: "json",
                success: function (data) {
                    if(data.length != 0) {
                    	$(str).css({
                            border:'1px solid red'
                        });
                    	$(str).parent().children('.user_error2').show().html("该用户名已经被注册，请更换用户名");
                    	$(str).parent().children('.sub_name').val('1');
                    } else {
                    	$(str).css({
                            border:'1px solid #2FA840'
                        });
                    	$(str).parent().children('.sub_name').val('0');
                        $(str).parent().children('.user_error2').hide();
                        $(str).parent().children('.user_error3').show();
                        //失去焦点时，隐藏X图标
                        var as= $(str).parent().children('.user_error3').css('display');
                        if(as=='block'){
                            $(str).parent().children('.remove_d').hide();
                        
                        }
                    }
                }
            });
        }
    });
    //设置密码验证
    $(".pwd").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("密码不能为空");
            $(this).parent().parent().children('.sub_pws').val('1');
            return false;
        }
        var re =/^[a-zA-Z]\w{5,19}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("密码格式不正确");
            $(this).parent().parent().children('.sub_pws').val('1');
            return false;
        }else{
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
            $(this).parent().parent().children('.sub_pws').val('0');
        }
    });
    //确认密码验证
    $(".pwd_agin").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("确认密码不能为空");
            $(this).parent().parent().children('.sub_pwsa').val('1');
            return false;
        }
        var pwd =$(this).parent().parent().parent().find('.pwd').val();
        var pwd_agin=$(this).val();
        if(pwd_agin!=pwd){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("与上一次密码输入不一致");
            $(this).parent().parent().children('.sub_pwsa').val('1');
            return false;
        }else{
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
            $(this).parent().parent().children('.sub_pwsa').val('0');
        }

    });
    //联系人姓名验证
    $('.username').blur(function(){
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("联系人姓名不能为空");
            $(this).parent().parent().children('.sub_username').val('1');
            return false;
        }
        var re =/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]{3,19}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("联系人姓名格式不正确");
            $(this).parent().parent().children('.sub_username').val('1');
            return false;
        }else{
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
            $(this).parent().parent().children('.sub_username').val('0');
        }
    });
    //所在部门的验证
    $('.contactsDept').blur(function(){
    	$(this).parent().parent().children('.user_error1').hide();
    	$(this).parent().parent().children('.user_error3').hide();
    	if($(this).val() == ""){
    		$(this).parent().css({
    			border:'1px solid red'
    		});
    		$(this).parent().parent().children('.user_error2').show().html("部门不能为空");
    		$(this).parent().parent().children('.sub_contactsDept').val('1');
    		return false;
    	}else{
    		$(this).parent().css({
    			border:'1px solid #2FA840'
    		});
    		$(this).parent().parent().children('.user_error2').hide();
    		$(this).parent().parent().children('.user_error3').show();
    		$(this).parent().parent().children('.sub_contactsDept').val('0');
    	}
    });
    
    //下拉框选择
    /*$('.input_select').on('click',function(){
        $(this).children('ul').show();
    });
    $('.input_select ul').hover(function(){
        $(this).show()
    },function(){
        $(this).hide()
    });
    $('.input_select ul li').on('click',function(){
        $(this).parent().parent().children('span').html($(this).html());
    });*/
    //固定电话的验证
    $('.Fixed_telephone').blur(function(){
    	var str = $(this).parent();
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("固定电话不能为空");
            $(str).parent().children('.sub_fixed').val('1');
            return false;
        }
        var re =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("固定电话格式不正确");
            $(str).parent().children('.sub_fixed').val('1');
            return false;
        }else{
        	$.ajax({
                type: "POST",
                url: '/Auto007/user/validateFixed',
                data: {"fixed":$(this).val()},
                dataType: "json",
                success: function (data) {
                    if(data.length != 0) {
                    	$(str).css({
                            border:'1px solid red'
                        });
                    	$(str).parent().children('.user_error2').show().html("该固定电话已经被注册，请更换电话号码");
                    	$(str).parent().children('.sub_fixed').val('1');
                    } else {
                    	$(str).css({
                            border:'1px solid #2FA840'
                        });
                    	$(str).parent().children('.sub_fixed').val('0');
                        $(str).parent().children('.user_error2').hide();
                        $(str).parent().children('.user_error3').show();
                        //失去焦点时，隐藏X图标
                        var as= $(str).parent().children('.user_error3').css('display');
                        if(as=='block'){
                            $(str).parent().children('.remove_d').hide();
                        
                        }
                    }
                }
            });
        }
    });
    //手机验证
    $(".telephone").blur(function(event) {
    	var str = $(this).parent();
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("手机号不能为空");
            $(this).parent().parent().children('.sub_tel').val('1');
            return false;
        }
        var re =/^1{1}[34578]{1}[0-9]{9}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("手机号格式不正确");
            $(this).parent().parent().children('.sub_tel').val('1');
            return false;
        }else{
        	$.ajax({
                type: "POST",
                url: '/Auto007/user/validateTelephone',
                data: {"telephone":$(this).val()},
                dataType: "json",
                success: function (data) {
                    if(data.length != 0) {
                    	$(str).css({
                            border:'1px solid red'
                        });
                    	$(str).parent().children('.user_error2').show().html("该手机号码已经被注册，请更换手机号码");
                    	$(str).parent().children('.sub_tel').val('1');
                    } else {
                    	$(str).css({
                            border:'1px solid #2FA840'
                        });
                    	$(str).parent().children('.sub_tel').val('0');
                        $(str).parent().children('.user_error2').hide();
                        $(str).parent().children('.user_error3').show();
                        $('#validateTel').bind('click','validateTel()');
                        
                      //失去焦点时，隐藏X图标
                        var as= $(str).parent().children('.user_error3').css('display');
                        if(as=='block'){
                            $(str).parent().children('.remove_d').hide();
                        
                        }
                    }
                }
            });
        }
    });
  //获取验证码 按钮状态
    $('.button_a').on('click',function(){
        var i=10;
        var btn=$(this);
        //var hided=$('#userError1').css('display');
        var hided=btn.parent().prev().find(".user_error3").css('display');
        //var tell=$('.telephone_t').val();
        var tell=btn.parent().prev().find('.telephone_t').val();
        console.log(tell+"//"+hided);
        if(hided=='block' && tell.length>0){
            var time=setInterval(function(){
            	btn.parent().prev().find('.telephone').attr('disabled','disabled');
                btn.html(i+"秒可重发").attr('disabled','disabled').css({backgroundColor:'#9c9c9c'});
                if(i==-1){
                    clearInterval(time);
                    btn.parent().prev().find('.telephone').removeAttr('disabled');
                    btn.html('重新发送').attr("disabled",'disabled').removeAttr('disabled').css({backgroundColor:'#0281d4'});
                }
                i--;
            },1000);
        }

    });
    //手机短信验证码
    $(".telephone_code").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("短信验证码不能为空");
            $(this).parent().parent().children('.sub_tel_code').val('1');
            return false;
        }
        var re = /^[0-9]{6}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("短信验证码格式不正确");
            $(this).parent().parent().children('.sub_tel_code').val('1');
            return false;
        }else if($(this).val() == $(".telephone_code_rep").val()){
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
            $(this).parent().parent().children('.sub_tel_code').val('0');
        } else {
        	$(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("输入的验证码不正确");
            $(this).parent().parent().children('.sub_tel_code').val('1');
            return false;
        }
    });
    //邮箱验证
    $(".email_e").blur(function(event) {
    	var str = $(this).parent();
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("邮箱不能为空");
            $(this).parent().parent().children('.sub_email').val('1');
            return false;
        }
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("邮箱格式不正确");
            $(this).parent().parent().children('.sub_email').val('1');
            return false;
        }else{
        	$.ajax({
                type: "POST",
                url: '/Auto007/user/validateEmail',
                data: {"email":$(this).val()},
                dataType: "json",
                success: function (data) {
                    if(data.length != 0) {
                    	$(str).css({
                            border:'1px solid red'
                        });
                    	$(str).parent().children('.user_error2').show().html("该邮箱已经被注册，请更换邮箱");
                    	$(str).parent().children('.sub_email').val('1');
                    } else {
                    	$(str).css({
                            border:'1px solid #2FA840'
                        });
                    	$(str).parent().children('.sub_email').val('0');
                        $(str).parent().children('.user_error2').hide();
                        $(str).parent().children('.user_error3').show();
                        
                        //失去焦点时，隐藏X图标
                        var as= $(str).parent().children('.user_error3').css('display');
                        if(as=='block'){
                            $(str).parent().children('.remove_d').hide();
                        
                        }
                    }
                }
            });
        }
    });
    //公司名称验证	
    $(".company").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("公司名称不能为空");
            return false;
        }else{
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
        }
    });
    //公司address验证
    $(".address").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("公司地址不能为空");
            return false;
        }else{
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
        }
    });
    //支付方式
    $('.Online_payment li').eq(0).on('click',function(){
        $('.Payment').hide();
    });
    $('.Online_payment li').eq(1).on('click',function(){
        $('.Payment').show();
    });
    //图形验证码
    $(".code").blur(function(event) {
        $(this).parent().parent().children('.user_error1').hide();
        $(this).parent().parent().children('.user_error3').hide();
        if($(this).val() == ""){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("图形验证码不能为空");
            $(this).parent().parent().children('.sub_code').val('1');
            return false;
        }
        var re = /^[A-Za-z0-9]{4}$/;
        if(!re.test($(this).val())){
            $(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("图形验证码格式不正确");
            $(this).parent().parent().children('.sub_code').val('1');
            return false;
        }else if($(this).val() == $(this).parent().parent().find(".verifyCode").val()){
            $(this).parent().css({
                border:'1px solid #2FA840'
            });
            $(this).parent().parent().children('.user_error2').hide();
            $(this).parent().parent().children('.user_error3').show();
            $(this).parent().parent().children('.sub_code').val('0');
        } else {
        	$(this).parent().css({
                border:'1px solid red'
            });
            $(this).parent().parent().children('.user_error2').show().html("图形验证码输入有误");
            $(this).parent().parent().children('.sub_code').val('1');
            return false;
        }
    });
    //同意协议
    var i=0;
    $('.radio_r1').on('click',function(){
        if(i%2==0){
            $(this).removeClass('radio_r2');
            $(this).attr('data','1')
        }else{
            $(this).addClass('radio_r2');
            $(this).attr('data','0')
        }
        i++;
    });
    //协议弹出层
    $('.radio_r3').on('click',function(){
        $('.Gray_mask,.Pop_up').show();
    });
    //关闭弹出层
    $('.close_img,.Pop_up button').on('click',function(){
        $('.Gray_mask,.Pop_up').hide();
    });
	//支付
    $(".Remember_pwd").toggle(
        function () {
            $(this).addClass("Remember_pwd1").attr({data: '1'});
            $('.radio_div').show();
            if($('.check_radio1').hasClass('radio_r2')){
                $(this).next().find('span').html('月结');
            }else{
                $(this).next().find('span').html('季结');
            }
        },
        function () {
            $(this).removeClass("Remember_pwd1").attr({data: '0'});
            $('.radio_div').hide();
            $(this).next().find('span').html('需要平台审核，验证资质后，可使用此支付方式');
        }
    );
  
    //图片验证码请求
    $('.validatePicCheck').on('click',function(){
    	var str = $(this);
    	$(this).parent().parent().find(".pictureCheckCode").attr('src','/Auto007/user/validatePicCheck?'+Math.random());
    	$.ajax({
            type: "POST",
            url: '/Auto007/user/validatePicCheckValue',
            dataType: "text",
            success: function (data) {
                $(str).parent().parent().find(".verifyCode").val(data);
            }
        });
    });
  //所有input失去焦点的状态
    $('.chren_div .input_d input').blur(function(event){
        var as= $(this).parent().parent().children('.user_error3').css('display');
        if(as=='block'){
            $(this).parent().parent().children('.remove_d').hide();
        
        }
    });
    //单选按钮
    $('.check_radio1').on('click',function(){
        $(this).addClass('radio_r2');
        $('.check_radio2').removeClass('radio_r2');
        $('.check_box span').html('月结')
    });
    $('.check_radio2').on('click',function(){
        $(this).addClass('radio_r2');
        $('.check_radio1').removeClass('radio_r2');
        $('.check_box span').html('季结');
    });

});
var Registered_app=angular.module('Registered_app',[]);
Registered_app.directive('enter',function(){
    return function(scope,element,attrs){
        element.bind('click',function(){
            var name=scope.name;
            var code=scope.code;
            if(name==''|| pwd=='' || name==null || pwd==null){
                $('.error').show().html('用户名或密码必填');
            }else if(pwd.length>100){
                $('.error').show().html("密码不超过一百位");
                $('.pwd input').val('').focus();
                return false;
            } else{
                $('.error').hide();
            }
        })
    }
});
Registered_app.controller('enterprise_ctr',['$scope','$http',function($scope,$http){
    //个人注册
    $scope.Individual={
        name:'',
        pwd:'',
        agin:'',
        email:'',
        telephone:'',
        telcode:'',
        code:''
    };
    //手机验证码
    $scope.validateTel = function() {
    	if($("#userError1").css('display')=='block') {
    		$http.post(
    				'/Auto007/user/validateTel/',
    				{
    					'mobilephone' : $scope.Individual.telephone
    				},
    				{
    					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    					transformRequest: function(data){
    						return $.param(data);
    					}
    				}
    		)
    		.success(function(data){
    			$(".telephone_code_rep").val(data);
    		})
    		.error(function(data){
    			
    		})
    	}
    }
    //注册功能
    $scope.submit_one=function(){
        if($('.border_div1 .sub_name').val()==0 && $('.border_div1 .sub_pws').val()==0 && $('.border_div1 .sub_pwsa').val()==0 
        		&& $('.border_div1 .sub_email').val()==0 && $('.border_div1 .sub_tel').val()==0 && $('.border_div1 .sub_tel_code').val()==0
        		&& $('.border_div1 .sub_code').val()==0 && $('.border_div1 .radio_r1').attr('data')==0){
			 $http.post(
				'/Auto007/user/regis/', 
				{
					'name' : $scope.Individual.name,
					'password' : $scope.Individual.pwd,
					'email' : $scope.Individual.email,
					'mobilephone' : $scope.Individual.telephone,
				},
				{
				    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				    transformRequest: function(data){
				        return $.param(data);
				    }
				}
			)
            .success(function(data){
            	 window.location.href = "/Auto007/user/ulogin";
            })
            .error(function(data){

            })
        }else{
            alert('请完善资料')
        }
    };
    //企业注册
    $scope.Enterprise={
        name:'',
        pwd:'',
        agin:'',
        username:'',
        Fixed_telephone:'',
        telephone:'',
        telephone_code:'',
        email_e:'',
        company:'',
    };
    $scope.submit_two=function(){
        if($('.border_div .sub').val()==0 && $('.border_div .radio_r1').attr('data')==0){
            //$http.post('',{name:$scope.Individual.name,pwd:$scope.Individual.pwd,agin:$scope.Individual.agin,
            //    email:$scope.Individual.email,telephone:$scope.Individual.telephone,telcode:$scope.Individual.telcode,code:$scope.Individual.code})
            //    .success(function(rep){
            //
            //    })
            //    .error(function(rep){
            //
            //    })
        }else{
            alert('请完善资料')
        }
    }
}]);