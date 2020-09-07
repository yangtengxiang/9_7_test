// function defaultTask(cb) {
// 	// place code for your default task here
// 	cb();
// }
// exports.default = defaultTask;

const gulp = require("gulp");

var fileinclude = require("gulp-file-include");
var htmlmin = require("gulp-htmlmin");

gulp.task("first", function (err) {
	console.log("gulp执行");
	gulp.src("./src").pipe(gulp.dest("dist/css"));
});

gulp.task("htmlmin", function (err) {
	console.log(111);
	gulp.src("src/*.html")
		.pipe(fileinclude())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"));
});

gulp.task("minify", () => {
	return gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"));
});

gulp.task("default", function () {
	console.log("hello world");
});
