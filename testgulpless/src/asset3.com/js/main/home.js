define(function(require) {
	require('commonMain')();
	var	scrollLeft=-1;

	/*计算滚动头像相关宽度*/
	var  scroll_head_oo_width_cal=Math.floor($("#scroll_head").width())-40-80;
	var scroll_head_div_width=Math.floor(scroll_head_oo_width_cal/3);
	/*滚动头像框宽度*/
	//$("#scroll_head_outer>div").css("width",scroll_head_div_width-100);
	/*滚动头像的外外层设置宽度*/
	$("#scroll_head_oo").css("width",scroll_head_div_width*3);
	/*滚动头像的外层偏移*/
	//$("#scroll_head_outer").css("left",-scroll_head_div_width+"px");
	


	$(".banner_img_box1").addClass('banner_1_animate');

	//左右滚动图
	$(".scroll_left").click(function(){
		$(".scroll_head_oo>div").each(function(key,value){
			var nowClass=$(this).attr('class');
			var nowIndex=parseInt(nowClass.substr(8));
			var nextIndex=null;
			if(nowIndex==8)
				nextIndex=1;
			else
				nextIndex=++nowIndex;
			$(this).removeClass(nowClass).addClass('scroll_p'+nextIndex);

		});
	});
	$(".scroll_right").click(function(){
		$(".scroll_head_oo>div").each(function(key,value){
			var nowClass=$(this).attr('class');
			//var nowIndex=nowClass[8];
			var nowIndex=nowClass.substr(8);
			var nextIndex=null;
			if(nowIndex==1)
				nextIndex=8;
			else
				nextIndex=--nowIndex;
			$(this).removeClass(nowClass).addClass('scroll_p'+nextIndex);

		});
	});

	//banner图
	var bannerPos=1;
	$("input[name='choose_img_radio']").change(function(){
		clearInterval(bannerInterval);
		$(this).parent().addClass("radio_active");
		$(this).parent().siblings().removeClass("radio_active");
		var chosIndex=$(this).val();
		$(".banner_img_box:eq("+(bannerPos-1)+")").removeClass("banner_"+bannerPos+"_animate");
		$(".banner_img_box:eq("+(chosIndex-1)+")").addClass("banner_"+chosIndex+"_animate");
		bannerPos=chosIndex;
	});
 	//banner图定时
	function bannerSwitch(){
		if(bannerPos<3)
			bannerPos++;
		else
			bannerPos=1;
		var nowIndex=bannerPos-1;
		$(".banner_choose_box>label:eq("+nowIndex+")").addClass("radio_active");
		$(".banner_img_box:eq("+nowIndex+")").addClass("banner_"+bannerPos+"_animate");
		$(".banner_choose_box>label:eq("+nowIndex+")").siblings().removeClass("radio_active");
		var lastIndex=null;
		if(nowIndex==0){ 
			lastIndex=2;	
		}else{
			lastIndex=nowIndex-1;
		}
		$(".banner_img_box:eq("+lastIndex+")").removeClass("banner_"+(lastIndex+1)+"_animate");
	}

	var bannerInterval=setInterval(bannerSwitch,5000);


	//第四部分字体滚动
	function sectionFourAnimateFn(){
		$(".section_4_animate_box>li").each(function(){
            var nowClass=$(this).attr("class");
            var nowClassIndex=nowClass.substr(10,1);
            var changeIndex;
            if(nowClassIndex==9){
                changeIndex=1;
            }else{
                changeIndex=parseInt(nowClassIndex)+1;
            }
            $(this).addClass('sec_4_ani_'+changeIndex).removeClass(nowClass);
        });
	}
	
	setInterval(sectionFourAnimateFn,2500);


	
	



});

