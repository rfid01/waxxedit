//javascript code
//author aming
//email:254930120@qq.com
//source: https://www.52aixuexi.com
//Date 2020/10/05 13:23

var waxxedit = {};
waxxedit.name = "waxxedit";
waxxedit.description = "my first javascript editor";
waxxedit.version = "1.0.1";
waxxedit.author = "aming";

waxxedit.editor = {
	contentObj:null,
	toolbarObj:null,
	conTextObj:null,
	textareaObj:null,
	ulObj:null,
	configs:{
		editor_id:"waxxedit_id",
		position:'relative',
		width:"100%",
		height:"500px",
		border:"0px solid #000000",
		backgroundColor:"#f5f5f5",		
		toolbarClassName:'toolbar',
		textareaClassName:'textarea',
		shadeDvId:'shadeDv',				//遮罩 ID
		codeFrameId:"codeFrame",			//弹窗 DIV ID
		codeCloseSpanId:"codeCloseSpan", 	//弹窗关闭按钮 ID
		codeButtonId:"codeButton",			//弹窗Input button ID
		codeContentId:"codeContent",		//弹窗内容 ID
		ulClassName:"ulist",				
		textareaId:'editId',
		toolbarW:'99%',
		toolbarH:'50px',
		toobarBorder:"2px solid #ccc",
		toobarBgColor:'#f5f5f5',
		conTextW:'99%',
		conTextH:'85%',
		conTextBorder:'1px solid #ccc',
		conTextBgCOlor:'#ffffff',
		textareaW:'99%',
		textareaH:'98%',
	},
	tbarMenu:{
		code:"code",
		//B:"B",
		//I:"I",
		//U:"U",
		//h1:"h1",
		//h2:"h2",
		//h3:"h3",
		//h4:"h4",		
		//upload:"upload"
	},
	configuration:function(editor_id,textareaId,width,height,color){
		wedit.configs.editor_id = editor_id || this.configs.editor_id;
		wedit.configs.textareaId = textareaId || this.configs.textareaId;		
		wedit.configs.width = width || this.configs.width;
		wedit.configs.height = height || this.configs.height;
		wedit.configs.border = this.configs.border;
		wedit.configs.backgroundColor = color || this.configs.backgroundColor;
	},
	//创建编辑器
	init:function(editor_id,textareaId,width,height,color){
		this.configuration(editor_id,textareaId,width,height,color);
		this.container();
		this.toolbar();
		this.content();	
		wedit.uMethods.winResize();
	},
	
	//画一个编辑器画布
	container:function(){
		wedit.contentObj = this.uMethods.getEleById(wedit.configs.editor_id);		
		wedit.contentObj.style.position = wedit.configs.position;
		wedit.contentObj.style.width = wedit.configs.width;
		wedit.contentObj.style.height = wedit.configs.height;
		wedit.contentObj.style.border = wedit.configs.border;
		wedit.contentObj.style.backgroundColor = wedit.configs.backgroundColor;
	},
	//编辑器菜单栏
	toolbar:function(){
		wedit.toolbarObj = this.uMethods.createEle("div");
		wedit.contentObj.appendChild(this.toolClass.setTooBgColor(wedit.toolbarObj,wedit.configs.toolbarW,wedit.configs.toolbarH,wedit.configs.toobarBorder,wedit.configs.toobarBgColor));
		//创建UL标签
		var ulObj = this.uMethods.createEle("ul","ul");
		ulObj.className = wedit.configs.ulClassName;
		//加载菜单栏按钮
		this.toolMethods.loadToolBarMenu(ulObj);
		wedit.toolbarObj.appendChild(ulObj);
		//菜单栏样式调整
		//加载菜单栏绑定事件
		wedit.toolMethods.createCodeFramework();
		wedit.toolMethods.getSelectContextChange();
	},
	//获取编辑器工具栏方法
	toolClass:{
		setTooBgColor:function(obj,w,h,b,Color){
			obj.style.width = w;
			obj.style.height = h;
			obj.style.border = b;
			obj.style.backgroundColor = Color;			
			return obj
		},
		setToolBarMenuStyle:function(ulObj){
			ulObj.style.cssText="list-style-type:none;margin:0px;padding:0px;";			
		},
		setCodeFrameworkStyle:function(obj){
			obj.style.cssText ="position:fixed;top:20%;left:30%;background:#fff;border:1px solid #ccc;border-radius:12px;width:650px;height:350px;z-Index:991;";
			obj.childNodes[0].style.cssText="height:35px;line-height:35px;font-size:14px;background:#f5f5f5;padding-left:15px;font-weight:bold;";
			obj.childNodes[0].innerHTML ="<span>插入代码块</span>";
			obj.childNodes[1].style.cssText ="position:absolute;right:10px;top:10px;border:1px solid #333;width:20px;height:20px;line-height:20px;text-align:center;font-size:16px;cursor:pointer;"		
			obj.childNodes[2].style.cssText="width:98%;height:240px;text-align:left;";
			obj.childNodes[3].style.cssText="width:98%;height:60px;line-height:60px;text-align:right;border:0px solid #999;";
			obj.childNodes[3].childNodes[0].value = "插入代码";
			obj.childNodes[3].childNodes[0].style.cssText ="width:120px;height:35px;line-height:35px;background:#4f5b93;color:#fff;border:0px;border-radius:12px;";
		}
	},
	toolMethods:{
		loadToolBarMenu:function(ulObj){
			wedit.toolClass.setToolBarMenuStyle(ulObj)	
			for(var i in wedit.tbarMenu){				
				let liObj = wedit.uMethods.createEle("li");
				liObj.innerText = i;
				liObj.setAttribute("id",i);
				liObj.style.cssText="display:inline-block;float:left;font-size:12px;width:45px;height:50px;line-height:50px;border:1px solid #ccc;text-align:center;cursor:pointer";
				ulObj.appendChild(liObj);				
			}
		},
		setTextareaStyle:function(obj){
			obj.style.width = wedit.configs.textareaW;
			obj.style.height = wedit.configs.textareaH;
			obj.style.wordWrap ="break-word";
			obj.style.padding ="10px";
			obj.style.overflow ="scroll";
		},
		createTbarButton:function(ele,type){
			return wedit.uMethods.createEle(ele,type)
		},
		insetIntoCode:function(id,tid,sid,dvid){
			var insertObj = wedit.uMethods.getEleById(id);
			insertObj.addEventListener("click",function(){
				wedit.textareaObj = wedit.uMethods.getEleById(wedit.configs.textareaId);
				wedit.textareaObj.innerHTML += "\r\n&lt;pre&gt;&lt;code&gt;"+ wedit.toolMethods.textareaStrChageCode(wedit.uMethods.getEleById(tid).value)+"&lt;/code&gt;&lt;/pre&gt;\r\n";
				//关闭插入代码块
				wedit.toolMethods.closeCodeDailog(sid,dvid);
				//关闭弹窗						
				wedit.uMethods.getEleById(dvid).remove();
				wedit.uMethods.getEleById(wedit.configs.shadeDvId).remove();				
			},false);
		},
		closeCodeDailog:function(sid,dvid){
			wedit.uMethods.getEleById(sid).addEventListener('click',function(e){
				wedit.uMethods.getEleById(dvid).remove();
				wedit.uMethods.getEleById(wedit.configs.shadeDvId).remove();
				
			},false);
		},
		//直接关闭弹窗,移除。
		closeDailog:function(){			
			wedit.uMethods.getEleById(wedit.configs.codeFrameId).remove();
			wedit.uMethods.getEleById(wedit.configs.shadeDvId).remove();
		},
		//创CODE代码框
		createCodeFramework:function(){
			wedit.uMethods.getEleById("code").onclick=function(){				
				//加载遮罩层
				wedit.uMethods.createShadeDv();
				//创建弹窗 title, content, button , DIV
				var dvObj = wedit.uMethods.createEle("div");
				wedit.uMethods.setElementAttr(dvObj,"id","codeFrame");				
				//var codeObj = wedit.uMethods.getEleById(wedit.configs.editor_id);
				document.body.appendChild(dvObj);				
				var dvObjTitle = wedit.uMethods.createEle("div");
				wedit.uMethods.setElementAttr(dvObjTitle,"class","codeTitle");
				dvObj.appendChild(dvObjTitle);
				
				var dvObjSpan = wedit.uMethods.createEle("span");
				dvObjSpan.innerText = "X";
				wedit.uMethods.setElementAttr(dvObjSpan,"id","codeCloseSpan");				
				dvObj.appendChild(dvObjSpan);
				
				var dvObjContent = wedit.uMethods.createEle("textarea");
				wedit.uMethods.setElementAttr(dvObjContent,"id","codeContent");
				dvObj.appendChild(dvObjContent);
				var dvObjFooter = wedit.uMethods.createEle("div");
				dvObjFooter.className = 'codeFooter';
				dvObj.appendChild(dvObjFooter);
				var dvObjInput= wedit.uMethods.createEle("input");
				dvObjInput.type="button";
				wedit.uMethods.setElementAttr(dvObjInput,"id","codeButton");
				dvObjFooter.appendChild(dvObjInput);
				wedit.toolClass.setCodeFrameworkStyle(dvObj);
				//加载关闭弹窗事件
				wedit.toolMethods.closeCodeDailog(wedit.configs.codeCloseSpanId,wedit.configs.codeFrameId);
				wedit.toolMethods.insetIntoCode("codeButton","codeContent","codeCloseSpan","codeFrame");
				wedit.uMethods.autoLoadWinWidth();
			};
		},
		//code 字符串处理；
		textareaStrChageCode:function(str){
			let st = str.replace(/</g,"&lt;");
			    st = st.replace(/>/g,"&gt;");
			return st;
		},
		getSelectContextChange:function(obj){
			for(var j in wedit.tbarMenu){
				this.getSelConChange(j);
			}
		},
		getSelConChange:function(j){
			wedit.uMethods.getEleById(j).addEventListener("click",function(){
				//wedit.uMethods.getEleById("")
			},false);
		},
	},
	
	//编辑器内容框
	content:function(){
		wedit.conTextObj = this.uMethods.createEle("div");
		wedit.contentObj.appendChild(this.toolClass.setTooBgColor(wedit.conTextObj,wedit.configs.conTextW,wedit.configs.conTextH,wedit.configs.conTextBorder,wedit.configs.conTextBgCOlor));
		//wedit.textareaObj = this.uMethods.createEle("textarea",'textarea');
		wedit.textareaObj = this.uMethods.createEle("div");
		wedit.textareaObj.setAttribute("id",wedit.configs.textareaId);
		wedit.textareaObj.setAttribute("name","content");
		wedit.textareaObj.setAttribute("contenteditable","true");
		this.toolMethods.setTextareaStyle(wedit.textareaObj);
		wedit.conTextObj.appendChild(wedit.textareaObj);
		wedit.contentMethods.textareaOnSelectEvent(wedit.configs.textareaId);		
	},
	//对编辑器内容的操作
	contentClass:{
		
	},
	contentMethods:{
		//触发内容选中的事件;
		textareaOnSelectEvent:function(tid){
			wedit.uMethods.getEleById(tid).addEventListener("select",function(e){
				e.originalTarget.value;
			},false);
		}
	},
	//常用的操作方法
	uMethods:{
		getEleById:function(id){			
			return document.getElementById(id);
		},
		getEleByTagName(tag){
			return document.getElementsByClassName(tag);
		},
		createEle:function(ele,type){
			var eLe = document.createElement(ele);
			if(type == 'div'){
				eLe.className = wedit.configs.toolbarClassName;
			}else if(type == 'textarea'){
				eLe.className = wedit.configs.textareaClassName;
			}else if(type == 'h1'){
				ele.className = wedit.tbarMenu.h1;
			}else if(type == 'h2'){
				ele.className = wedit.tbarMenu.h2;
			}else if(type == 'h3'){
				ele.className = wedit.tbarMenu.h3;
			}else if(type == 'h4'){
				ele.className = wedit.tbarMenu.h4;
			}else if(type == 'B'){
				ele.className = wedit.tbarMenu.B;
			}else if(type == 'I'){
				ele.className = wedit.tbarMenu.I;
			}else if(type == 'U'){
				ele.className = wedit.tbarMenu.U;
			}else if(type == 'ul'){
				ele.className = wedit.configs.ulClassName;
			}
			return eLe;
		},
		setElementAttr:function(obj,ele,val){
			obj.setAttribute(ele,val);
		},
		appendChild:function(sObj,dObj){
			dObj.appendChild(sObj);
		},
		createShadeDv:function(){
			var shadeDv = wedit.uMethods.createEle("div");
			this.setElementAttr(shadeDv,"id",wedit.configs.shadeDvId);
			document.body.appendChild(shadeDv);
			this.setShadeDvStyle(shadeDv)
		},
		setShadeDvStyle:function(obj){
			obj.style.margin =0;
			obj.style.padding = 0;
			obj.style.position = "fixed";
			obj.style.top = 0;
			obj.style.buttom = 0;
			obj.style.width = "100%";
			obj.style.height = "100%";
			obj.style.opacity ="0.2";
			obj.style.backgroundColor ="#333";
			obj.style.zIndex = 990;			
		},
		autoLoadWinWidth:function(){
			if(window.screen.width <=760){					
				var shadeDvObj = wedit.uMethods.getEleById(wedit.configs.codeFrameId);
				shadeDvObj.style.cssText="position:fixed;top:20%;left:2%;width:96%;height:350px;background:#ffffff;border:1px solid #ccc;border-radius:12px;z-Index:991;";
			}
		},
		winResize:function(){
			window.onresize=function(e){
				if(window.screen.width <=760){					
					var shadeDvObj = wedit.uMethods.getEleById(wedit.configs.codeFrameId);
					shadeDvObj.style.cssText="position:fixed;top:20%;left:2%;width:96%;height:350px;background:#ffffff;border:1px solid #ccc;border-radius:12px;z-Index:991;";
				}else{
					var shadeDvObj = wedit.uMethods.getEleById(wedit.configs.codeFrameId);
					shadeDvObj.style.cssText="position:fixed;top:20%;left:30%;background:#fff;border:1px solid #ccc;border-radius:12px;width:650px;height:350px;z-Index:991;";
				}			
			}
		}
	}
}
var wedit = waxxedit.editor;
