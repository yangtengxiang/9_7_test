var route = {
	"/": function (req, resp) {
		return {
			str: "这是是首页"
		};
	},
	"/post": function (req, resp, url, data) {
		var is = methodsControl(req, resp, "get");
		if (is) {
			return is;
		}
		return {
			str: "post请求成功",
			code: 200,
			msg: "ok"
		};
	},
	"/get": function (req, resp, url, data) {
		return methodsControl(req, resp, "get") || (function (){
			s = "请求成功";
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
	
			return {
				str: s,
				code: 200,
				msg: "ok"
			};
		})()
		
	},
	"/test": function (req, resp, url, data) {
		var is = methodsControl(req, resp, "all");
		if (is) {
			return is;
		}
		return {
			str: "test请求成功",
			code: 200,
			msg: "ok ok"
		};
	}
};
/**
 * @description 方法控制
 * @author 杨腾翔
 * @date 2020-06-01
 */
function methodsControl(req, resp, methods) {
	if (req.method === methods.toLocaleUpperCase() || methods === "all") {
		return false;
	} else {
		return {
			str: "请使用GET请求,访问此接口",
			code: 405,
			msg: "not hold methods"
		};
	}
}

exports.default = route;

//不一定非要是函数 也可以是一个对象
/*
{
	path
	fn
	methods

}

*/
