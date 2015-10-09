//---------------------------------------------------------------------------
// Task: Html-SSI
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return function () {
        gulp.src(path.src.html)
            .pipe(plugins.plumber({errorHandler: onError}))

            //Compile
            .pipe(plugins.ssi())
            .pipe(gulp.dest(path.output.root))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));
    };
};