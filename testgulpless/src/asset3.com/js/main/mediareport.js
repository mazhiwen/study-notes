define(function(require) {
	require('commonMain')();
	var parseString=new(require('parseString'));
	AJAXMY.send('/article/list',{category_code:'report',page:1,size:30},function(data){
		var dr=data['result'],
			articleHtml='';
		$.each(dr,function(key,value){
			articleHtml+='<div class="article_box"><img src="'+value['coverPic']+'"><div class="article_text_box"><span class="article_type">媒体报道</span><a href="article_details.html?id='+value['id']+'" class="article_title">'+value['title']+'</a><p class="article_desc">'+value['summary']+'</p><span class="article_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></div></div>';
		});

		$(".content_left").append(articleHtml);
	});




});

