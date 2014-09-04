

var path = require("path");
var fs = require("fs");
var fsExt = require("/home/lifayu/node/utils/fs_ext.js");

var configFile = "./package.json";

try{
	//读取配置文件
	var configCode = fs.readFileSync(configFile,"utf8") + "";
	var configObj = JSON.parse(configCode);
	//构造目标路径
	var filepath = path.resolve(configObj.deploy.path, configObj.name, configObj.version);
	console.log("Deploy PATH:" + filepath);
	var spath = path.join(path.dirname("."),"/dist");
	//fsExt.rmdirRF(filepath);
	fsExt.mkdirS(filepath);
	fsExt.copydirSync(spath,filepath,function(filename){
		return !/-debug\.js$/.test(filename);
	});
	console.log("Deploy SUCESS!");
}catch(e){
	console.log(e);
}
