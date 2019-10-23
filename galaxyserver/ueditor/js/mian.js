$(function(){

	//tab 切换
	$('.leftsidebar-list li').click(function(){
		//导航栏样式
		$(this).addClass('on').siblings().removeClass('on')
		var index = $(this).index()
		$('.ghg-back-content').eq(index).addClass('on').siblings().removeClass('on')		
		$(this).find('b').addClass('on')
		$(this).siblings().find('b').removeClass('on')		
		$(this).find("b.ghg-tab-inco").removeClass("icon-down-fill-xs")
		$(this).find("b.ghg-tab-inco").addClass("icon-xiala")		
		$(this).siblings().find("b.ghg-tab-inco").removeClass("icon-xiala")
		$(this).siblings().find("b.ghg-tab-inco").addClass("icon-down-fill-xs")		
	})

	// 渲染登录信息
	let info = window.localStorage.getItem("info")
	info = JSON.parse(info)
	let html = `<p>欢迎:<span style="color:red"> ${info} <span></p>
	<p><a href="./login.html" class="ghg-outlogon">退出</a></p>`
	$(".ghg-back-login").html(html)
	
	let token = window.localStorage.getItem("token")
	if(!token && !window.localStorage.getItem("info")){
		window.location.href=api+'login.html'
	}

	// 退出登录
	$(".ghg-back-login").on("click",".ghg-outlogon",function(){
		window.localStorage.removeItem("info")
		window.localStorage.removeItem("token")
		window.location.href=api+'login.html'
	})

	// 验证登录
	$.ajax({
		url:api+'verifylogin',
		type:'post',
		dataType:'json',
		data:{token},
		success:function(res){
			if(res.status !=200){
				alert(res.message)
				window.localStorage.removeItem("info")
				window.localStorage.removeItem("token")
				window.location.href = api+'login.html'
			}
		}
	})
	




	
	let ue = UE.getEditor('editor')
	let ue1 = UE.getEditor('editor1')
	let ue2 = UE.getEditor('editor2')
	let ue3 = UE.getEditor('editor3')


	
	
	
	// 添加新闻
	$(".addNews").click(function(){
		ue.ready(function(){
			let html = ue.getContent()
			$(".addNewsText").val(html)
			let form = document.querySelector(".addnews-form")
			let formData = new FormData(form)
			$.ajax({
				url:api+"addnews",
				type:'post',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(res){
					if(res.status == 200){
						alert('添加成功')
						$('#newsModal').modal('hide')
						getnews()
					}else{
						alert("宁输入有误:"+res.message)
					}
					
				}
			})			
		})
	})
	// 更改新闻
	$(".ghg-back-getnews").on("click",".icon-pinglun-copy-copy",function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		ue1.ready(function(){
			$.ajax({
				url:api+"getnewsById",
				type:'post',
				dataType:'json',
				data:{id},
				success:function(res){
					if(res.status == 200){
						let time = (res.data[0].time.split("T"))
						$(".updateNewsTitle").val(res.data[0].title)
						$(".updateNewsTime").val(time[0])
						ue1.setContent(res.data[0].text)
					}
				}
			})

			$(".updateNews").click(function(){
				let html = ue1.getContent()
				$(".updatenewsId").val(id)
				console.log(html)
				$(".updatenewsText").val(html)
				let form = document.querySelector(".updatenews-form")
				let formData = new FormData(form)
				$.ajax({
					url:api+"updatenews",
					type:'post',
					dataType:'json',
					data:formData,
					contentType:false,
					processData:false,
					success:function(res){
						if(res.status == 200){
							alert("修改成功")
							$('#updtenewsModal').modal('hide')
							getnews()
						}else{
							alert("宁输入有误:"+res.message)
						}
						
					}
				})
			})
		
		})
	})		
	// 删除新闻
	$(".ghg-back-getnews").on("click",'.icon-laji',function(){
		var id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deletenews ',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					alert("删除成功")
					getnews()
				}else{
					alert(res.message)
				}
			}
		})
	})
	// 添加动态
	$(".addDynamic").click(function(){
		ue2.ready(function(){
			let html = ue2.getContent()
			$(".adddynamicText").val(html)
			let form = document.querySelector(".adddynamic-form")
			let formData = new FormData(form)
			$.ajax({
				url:api+"adddynamic",
				type:'post',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(res){
					if(res.status == 200){
						alert('添加成功')
						$('#dynamicModal').modal('hide')
						getdynamic()
					}else{
						alert("宁输入有误:"+res.message)
					}
					
				}
			})			
		})
	})
	// 更改动态
	$(".ghg-back-dynamic").on("click",".icon-pinglun-copy-copy",function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'getdynamicById',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					let time = (res.data[0].time.split("T"))
					$(".updatedynamicTitle").val(res.data[0].title)
					$(".updatedynamicTime").val(time[0])
					$(".updatedynamicClassify").val(res.data[0].class)
					ue3.setContent(res.data[0].text)
				}
			}
		})
		ue3.ready(function(){
			$(".updateDynamic").click(function(){
				let html = ue3.getContent()
				$(".updatedynamicId").val(id)
				$(".updatedynamicText").val(html)
				let form = document.querySelector(".updatedynamic-form")
				let formData = new FormData(form)
				$.ajax({
					url:api+"updatedynamic",
					type:'post',
					dataType:'json',
					data:formData,
					contentType:false,
					processData:false,
					success:function(res){
						if(res.status == 200){
							alert("修改成功")
							$('#updateDynamicModal').modal('hide')
							getdynamic()
						}else{
							alert("宁输入有误:"+res.message)
						}
						
					}
				})
			})
		
		})
	})
	// 删除动态
	$(".ghg-back-dynamic").on("click",'.icon-laji',function(){
		var id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deletedynamic ',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					alert("修改成功")
					getdynamic()
				}else{
					alert(res.message)
				}
			}
		})
	})
	getvideo()
	// 添加星河视频
	$(".addVideoNow").click(function(){
		let form = document.querySelector(".addvideo-form")
		let formData = new FormData(form)
		$.ajax({
			url:api+"addvideo",
			type:'post',
			dataType:'json',
			data:formData,
			contentType:false,
			processData:false,
			success:function(res){
				if(res.status == 200){
					$('#addVideoModal').modal('hide')
					alert('添加成功')
					getvideo()
				}else{
					alert("宁输入有误:"+res.message)
				}
				
			}
		})
	})
	// 修改星河视频
	$(".ghg-back-getvideo").on("click",'.icon-pinglun-copy-copy',function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+"getvideoById",
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					let time = (res.data[0].Time.split("T"))
					$(".updatevideoTitle").val(res.data[0].title)
					$(".updatevideoTime").val(time[0])
				}
			}
		})
		// 修改星河视频
		$(".updateVideo").click(function(){
			$(".videoId").val(id)
			let form = document.querySelector(".updateVideo-form")
			let formData = new FormData(form)
			$.ajax({
				url:api+"updatevideo",
				type:'post',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(res){
					if(res.status == 200){
						alert("修改成功")
						$('#updateVideoModal').modal('hide')
						getvideo()
					}else{
						alert("宁输入有误:"+res.message)
					}
					
				}
			})
		})
		
	})
	// 删除星河视频
	$(".ghg-back-getvideo").on("click",'.deleteVideo',function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deletevideo ',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					alert("修改成功")
					getvideo()
				}else{
					alert(res.message)
				}
			}
		})
	})
	getmessage()
	// 删除message
	$(".ghg-back-addmessage").on("click",".deleteMessage",function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deletemessage ',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					alert("删除成功")
					getmessage()
				}else{
					alert(res.message)
				}
			}
		})
	})
	getalliance()
	// 添加合作伙伴
	$(".addAlliance").click(function(){
		let form = document.querySelector(".addalliance-form")
		let formData = new FormData(form)
		$.ajax({
			url:api+"addalliance",
			type:'post',
			dataType:'json',
			data:formData,
			contentType:false,
			processData:false,
			success:function(res){
				if(res.status == 200){
					$('#addAllianceModal').modal('hide')
					alert('添加成功')
					getalliance()
				}else{
					alert("宁输入有误:"+res.message)
				}
				
			}
		})
	})
	// 修改合作伙伴
	$(".ghg-back-getalliance").on("click",'.icon-pinglun-copy-copy',function(){
	
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+"getallianceById",
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					$(".updateallianceName").val(res.data[0].name)
					$(".updateallianceClassify" ).val(res.data[0].id)
				}
			}
		})
		$(".updateAlliance").click(function(){
			$(".allianceId").val(id)
			let form = document.querySelector(".updateAlliance-form")
			let formData = new FormData(form)
			$.ajax({
				url:api+"updatealliance",
				type:'post',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(res){
					if(res.status == 200){
						$('#updateAllianceModal').modal('hide')
						alert("修改成功")
						getalliance()
					}else{
						alert("宁输入有误:"+res.message)
					}
					
				}
			})
		})
	})
	// 删除合作伙伴
	$(".ghg-back-getalliance").on("click",'.deleteAlliance',function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deletealliance',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status==200){
					alert('删除成功')
					getalliance()
				}else{
					alert(res.message)
				}
			}
		})
	})
	getadvertise()
	// 添加招聘信息
	$(".addAdvertise").click(function(){
		let form = document.querySelector(".addAdvertise-form")
		let formData = new FormData(form)
		$.ajax({
			url:api+"addadvertise",
			type:'post',
			dataType:'json',
			data:formData,
			contentType:false,
			processData:false,
			success:function(res){
				if(res.status == 200){
					$('#addAdvertiseModal').modal('hide')
					alert('添加成功')
					getadvertise()
				}else{
					alert("宁输入有误:"+res.message)
				}
				
			}
		})
	})
	// 修改招聘信息
	$('.ghg-back-getadvertise').on('click','.icon-pinglun-copy-copy',function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+"getadvertiseById",
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status == 200){
					$(".updateadvertiseSection").val(res.data[0].section)
					$(".updateadvertiseName").val(res.data[0].name)
					$(".updateadvertisePlace").val(res.data[0].place)
				}
			}
		})
		$(".updateAdervtise").click(function(){
			$(".advertiseId").val(id)
			let form = document.querySelector(".updateAdvertise-form")
			let formData = new FormData(form)
			$.ajax({
				url:api+"updateadvertise",
				type:'post',
				dataType:'json',
				data:formData,
				contentType:false,
				processData:false,
				success:function(res){
					if(res.status == 200){
						$('#updateAdvertiseModal').modal('hide')
						alert("修改成功")
						getadvertise()
					}else{
						alert("宁输入有误:"+res.message)
					}
					
				}
			})
		})		
	})
	// 删除招聘信息
	$('.ghg-back-getadvertise').on('click','.icon-laji',function(){
		let id = $(this).closest("tr").find('td').eq(0).html()
		$.ajax({
			url:api+'deleteadvertise',
			type:'post',
			dataType:'json',
			data:{id},
			success:function(res){
				if(res.status==200){
					alert('删除成功')
					getadvertise()
				}else{
					alert(res.message)
				}
			}
		})
	})



	// 渲染动态和合作伙伴分类
	getClassify()
	function getClassify(){
		$.ajax({
			url:api+'dynamicClassify',
			type:'post',
			dataType:'json',
			success:function(res){
				let html = ``
				for(let item of res.data){
					html += `<option class="updateoptionClassify" value="${item.classId}">${item.className}</option>`
				}
				$(".dynamicClassify").append(html)
				$(".allianceClassify").append(html)
				
			}
		})
	}

	// 清除下拉选框的内容
	
	function clearSelection(){
		let addAllianceModal  = $("#addAllianceModal").css("display")
		let updateAllianceModal  = $("#updateAllianceModal").css("display")
		let updateDynamicModal  = $("#updateDynamicModal").css("display")
		let adddynamicModal  = $("#dynamicModal").css("display")
		
		if( updateAllianceModal == "block" || updateDynamicModal == "block" ){
		}else{
		}
	}
	//获取新闻数据
	getnews()
	function getnews(){
		$.ajax({
			url: api+'getnews',
			type: 'post',
			dataType: 'json',
			success:function(res){
				var html = template('ghg-about-getnew',res)
				$('.ghg-back-getnews').html(html)
			}
		})
	}
	//获取业务动态
	getdynamic()
	function getdynamic(){
		$.ajax({
			url: api+'getdynamic',
			type: 'post',
			dataType: 'json',
			success: function(res){
				var html =template('ghg-back-dynamic',res)
				$('.ghg-back-dynamic').html(html)
			}
		})
	}
	//留言数据
	function getmessage(){
		$.ajax({
			url: api+'getmessage ',
			type: 'post',
			dataType: 'json',
			success: function(res){
				var html =template('ghg-back-addmessage',res)
				$('.ghg-back-addmessage').html(html)
			}
		})
	}
	//合作伙伴数据
	function getalliance(){
		$.ajax({
			url: api+'getalliance',
			type: 'post',
			dataType: 'json',
			success: function(res){
				var html =template('ghg-back-getalliance',res)
				$('.ghg-back-getalliance').html(html)
			}
		})
	}
	//招聘数据
	function getadvertise(){
		$.ajax({
			url: api+'getadvertise',
			type: 'post',
			dataType: 'json',
			success: function(res){
				var html =template('ghg-back-getadvertise',res)
				$('.ghg-back-getadvertise').html(html)
			}
		})
	}
	//星河视频
	function getvideo(){
		$.ajax({
			type:"post",
			url:api+'getvideo',
			async:true,
			datatype:'json',
			success:function(res){
				var html = template('ghg-about-getvideo',res)
				$('.ghg-back-getvideo').html(html)
			}
		});	
	}
})



