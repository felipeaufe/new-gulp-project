//---------------------------------------------------------------------------
// Task: Bootstrap
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return function () {

        //---------------------------------------------------------------------------
        // Task: Bootstrap - SASS
        //---------------------------------------------------------------------------

        gulp.src(path.plugins.bootstrap.sass)
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.sass())

            //bootstrap.css
            .pipe(plugins.autoprefixer())
            .pipe(plugins.concat(path.file.bootstrap.css))
            .pipe(gulp.dest(path.output.assets.plugins.bootstrap.css))

            //bootstrap.min.css
            .pipe(plugins.autoprefixer())
            .pipe(plugins.concat(path.file.bootstrap.css_min))
            .pipe(plugins.minify())
            .pipe(gulp.dest(path.output.assets.plugins.bootstrap.css))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));

        //---------------------------------------------------------------------------
        // Task: Bootstrap - JS
        //---------------------------------------------------------------------------

        gulp.src(path.plugins.bootstrap.js)
            .pipe(plugins.plumber({errorHandler: onError}))

            //bootstrap.js
            .pipe(plugins.include())
            .pipe(plugins.concat(path.file.bootstrap.js))
            .pipe(gulp.dest(path.output.assets.plugins.bootstrap.js))

            //bootstrap.min.js
            .pipe(plugins.include())
            .pipe(plugins.concat(path.file.bootstrap.js_min))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(path.output.assets.plugins.bootstrap.js))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));

    };
};