$(function(){

	
		//验证表单
		$(".ghg-backstage-login").validate({
			rules:{
				name:{
					required:true
				},
				password:{
					required:true
				},
				verify:{
					required:true
				}
			}
		})
		var show_num = [];
		draw(show_num);
	
	
		//判断登录的状态
		let token = window.localStorage.getItem('token')
		if(!token){
			$('.btn-login').click(function(){
				var val = $(".input-val").val().toLowerCase();
				var num = show_num.join("");
				if(val==''){
					alert('请输入验证码！');
				}else if(val == num){
					if($(this).hasClass('disable')) return false;	
					if($(".ghg-backstage-login").valid()){
						let username = $('[name=name]').val()
						let password = $('[name=password]').val()
						password = hex_md5(password)
						console.log(password)
						let verify = $('[name=verify]').val()
						$.ajax({
							type:"post",
							url:api+"login",
							async:true,
							data:{
								username,
								password,
								verify
							},
							success:function(res){
								if(res.status==200){
									console.log(res)
									window.localStorage.setItem('token',res.info.token)
									
									let dataJson = JSON.stringify(res.info.data.result[0].name)
									//console.log(dataJson)
									window.localStorage.setItem('info',dataJson)
									$(this).addClass('disabled')
									console.log(api)
									window.location.href = api+'mian.html'
								}else{
									alert(res.message)
								}
								
							}
						});
					}else{
						$('.btn-login').removeClass('disable')
					}					
	
	
				
				}else{
					alert('验证码错误！请重新输入！');
					$(".input-val").val('');
					draw(show_num);
				}
			})
		}else{
			window.location.href = api+'mian.html'
		}
		
	
	})
	