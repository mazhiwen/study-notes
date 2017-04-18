define(function(require, exports, module) {
	module.exports=ajaxMy;
	function ajaxMy(){
		this.requestHead=REQUESTHEAD;
	}
  	/*
	绑定元素 上传 发送
	parameterA: 1 文章  2专题  3话题

  	*/
	ajaxMy.prototype.upLoad=function(inputId,responseFn,parameterA){
		var e=document.getElementById(inputId),
			fd=new FormData(),
			tthis=this;
		e.addEventListener("change",function(event){
			var files=e.files,
				xhr = new XMLHttpRequest();
			for(var i=0,file;file=files[i];i++){
				fd.append('file', file);
			}
			fd.append('type',parameterA);
			xhr.addEventListener('load',function(event){
				var responseUrl=JSON.parse(this.responseText)['data']['pic_url'];
				var sysImageId=JSON.parse(this.responseText)['data']['sysImageId'];
				responseFn.call(this,responseUrl,sysImageId);
			});
			xhr.open("POST", tthis.requestHead+"/upload_image", true);
			xhr.send(fd);
		},false);
	}

	/*
	json 数据

  	*/
	ajaxMy.prototype.send=function(urlTail,sendData,successFn){
		$.ajax({
			type:"POST",
			url:this.requestHead+'/web'+urlTail,
			data:sendData,
			dataType:"json",
			success:function(d){
				if(d['sys']==200){
					var code=d['code'];
					if(code==0){
						successFn.call(this,d['data']);
					}
					else{
						popUpWindow.alert('操作失败：'+d['desc'],function(){});
						if(code==102){
							docCookies.removeItem('loginName','/');
							docCookies.removeItem('loginPassword','/');
							window.location.href='login.html';
						}
					} 
				}else{
					popUpWindow.alert('操作失败：网络原因',function(){});
				}
			}
		});		
	}

	/*
	json 数据  原生

	
	ajaxMy.prototype.send=function(urlTail,sendData,successFn){
		var urlHead=REQUESTHEAD;
		$.ajax({
			type:"POST",
			url:urlHead+urlTail,
			data:sendData,
			dataType:"json",
			success:function(d){
				if(d['sys']==200){
					if(d['code']==0){
						successFn.call(this,d['data']);
					}
					else{
						//successFn.call(this,false);
						popUpWindow.alert('操作失败：'+d['desc'],function(){});
					}
				}else{
					popUpWindow.alert('操作失败：网络原因',function(){});
				}
			}
		});		
	}*/

});

