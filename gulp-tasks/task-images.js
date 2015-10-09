//---------------------------------------------------------------------------
// Task: Images
//---------------------------------------------------------------------------

module.exports = function (gulp, plugins, path, onError) {
    return function () {
        gulp.src(path.src.assets.img)
            .pipe(plugins.plumber({errorHandler: onError}))

            //Compress
            .pipe(plugins.newer(path.output.assets.img))
            .pipe(plugins.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [plugins.pngquant()]
            }))
            .pipe(gulp.dest(path.output.assets.img))

            //BrowserSync
            .pipe(plugins.browserSync.reload({stream: true}));
    };
};