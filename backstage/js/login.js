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
	
	//判断登录的状态
	let token = window.localStorage.getItem('token')
	if(!token){
		$('.btn-login').click(function(){
			if($(this).hasClass('disable')) return false;
			$(this).addClass('disabled')
			
			
			
			if($(".ghg-backstage-login").valid()){
				let username = $('[name=name]').val()
				let password = $('[name=password]').val()
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
							$.toolTip({
								type:'success',
								content:res.message,
								interval:2,
								success:function(){
									window.location.href = 'index.html'
								}
							})
						}else{
							$('.btn-login').removeClass('disable')
							$.toolTip({
								type:'info',
								content:res.message,
								interval:2
							})
						}
						
					}
				});
			}else{
				$('.btn-login').removeClass('disable')
				$.toolTip({
					type:'danger',
					content:"至少一项为空",
					interval:2
				})
			}	
		})
	}else{
		window.location.href = 'index.html'
	}
})
