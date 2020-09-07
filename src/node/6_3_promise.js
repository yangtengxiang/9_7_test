
/*
  promise
  将返回数据改为返回对象 
  对象.then来处理返回的数据
	new Promise 两个参数 resolve 成功   reject失败
	只能调用其中一个


*/
function prom () {
	return new Promise(function (resolve, reject) {
		setInterval(() => {
			resolve({ a: 1 });
		}, 2000);
		
		
	});
}

async function p () {
	var t=await prom()
	return t.a
}

p().then(function (e){
	console.log(e);
	
})

prom().then(e => {
	console.log(e);
	process.exit()
})
