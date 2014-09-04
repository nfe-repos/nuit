mfz.ui.Emotion

@require jquery,mfz

@author lifayu

@description

表情图片存放于： http://image.iwanmei.com/smiley

参数说明：
{String}imageFolder：图片存放路径，可以指定
{jQuery}el：表情显示的触发目标元素
{jQuery,Dom}textarea：表情显示区域

方法说明：
showEmotion:显示表情
hideEmotion:隐藏表情
convert：将字符串转换为图片标签
render:表情插入方式，默认为插入中括号形式的表情
insertText:插入内容，内部方法

事件说明：
onrender:

用法：

var emotion = new mfz.ui.Emotion({
	el:$("#el"),
	textarea:$("#textarea")
});
