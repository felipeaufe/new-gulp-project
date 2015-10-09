//---------------------------------------------------------------------------
// Task: JS
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return function () {
        gulp.src(path.src.assets.js)
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))

            //js
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(path.file.js))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(path.output.assets.js))

            //min.js
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(path.file.js_min))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(path.output.assets.js))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));
    };
};