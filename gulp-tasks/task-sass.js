//---------------------------------------------------------------------------
// Task: Sass
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return function () {
        gulp.src(path.src.assets.sass)
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.sass())

            //css
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.concat(path.file.css))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(path.output.assets.css))

            //min.css
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.concat(path.file.css_min))
            .pipe(plugins.minify())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(path.output.assets.css))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));
    };
};