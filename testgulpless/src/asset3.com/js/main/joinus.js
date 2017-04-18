define(function(require) {
	require('commonMain')();



	AJAXMY.send('/joboffer/list',{page:1,size:PERPAGINGCOUNT},function(d){
		var s='';


		$.each(d['result'],function(k,v){
			//console.log(v['content'].split(/[\r|\n]+/));
			var content='<p>'+v['content'].split(/[\r|\n]+/).join('</p><p>')+'</p>';
			var requirements='<p>'+v['requirements'].split(/[\r|\n]+/).join('</p><p>')+'</p>';	
			s+='<div><h2 class="main_title jobtitle">'+v['title']+'</h2><strong>岗位职责 :</strong>'+content+'<strong class="mar_top_23">任职要求:</strong>'+requirements+'</div>';
		});
		$(".job_outer_box").append(s);
	});




});

