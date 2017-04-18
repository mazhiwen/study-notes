define(function(require) {
	require('commonMain')();

	$(".sub_nav_box>li").each(function(key,value){
		$(this).click(function(){
			$(this).addClass("sub_nav_active");
			$(this).siblings().removeClass("sub_nav_active");
			var tthis=$(".sub_"+(key+1));
			tthis.show();
			tthis.siblings().hide();
			//sub_nav_active
		});
	});

	
});

