const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task("sass", function () {
    return gulp.src("public/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("public/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("browserSync", function (cb) {
    return browserSync.init({
        proxy: "http://localhost/",
        files: ["public/**/*.*", "views/**/*.*"],
        open: false,
        port: 81
    }, cb);
});

gulp.task("watch", gulp.series("sass", function (cb) {
    gulp.watch("public/scss/**/*.scss", gulp.series("sass"));
    cb();
}));

gulp.task("default", gulp.series("nodemon", "browserSync", "watch"));