/**
 * 评论表情模块
 * @author lifayu@meifuzhi.com
 * @date 2012-07-06
 * @version $Id: emotion.js 1017 2012-08-07 07:34:34Z lifayu $  
 */
define("#emotion/0.1.0/emotion-debug", ["#jquery/0.1.0/jquery-debug", "#mfz/0.1.0/mfz-debug"], function(require,exports,module){
    
    var $ = require('#jquery/0.1.0/jquery-debug'),
        mfz = require('#mfz/0.1.0/mfz-debug');
    mfz.ui = mfz.ui || {};
    
    require.async("css/emotion.css");
    var smiley = [
        {title:"微笑",src:"m_01.png"},
        {title:"偷笑",src:"m_02.png"},
        {title:"得意",src:"m_03.png"},
        {title:"害羞",src:"m_04.png"},
        {title:"呲笑",src:"m_05.png"},
        {title:"赞",src:"m_06.png"},
        {title:"yeah",src:"m_07.png"},
        {title:"发怒",src:"m_08.png"},
        {title:"咒骂",src:"m_09.png"},
        {title:"哼",src:"m_10.png"},
        {title:"差",src:"m_11.png"},
        {title:"尴尬",src:"m_12.png"},
        {title:"冷汗",src:"m_13.png"},
        {title:"囧",src:"m_14.png"},
        {title:"无语",src:"m_15.png"},
        {title:"衰",src:"m_16.png"},
        {title:"流泪",src:"m_17.png"},
        {title:"难过",src:"m_18.png"},
        {title:"可爱",src:"m_19.png"},
        {title:"色",src:"m_20.png"},
        {title:"调皮",src:"m_21.png"},
        {title:"亲亲",src:"m_22.png"},
        {title:"惊讶",src:"m_23.png"},
        {title:"惊恐",src:"m_24.png"},
        {title:"闭嘴",src:"m_25.png"},
        {title:"疑问",src:"m_26.png"},
        {title:"嘘",src:"m_27.png"},
        {title:"晕",src:"m_28.png"},
        {title:"白眼",src:"m_29.png"},
        {title:"睡",src:"m_30.png"},
        {title:"酷",src:"m_31.png"},
        {title:"发呆",src:"m_32.png"}
    ];
    var imageFolder = "http://image.iwanmei.com/smiley/";
    mfz.ui.Emotion = mfz.View.createClass(new Function,{
        isinit:false,
        uiType:"emotion",
        imageFolder:imageFolder,
        dftImg:"http://image.iwanmei.com/smiley/0.gif",
        isShow:false,
        smiley:smiley,
        init:function(){
            var me = this;
			if(me.textarea.length){
				me.textarea = me.textarea[0];
			}
            me.bindEvents();
        },
        tplPanelString:'<div class="#{clsWrap}"><div class="#{arrowOuter}"></div><div class="#{arrowInner}"></div><div class="#{clscnt}">#{content}</div><div class="#{clsPreview}"></div></div>',
        //显示panel
        showEmotion:function(){
            var me = this;
            if(me.isinit){
                me.panel.show();
            }else{
                me.isinit = true;
                var htm =[];
                var colNum = 11;
                var rowNum = me.smiley.length/colNum;
                var offsetH = 24;
                htm.push('<table cellpadding="1" cellspacing="0" align="center" width="100%">');
                for(var i=0; i<rowNum;i++){
                    htm.push("<tr>");
                    for(var j=0; j<colNum; j++){
                        var face = me.smiley[i*colNum+j];
                        var offset = (i*colNum+j) * (-1) * offsetH;
                        if(face){
	                        htm.push('<td title="'+face.title+'" onclick="'+me.getCallString("render",me.imageFolder+face.src,face.title)+'" onmouseover="'+me.getCallString("_over",i*colNum+j) + '" onmouseout="'+me.getCallRef()+'._out(this)" style="cursor:pointer;">');
	                        htm.push('<span style="display:block;"><img style="background-position:left ' + offset + 'px;" alt="'+face.title+'" src="'+me.dftImg+'" height="24" width="24"/></span>');
	                        htm.push('</td>');
                        }else{
	                        htm.push('<td></td>');
                        }
                    }
                    htm.push("</tr>");
                }
                htm.push("</table>");
                //$("body").append(htm.join(""));
                me.panel = $(mfz.format(me.tplPanelString,{
                    clsWrap:me.getClass("wrap"),
                    arrowOuter:me.getClass("arrow-o"),
                    arrowInner:me.getClass("arrow-i"),
                    clscnt:me.getClass("cnt"),
					clsPreview:me.getClass("preview"),
                    content:htm.join("")
                }));
                $("body").append(me.panel);
                me.panel.bind("click.emotion",function(event){
                    event.stopPropagation();
                });
				me.preview = mfz.q(me.getClass("preview"),me.panel);
            }
            var offset = me.el.offset();
            me.panel.css({
                left:offset.left + (me.el.outerWidth()/2 - 16),
                top:offset.top + me.el.outerHeight() - 6
            });
	        me.isShow = true;
        },
        //隐藏panel
        hideEmotion : function(){
            this.panel.hide();
            this.isShow = false;
        },
        bindEvents:function(){
            var me = this;
            me.el.click(function(event){
                event.stopPropagation();
                me.isShow ? me.hideEmotion() : me.showEmotion();
            });
            $("html").bind("click.emotion",function(){
                me.panel && me.hideEmotion();
            });
        },
        _over:function(idx,self,evemt){
            var me = this;
            var td = $(self);
            td.addClass(me.getClass("hover"));
			var face = me.smiley[idx];
			var tpl = '<div class="#{clsPreviewImg}"><img src="#{src}"/></div><div class="#{clsPreviewName}">#{title}</div>';
			me.preview.html(mfz.format(tpl,{
				title:face.title,
				src:me.imageFolder + face.src,
				clsPreviewName:me.getClass("preview-name"),
				clsPreviewImg:me.getClass("preview-img")
			}));
			if(idx%11 > 5){
				me.preview.css({
					left:3,
					right:"auto"
				});
			}else{
				me.preview.css({
					left:"auto",
					right:3
				});
			}
			me.preview.show();
        },
        _out:function(obj,event){
            var me = this;
            var td = $(obj);
            td.removeClass(me.getClass("hover"));
			me.preview.hide();
        },
        //将文本插入输入框
        insertText:function(text){
            var me = this;
            me.textarea.focus();
            if(me.textarea.document && me.textarea.document.selection){
                me.textarea.document.selection.createRange().text = text;
            }else if("selectionStart" in me.textarea){
                var str = me.textarea.value,start=me.textarea.selectionStart;
                me.textarea.value = str.substr(0,start) + text + str.substring(me.textarea.selectionEnd,str.length);
                me.textarea.selectionStart = start + text.length;
                me.textarea.selectionEnd = start + text.length;
            }
        },
        //将字符串转换为图片标签
        convert:function(str){
            var me = this;
            for(var i=0; i<me.smiley.length; i++){
                var item = me.smiley[i];
                str = str.replace(new RegExp("\\["+item.title+"\\]","g")," <img src='"+me.imageFolder + item.src+"'/> ");
            }
            return str;
        },
        render:function(src,title){
            var me = this;
            me.insertText("["+title+"]");
            me.hideEmotion();
            me.fire("onrender");
        }
    });
    mfz.ui.Emotion.convert = function(str){
        var map = {};
        for(var i=0; i<smiley.length; i++){
            var item = smiley[i];
            map[item.title] = item.src;
        }
        str = String(str).replace(/\[([^\[\]]+)\]/g,function(a,b,i,c){
            //"<img src='"+imageFolder + item.src+"'/>"
            if(typeof map[b] != "undefined"){
	            return " <img src='" + imageFolder + map[b] + "' title='" +b+ "' style='vertical-align:bottom;'/> ";
            }else{
                return a;
            }
        });
        return str;
    };
    return  mfz;
});
