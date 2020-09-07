const mongoose = require("mongoose");
mongoose
	.connect(`mongodb://localhost/t6_4`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function (e) {
		console.warn("成功 ");
	})
	.catch(function (err) {
		console.error(err);
	});

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

//创建集合实例
const course = new Course({
	name: "ytx",
	author: "测试测试做着做着做",
	isPublished: false,
});
// course.save()
//创建文档
// Course.create({
// 	name: "jjz",
// 	author: "ssssssbbbbbbb",
// 	isPublished: false,
// }).then(function (e){
// 	console.log("成功",e);

// }).catch(function (err){
// 	console.error(err);

// })

// Course.find().then(function (e){
// 	console.log(e);
// })

// Course.find({ name: { $in: [".cn"] } }).then(function (e) {
// 	console.log(e);
// });

// const T6 = mongoose.model("t6_4", new mongoose.Schema());
// T6.find()
// 	.select("asd")
// 	.sort({ asd: "desc" })
// 	.then(function (e) {
// 		console.log(e);
// 	});
// T6.find()
// 	.select("asd")
// 	.sort({ asd: "desc" })
// 	.skip(2)
// 	.limit(3)
// 	.then(function (e) {
// 		console.log(e);
// 	});
// T6.findById("5ed8e5736223000098006243").then(function (e) {
// 	console.log(e);
// });
// T6.find({ asd: { $gt: 0.3, $lt: 300 } }).then(function (e) {
// 	console.log(e);
// });
/**
 * .find({ asd: { $gt: 0.3, $lt: 300 } }) 大于小于
 * .find({ asd: { $in:[212,0.6366801736040147]} }) 包含
 * .select("asd") 查询指定列
 * .sort({"asd":"desc"}) 倒序排序 正序什么都不加
 * .sort("-asd")
 * .sort({"asd":-1})
 * .skip(2)  跳过2条数据
 * .limit(3) 查询3条数据
 */

// T6.find({ asd: {$gt: 0.3, $lt: 300 } }).then(function (e) {
// 	console.log(e);
// });

// T6.findOneAndDelete({'12':"杨腾翔"}).then(function (e){
// 	console.log(e);
// })

// T6.updateOne({ asd: 'jjz'}, { asd: 321 }).then(function (e) {
// 	console.log(e);
// });
setTimeout(() => {
	process.exit();
}, 800);

// const T6 = mongoose.model("t6_4", new mongoose.Schema({ asd: String }));
// T6.updateOne({ asd: "jjz" }, { asd: 321 }).then(function (e) {
// 	console.log(e);
// });

// T6.updateMany({ asd: "212" }, { asd: "1212" }).then(function (e) {
// 	console.log(e);
// });

//TODO:  字段限制

// const DB6_10 = mongoose.model(
// 	"DB6_10",
// 	new mongoose.Schema({
// 		name: {
// 			type: String,
// 			required: [true, "请输入姓名"],
// 			minlength: [2, "姓名不能少于两个字"],
// 			maxlength: [10, "姓名不能多于十个字"],
// 			trim: true, //自动去空格,
// 		},
// 		age: {
// 			type: Number,
// 			required: [true, "请输入姓名"],
// 			max: 100,
// 			min: 10,
// 		},
// 		createTime: {
// 			default: 0,
// 			type: Number,
// 			min: 0,
// 			max: Number.MAX_SAFE_INTEGER,
// 		},
// 		type: {
// 			default: "人",
// 			type: String,
// 			enum: ["人", "牲畜", "野牲畜", "死物"],
// 		},
// 		money: {
// 			type: Number,
// 			validate: {
// 				validator(v) {
// 					return v % 2 === 0;
// 				},
// 				message: "必须是双数",
// 			},
// 		},
// 	})
// );
// DB6_10.create({
// 	name: "张三",
// 	age: Math.floor(Math.random() * 91) + 10,
// 	createTime: Date.now(),
// 	type: "人1",
// 	money: 1,
// })
// 	.then(function (e) {
// 		console.log(e);
// 	})
// 	.catch(function (e) {
// 		console.log("=========================================   错误   =============================================");
// 		for (const i in e.errors) {
// 			console.log("错误消息: \t" + e.errors[i].message, "\n错误的类型: \t" + e.errors[i].path, "\n错误的值: \t" + e.errors[i].value + "\n================================================================================================");
// 		}
// 	});

//TODO:多表(集合)查询

const DB6_10_User = mongoose.model("DB6_10_User", new mongoose.Schema({
	name: {
		type: String,
		required:true
	}
}));

const DB6_10_Article = mongoose.model("DB6_10_Article", new mongoose.Schema({
	title: {
		type:String,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref:"DB6_10_User"
	}
}));

// DB6_10_User.create({name:"jjz"}).then(function (e){
// 	console.log(e);
// })
// DB6_10_Article.create({title:"jjz的文章",author:"5ee087d4cdb07d3308bd8ea4"}).then(function (e){
// 	console.log(e);
// })

DB6_10_Article.findOne().exec().then(function (e){
	console.log(e);
})
DB6_10_Article.findOne().populate("author").exec().then(function (e){
	console.log(e);
})

// DB6_10.save()
