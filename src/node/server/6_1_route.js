const fs = require("fs");
const mime = require("mime");
var route = {
	"/": function (req, resp, url, data, callback) {
		if (methodsControl(req, "all", {}, callback)) {
			callback(200, "ok", null, "这里是首页");
		}
	},
	"/post": function (req, resp, url, data, callback) {
		if (methodsControl(req, "all", {}, callback)) {
			callback(200, "ok", null, "post请求成功");
		}
	},
	"/get": function (req, resp, url, data, callback) {
		if (methodsControl(req, "all", {}, callback)) {
			let s = "请求成功";
			if (url.query && Object.keys(url.query).length) {
				let t = "";
				for (var i in url.query) {
					t += `<tr><td>${i}</td><td>${url.query[i]}</td><tr>`;
				}
				s += `<h2>您请求的数据</h2><table width="200px" border="1">${t} </table>
				<style>
					td{
						text-align: center;
						padding: 10px;
					}
				</style>
				`;
			} else {
				s += "<h2>未传递参数</h2>";
			}

			callback(200, "ok", null, s);
		}
	},
	"/test": function (req, resp, url, data, callback) {
		if (methodsControl(req, "all", {}, callback)) {
			callback(200, "ok ok", null, "test请求成功");
		}
	}
};
/**
 * @description 方法控制
 * @author 杨腾翔
 * @date 2020-06-01
 */
function methodsControl(req, methods, options, callback) {
	if (Object.prototype.toString.call(callback) !== "[object Function]") {
		throw "--------------------route-callback not Function";
	}
	if (req.method === methods.toLocaleUpperCase() || methods === "all") {
		return true;
	} else {
		callback(options.code || 405, options.msg || "not hold methods", null, `请使用${methods}请求,访问此接口`);
	}
}

/**
 * @description 获取文件列表,在访问对应的静态资源时返回
 * @author 杨腾翔
 * @date 2020-06-02
 */
function init() {
	var srcRoot = __dirname.replace(/\\src.*/, "\\src");
	//遍历每一个文件夹 添加到路由
	function fn(path, root) {
		// console.log(`fn执行 -- path:${path}  -- root: ${root}`);
		fs.readdir(path, { withFileTypes: true }, function (err, dir) {
			dir.forEach(function (item) {
				//排除node
				if (item.name !== "node") {
					//判断文件夹
					if (item.isDirectory()) {
						fn(path + "\\" + item.name, root + item.name + "/");
					} else {
						add(root + item.name, path + "\\" + item.name);
					}
				}
			});
		});
	}
	fn(srcRoot, "/");

	function add(name, path) {
		//注册函数
		route[name] = function (req, resp, url, data, callback) {
			if (!callback) {
				return;
			}
			if (req.method === "GET") {
				if (/\.(png|jpg|gif|jpeg|webp)$/.test(name)) {
					fs.readFile(path, "binary", function (err, data) {
						if (err) {
							return console.error(err);
						}
						// readImg:function(path,res){
						// 	fs.readFile(path,'binary',function(err,filedata)  { //异步执行  'binary' 二进制流的文件
						// 		if  (err)  {
						// 			console.log(err);
						// 			return;
						// 		}else{
						// 	res.write(filedata,'binary');
						// 	res.end();
						// 		}
						// 	});
						// },

						// response.writeHead(200, { "Content-Type": "image/jpeg" });
						// if (request.url !== "/favicon.ico") {
						// 	//清除第2此访问

						// 	optfile.readImg("./imgs/pig.png", response);
						// }

						// console.log(data);
						// const buffer = new Buffer(data, "binary");
						// console.log(buffer.toString("base64"));

						resp.write(data, "binary");

						// callback(200, "ok", { "Content-Type": "image/jpeg" }, undefined);
						// var type = "image/x-icon";
						callback(
							200,
							"ok",
							{
								//charset=utf-8  mime.getType(name)
								"Content-type": mime.getType(name) + ";",
								"Cache-Control": "no-store"
							},
							undefined
						);
						console.log( mime.getType(name));
					});
				} else {
					// 异步读取
					fs.readFile(path, function (err, data) {
						if (err) {
							return console.error(err);
						}
						callback(
							200,
							"ok",
							{
								//image/x-icon
								"Content-type": mime.getType(name) + ";charset=utf-8",
								"Cache-Control": "no-store"
							},
							data.toString()
						);
					});
				}
			} else {
				if (callback) {
					callback(404, "not hold methods", null, "静态文件不支持除了GET的所有请求");
				}
			}
		};
	}
}

init();
//TODO: 需要加上header



//FIXME:11111
exports.default = route;

//不一定非要是函数 也可以是一个对象
/*
{
	path
	fn
	methods

}

*/
/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function a(a,b){
	return a+b
}
