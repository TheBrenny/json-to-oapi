const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const Browserify = require('browserify');
const source = require('vinyl-source-stream');
const httpServer = require('http-server');

gulp.task("server", async function (cb) {
    return Promise.resolve().then(() => {
        httpServer.createServer({
            root: "./public",
        }).listen(80, "localhost", () => console.log("Listening on http://localhost:80"));
    }).then(cb);
});

gulp.task("browserSync", function (cb) {
    return browserSync.init({
        proxy: "http://localhost/",
        files: ["public/**/*.*"],
        open: false,
        port: 81
    }, cb);
});

gulp.task("browserify", function () {
    let b = Browserify({
        entries: './index.js',
        debug: true
    });

    return b
        .require("./mock_browserify_fns.js", {
            expose: "fs"
        })
        .bundle()
        .pipe(source("index.js"))
        .pipe(gulp.dest("public"));
});

gulp.task("watch", function () {
    gulp.watch("./index.js", gulp.series("browserify"));
});

gulp.task("default", gulp.series("browserify", "server", "browserSync", "watch"));