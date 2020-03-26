define(function(require) {
	require('commonMain')();
	var parseString=new(require('parseString')),
		requestCategory='watched';
	AJAXMY.send('/article/list',{category_code:requestCategory,page:1,size:30},function(data){
		var dr=data['result'],
			articleHtml='';
		$.each(dr,function(key,value){
			articleHtml+='<div class="article_box"><img src="'+value['coverPic']+'"><div class="article_text_box"><span class="article_type">立方动态</span><a href="article_details.html?id='+value['id']+'" class="article_title">'+value['title']+'</a><p class="article_desc">'+value['summary']+'</p><span class="article_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></div></div>';
		});

		$(".content_left").append(articleHtml);
	});


	AJAXMY.send('/article/list',{category_code:'report',page:1,size:3},function(data){
		var dr=data['result'],
			rightArticle='';
		rightArticle='<div class="linked_wrap"><span class="article_type article_type_linked article_type_red">媒体报道</span>';	
		$.each(dr,function(key,value){
			rightArticle+='<div class="linked_article_wrap"><a href="article_details.html?id='+value['id']+'" class="linked_title_box"><span class="linked_author">'+value['source']+'</span><span class="linked_title">'+value['title']+'</span></a><p class="linked_author_wrap"><span>'+value['authorName']+'</span><span class="linked_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></p></div>';
		});

		$(".content_right").append(rightArticle+'</div>');
	});

	AJAXMY.send('/article/list',{category_code:'watched',page:1,size:3},function(data){
		var dr=data['result'],
			rightArticle='';
		rightArticle='<div class="linked_wrap"><span class="article_type article_type_linked article_type_blue">立方观察</span>';	
		$.each(dr,function(key,value){
			rightArticle+='<div class="linked_article_wrap"><a href="article_details.html?id='+value['id']+'" class="linked_title_box"><span class="linked_author">'+value['source']+'</span><span class="linked_title">'+value['title']+'</span></a><p class="linked_author_wrap"><span>'+value['authorName']+'</span><span class="linked_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></p></div>';
		});

		$(".content_right").append(rightArticle+'</div>');
	});


	AJAXMY.send('/article/list',{category_code:'activity',page:1,size:3},function(data){
		var dr=data['result'],
			rightArticle='';
		rightArticle='<div class="linked_wrap"><span class="article_type article_type_linked article_type_yellow">最新活动</span>';	
		$.each(dr,function(key,value){
			rightArticle+='<div class="linked_article_wrap"><a href="article_details.html?id='+value['id']+'" class="linked_title_box"><span class="linked_author">'+value['source']+'</span><span class="linked_title">'+value['title']+'</span></a><p class="linked_author_wrap"><span>'+value['authorName']+'</span><span class="linked_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></p></div>';
		});

		$(".content_right").append(rightArticle+'</div>');
	});

});

