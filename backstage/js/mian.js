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


	
	let api = 'http://192.168.97.251:3000/'

	// 删除新闻
	$(".ghg-back-getnews").on("click",'.icon-laji',function(){
		var id = $(this).closest("tr").find('td').eq(0).html()
		console.log(id)
	})

	// 修改新闻
	$(".ghg-back-getnews").on("click",'.icon-pinglun-copy-copy',function(){
		var id = $(this).closest("tr").find('td').eq(0).html()
		console.log(id)
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
					alert("修改成功")
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



	//获取新闻数据
	getnew()
	function getnew(){
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



