define(function(require, exports, module) {
	module.exports=parseString;
  	function parseString(){
  	}

  	
  	//替换空字符
  	parseString.prototype.trimSpaces=function(str){
		if(this.isEmpty(str)){
			//var re = new RegExp(/\s/,'g');
			return str.replace(/\s/g,'');
		}else{
			return false;
		}
		
  	}

  	function strNoEmpty(str){
  		var s=$.trim(str);
		if(s.length>0)
			return true;
		else 
			return false;
  	};
  	//判断 是否为空
  	parseString.prototype.isEmpty=function(str){
  		var result=true;
  		if(str instanceof Array)
		{
			$.each(str,function(key,value){
				if(!strNoEmpty(value)){
					result=false;
					return false;
				}	
			});
		}else{
			result=strNoEmpty(str);
		}
		return result;
  	}
  	
  	/*判断 是否为  0或者大于0的  可以是0开头的  数字   */
  	parseString.prototype.isNumber=function(str){
  		if(this.isEmpty(str)){
  			return /^[0-9]*$/.test(str); 
  		}else return false;
  	}
  	/*判断 几个字符串*/
  	parseString.prototype.lessLength=function(str,length){
  		var s=$.trim(str);
  		if(s.length<=length)return true;else return false; 
  	}
  	/*判断 是否为 url  */
  	parseString.prototype.isUrl=function(str){
  		//if(this.isEmpty(str)){
  			return /[http|https]:\/\/[^\s]+/.test(str); 
  		//}else return false;
  	}

  	/*获得 不为空的字符串*/
  	parseString.prototype.getNoEmpty=function(str){
  		var s=$.trim(str);
  		if(s.length>0)return s;else return false; 
  	}


	/*获取地址get参数*/
	parseString.prototype.getGet=function(key){
		var a=window.location.href;
		var b=new RegExp("\\S+?\\?\\S*?"+key+"=([^&#]+)&{0,1}","g");
		var c=b.exec(a);
		if(c)
		return c[1];
		else
		return false;
	}


	//获取html名称
	parseString.prototype.getHtmlName=function(location){
		var b=new RegExp("\\S+\\/(\\S*?)\\.html","g");
		var c=b.exec(location);
		if(c)
		return c[1];
		else
		return false;
	}

	//毫秒转换 年月日时分秒
	parseString.prototype.MSToYMDHMS=function(millisecond){
		var o=new Date(millisecond);
		var y=o.getFullYear();
		var m=o.getMonth()+1;
		m=m>9?m:'0'+m;
		var d=o.getDate()>9?o.getDate():'0'+o.getDate();
		var h=o.getHours()>9?o.getHours():'0'+o.getHours();
		var min=o.getMinutes()>9?o.getMinutes():'0'+o.getMinutes();
		var s=o.getSeconds()>9?o.getSeconds():'0'+o.getSeconds();
		return y+'-'+m+'-'+d+' '+h+':'+min+':'+s;
	}
	
	//毫秒距离现在时间
	parseString.prototype.MSToNow=function(millisecond){
		var o=new Date();
		var msShort=o.getTime()-millisecond;
		if(msShort<1000*60){
		  return Math.floor(msShort/1000)+'秒前';
		}
		if(msShort>=60*1000&&msShort<60*1000*60){
		  return Math.floor(msShort/60000)+'分钟前';
		}
		if(msShort>=60*1000*60&&msShort<60*1000*60*24){
		  return Math.floor(msShort/3600000)+'小时前';
		}
		if(msShort>=60*1000*60*24){
		  return Math.floor(msShort/86400000)+'天前';
		}
	}


});

