const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/t6_11`, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (e) {
	console.warn("成功 ");
});

const user = mongoose.model(
	"User",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			maxlength: 10,
			minlength: 2,
		},
		age: {
			type: Number,
			min: 0,
			max: 100,
		},
		password: {
			type: String,
			maxlength: 20,
			minlength: 6,
		},
		email: {
			type: String,
		},
		interest: [String],
	})
);
//调用之后返回promise
//创建用户
async function createUser(name, pwd, age, email, interest) {
	var res = await t(user.create({ name: name, age: age, password: pwd, email: email, interest: interest }));
	return res;
}
//获取所有用户
async function getAllUser() {
	var res = await t(user.find());
	return res;
}
//删除用户
async function deleteUser(id) {
	var res = await t(user.deleteOne({ _id: id }));
	return res;
}
//删除用户
async function updateUser(id,obj) {
	var res = await t(user.updateOne({ _id: id },obj));
	return res;
}
/**
 * 公用方法 接收一个promise 对数据进行包装并返回
 * @param {Promise} promise
 */
async function t(promise) {
	var res = await promise
		.then(function (e) {
			return { status: "succeed", e: e };
		})
		.catch(function (e) {
			var arr = [];
			for (const i in e.errors) {
				arr.push({ msg: e.errors[i].message, type: e.errors[i].path, value: e.errors[i].value });
			}
			return { status: "error", info: arr, e: e };
		});
	return res;
}
// deleteUser()
// 	.then(function (e) {
// 		console.log(e);
// 	})
// 	.catch(function (e) {
// 		console.log(e);
// 	});
// console.log("\n\n\n\n\n");
// createUser().then(function (e){
// 	console.log(e);
// }).catch(function (e){
// 	console.warn(e);
// })

exports.createUser = createUser;
exports.getAllUser = getAllUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;

