layui.use(['layer','form'], function(){
	var layer = layui.layer;
	var form = layui.form;


	//初始默认配置
	var defaultconf = {
		page_size:100,
		shubiao_size:25,
		bg_color:'#e91e63',
		zi_color:'#e91e63',
		switch1:0,
		switch2:0
	}
	

	//监听放大页面
	$('#page_da').click(function(){
		defaultconf.page_size = defaultconf.page_size + 10;
        chrome.storage.local.set({'page_size':defaultconf.page_size},function(){
    	 	sendMessageToInsertJS({type:'page_size',value:defaultconf.page_size},function(res){
				layer.msg('已操作！');
			});
        });
	});


	//监听缩小页面
	$('#page_xiao').click(function(){
		defaultconf.page_size = defaultconf.page_size - 10;
        chrome.storage.local.set({'page_size':defaultconf.page_size},function(){
    	 	sendMessageToInsertJS({type:'page_size',value:defaultconf.page_size},function(res){
				layer.msg('已操作！');
			});
        });
	});

	//监听切换明亮|暗黑模式
	form.on('switch(switch1)', function(data){
		var status = this.checked ? 1 : 0;
	    console.info(status);
        chrome.storage.local.set({'switch1':status},function(){
    	 	sendMessageToInsertJS({type:'switch1',value:status},function(res){
				layer.msg('已操作！');
			});
        });
	});

	//监听选中哪个亮色
	form.on('radio', function(data){
	    console.info(data.value);
		defaultconf.zi_color = data.value;
        chrome.storage.local.set({'zi_color':defaultconf.zi_color},function(){
    	 	sendMessageToInsertJS({type:'zi_color',value:defaultconf.zi_color},function(res){
				layer.msg('已操作！');
			});
        });
	});



	//监听鼠标放大
	$('#shu_da').click(function(){
		defaultconf.shubiao_size = defaultconf.shubiao_size + 10;
        chrome.storage.local.set({'shubiao_size':defaultconf.shubiao_size},function(){
    	 	sendMessageToInsertJS({type:'shubiao_size',value:defaultconf.shubiao_size},function(res){
				layer.msg('已操作！');
			});
        });
	});


	//监听鼠标缩小
	$('#shu_xiao').click(function(){
		defaultconf.shubiao_size = defaultconf.shubiao_size - 10;
        chrome.storage.local.set({'shubiao_size':defaultconf.shubiao_size},function(){
    	 	sendMessageToInsertJS({type:'shubiao_size',value:defaultconf.shubiao_size},function(res){
				layer.msg('已操作！');
			});
        });
	});

	//监听开启|关闭十字星
	form.on('switch(switch2)', function(data){
		var status = this.checked ? 1 : 0;
	    console.info(status);
        chrome.storage.local.set({'switch2':status},function(){
    	 	sendMessageToInsertJS({type:'switch2',value:status},function(res){
				layer.msg('已操作！');
			});
        });
	});


	

	
	//给网页发送消息
	function sendMessageToInsertJS(info, fn){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			console.log(info)
			chrome.tabs.sendMessage(tabs[0].id, info, function(response){
				fn && fn(response);
			});
		});
	}
});
