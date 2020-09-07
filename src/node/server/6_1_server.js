function createServer() {
	const http = require("http");
	const route = require("./6_1_route").default;
	const url = require("url");

	const fs = require("fs");
	const path = require("path");
	// const mime = require("mime");
	const server = http.createServer(function (req, resp) {
		// 30 深灰 31  红 32 绿  33 黄  34 深蓝  35 紫  36蓝
		console.log("\n\n服务器被请求", "\x1B[36m" + req.method + " - " + req.url + "\x1B[0m" + "============================================================");
		//匹配到对应路由,交给路由 路由返回响应码等信息 再又服务器进行最后一步
		var u = url.parse(req.url, true);
		//判断请求方法 get直接交给路由 post收集数据完成后交个路由  options 直接返回200
		if (req.method === "GET") {
			relay();
		} else if (req.method === "OPTIONS") {
			resp.writeHead(200, "OK", {
				"Access-Control-Allow-Origin": "*", //*代表地址随意
				"Access-Control-Allow-Headers": "X-Requested-With,Content-Type", //可以使用这两个请求头
				"Access-Control-Allow-Methods": "*", //任意方法  可改为POST
				"Access-Control-Allow-Credentials": true,
				"Cache-Control": "no-store" //禁用缓存
			});
			resp.end();
		} else if (req.method === "POST") {
			var data = "";
			req.on("data", function (value) {
				//对于post数据的收集和处理
				data += value;
			});
			req.on("end", function () {
				// 30 深灰 31  红 32 绿  33 黄  34 深蓝  35 紫  36蓝
				console.log("\x1B[36m%s\x1B[0m", "post数据:" + data);
				relay(data);
			});
		}
		//转发到对应路由
		function relay(data) {
			if (Object.prototype.toString.call(route[u.pathname]) === "[object Function]") {
				console.log("正常返回");
				route[u.pathname](req, resp, u, data, function (code, msg, header, str) {
					resp.writeHead(
						code || 200,
						msg || "ok",
						header || {
							"Content-type": "text/html;charset=utf-8",
							"Cache-Control": "no-store"
						}
					);
					resp.end(str);
				});
			} else {
				console.log("返回404");
				resp.statusCode = 404;
				resp.setHeader("Content-type", "text/html;charset=utf-8");
				resp.end("<h1>404--not found</h1>");
			}
		}
	});
	server.listen(10086, "127.0.0.1");
	// 30 深灰 31  红 32 绿  33 黄  34 深蓝  35 紫  36蓝
	console.log("\x1B[31m%s\x1B[0m","\n\n\nroute "+Object.keys(route).join("\t"));
}
createServer();
console.log(`http:\\\\127.0.0.1:10086`);

