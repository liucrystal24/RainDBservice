var canGetCookie = 0;//是否支持存储Cookie 0 不支持 1 支持
		var ajaxmockjax = 1;//是否启用虚拟Ajax的请求响 0 不启用  1 启用
		//默认账号密码
		
		var truelogin = "GLXF";
		var truepwd = "123";
		
		var CodeVal = 0;
	    Code();
	    function Code() {
			if(canGetCookie == 1){
				createCode("AdminCode");
				var AdminCode = getCookieValue("AdminCode");
				showCheck(AdminCode);
			}else{
				showCheck(createCode(""));
			}
	    }
	    function showCheck(a) {
			CodeVal = a;
	        var c = document.getElementById("myCanvas");
	        var ctx = c.getContext("2d");
	        ctx.clearRect(0, 0, 1000, 1000);
	        ctx.font = "80px 'Hiragino Sans GB'";
	        ctx.fillStyle = "#E8DFE8";
	        ctx.fillText(a, 0, 100);
	    }
	    $(document).keypress(function (e) {
	        // 回车键事件  
	        if (e.which == 13) {
	            $('input[type="button"]').click();
	        }
	    });
	    //粒子背景特效
	    $('body').particleground({
	        dotColor: '#E8DFE8',
	        lineColor: '#133b88'
	    });
	    $('input[name="pwd"]').focus(function () {
	        $(this).attr('type', 'password');
	    });
	    $('input[type="text"]').focus(function () {
	        $(this).prev().animate({ 'opacity': '1' }, 200);
	    });
	    $('input[type="text"],input[type="password"]').blur(function () {
	        $(this).prev().animate({ 'opacity': '.5' }, 200);
	    });
	    $('input[name="login"],input[name="pwd"]').keyup(function () {
	        var Len = $(this).val().length;
	        if (!$(this).val() == '' && Len >= 5) {
	            $(this).next().animate({
	                'opacity': '1',
	                'right': '30'
	            }, 200);
	        } else {
	            $(this).next().animate({
	                'opacity': '0',
	                'right': '20'
	            }, 200);
	        }
	    });
	    var open = 0;
	    layui.use('layer', function () {
			//非空验证
	        $('#login_button').click(function (){
	            var login = $('input[name="login"]').val();
	            var pwd = $('input[name="pwd"]').val();
	            var code = $('input[name="code"]').val();
	            if (login == '') {
	                ErroAlert('请输入您的账号');
	            } else if (pwd == '') {
	                ErroAlert('请输入密码');
	            } else if (code == '' || code.length != 4) {
	                ErroAlert('输入验证码');
	            } else {
					//ajax验证(地址，接口名称确定，if判断)
					$.ajax({
						type: "post",
						url: url1+":8080/NBDServer/servlet/Login",
						data:{'name':login,'psd':pwd},
						dataType:"json",
						success : function(data) {
							if(data == 1 && code.toUpperCase() == CodeVal.toUpperCase()){
								sessionStorage['Beidoucar_username'] = login
								sessionStorage['Beidoucar_password'] = pwd
								window.location.href='index.html'
							}else{
								ErroAlert('账号、密码或验证码错误，请检查后输入')
							}
						},
						error:function(e){
							console.log(e)
							ErroAlert('请检查网络连接……')
						}
					})
				}
			})
			$('#qu_update').click(function (){
	            var login = $('input[name="ologin"]').val();
	            var opwd = $('input[name="opwd"]').val();
				var npwd = $('input[name="npwd"]').val();
	            var npwd2 = $('input[name="npwd2"]').val();				
	            if (login == '') {
	                ErroAlert('请输入您的账号');
	            } else if (opwd == '' ||npwd == '' ||npwd2 == '') {
	                ErroAlert('请输入密码');
	            } else if (npwd != npwd2) {
	                ErroAlert('两次新密码输入不一致');
	            } else {
					//ajax验证(地址，接口名称确定，if判断)
					$.ajax({
						type: "post",
						url: url1+":8080/NBDServer/servlet/SavePsd",
						data:{'name':login,'opsd':opwd,'npsd':npwd},
						dataType:"json",
						success : function(data) {
							if(data == 1){
								SuccessAlert('修改成功')
								$('.flip').removeClass('flip2')
							}else{
								ErroAlert('原密码输出错误，请重新输入')
							}
						},
						error:function(e){
							console.log(e)
							ErroAlert('请检查网络连接……')
						}
					})
				}
			})
		})
		$('.my_update').on('click',function(){
			$('.flip').addClass('flip2')
		})
		$('.return_login').on('click',function(){
			$('.flip').removeClass('flip2')
		})
		