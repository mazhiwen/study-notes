define(function(require) {
	require('commonMain')();
	var parseString=new(require('parseString'));

	var ARTICLECATEGORY={
		'watched':'立方观察',
		'research':'研究报告',
		'report':'媒体报道',
		'activity':'最新活动'
	};

	AJAXMY.send('/article/detail',{id:parseString.getGet('id')},function(data){
		var dArticle=data['result']['article'],
			dList=data['result']['articleList'];
		$(".main_category").text(dArticle['categoryName']);
		$(".main_title").text(dArticle['title']);
		$(".main_time").text(parseString.MSToYMDHMS(dArticle['postTime']));
		$(".article_main").append(dArticle['content']);
		var listHtml='';
		$.each(dList,function(key,value){
			listHtml+='<div class="linked_article_wrap"><a href="article_details.html?id='+value['id']+'" class="linked_title_box"><span class="linked_author">'+value['source']+'</span><span class="linked_title">'+value['title']+'</span></a><p class="linked_author_wrap"><span>'+value['authorName']+'</span><span class="linked_time">'+parseString.MSToYMDHMS(value['postTime'])+'</span></p></div>';
		});
		$(".linked_wrap").append(listHtml);
	});


	
});

