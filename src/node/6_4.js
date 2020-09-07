const fs = require("fs");
const promisify = require("util").promisify;

const t = promisify(function (str, func) {
	// return new Promise(function (resolve, reject) {
	// 	setTimeout(() => {
	// 		resolve(str);
	// 	}, 200);
	// });

	setTimeout(() => {
		func(str);
		// resolve(str);
	}, 2000);

	return "promisify--fn"
});
t("ssss",function (e){
	console.log("ssss:"+e);
}).then(function (e) {
	console.log("asdafasf");
	console.log(e);
});

console.log(t);
console.log(t(1,function (e){
	console.log("21--"+e);
}));

// async function fn() {
// 	let t1 = await t(1);
// 	let t2 = await t(2);
// 	let t3 = await t(3);
// 	console.log(t1, t2, t3);
// }

// fn();
