//---------------------------------------------------------------------------
// Task: jQuery
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return gulp.copy = function () {

        gulp.src(path.plugins.jquery)
            .pipe(plugins.plumber({errorHandler: onError}))

            //Copy
            .pipe(gulp.dest(path.output.assets.plugins.jquery))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));
    };
};