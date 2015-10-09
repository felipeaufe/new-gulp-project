//---------------------------------------------------------------------------
//  Plugins
//---------------------------------------------------------------------------

var gulp                = require("gulp");
var plugins             = require('gulp-load-plugins')();

plugins.sass            = require("gulp-sass"),
plugins.concat          = require("gulp-concat"),
plugins.plumber         = require("gulp-plumber"),
plugins.minify          = require("gulp-minify-css"),
plugins.uglify          = require("gulp-uglify"),
plugins.autoprefixer    = require("gulp-autoprefixer"),
plugins.sourcemaps      = require("gulp-sourcemaps"),
plugins.notify          = require("gulp-notify"),
plugins.jshint          = require("gulp-jshint"),
plugins.ssi             = require("gulp-html-ssi"),
plugins.imagemin        = require("gulp-imagemin"),
plugins.newer           = require("gulp-newer"),
plugins.pngquant        = require("imagemin-pngquant"),
plugins.browserSync     = require("browser-sync"),
plugins.include         = require("gulp-include")


//---------------------------------------------------------------------------
// Settings
//---------------------------------------------------------------------------

var path = {
    output: {
        root                : "./output",
        assets: {
            root            : "./output/assets",
            js              : "./output/assets/js",
            css             : "./output/assets/css",
            img             : "./output/assets/img",
            font            : "./output/assets/font",
            plugins: {
                root        : "./output/assets/plugins",
                jquery      : "./output/assets/plugins/jquery",
                bootstrap: {
                    css     : "./output/assets/plugins/bootstrap/css",
                    js      : "./output/assets/plugins/bootstrap/js"
                }
            }
        }
    },
    src: {
        root                : "./src",
        html                : "./src/**/*.html",
        assets: {
            root            : "./src/assets",
            js              : "./src/assets/js/**/*.js",
            sass            : "./src/assets/sass/**/*.scss",
            img             : "./src/assets/img/**/*",
            font            : "./src/assets/font/**/*"
        }
    },
    plugins: {
        jquery              : "./node_modules/jquery/dist/jquery.min.js",
        bootstrap: {
            all            : "./src/assets/plugins/bootstrap/*",
            sass            : "./src/assets/plugins/bootstrap/bootstrap.scss",
            js              : "./src/assets/plugins/bootstrap/bootstrap.js"
        }
    },
    file: {
        css                 : "app.css",
        css_min             : "app.min.css",
        js                  : "app.js",
        js_min              : "app.min.js",
        bootstrap:{
            css             : "bootstrap.css",
            css_min         : "bootstrap.min.css",
            js              : "bootstrap.js",
            js_min          : "bootstrap.min.js"
        }
    }
};

//---------------------------------------------------------------------------
// Error Handler
//---------------------------------------------------------------------------

var onError = function (err) {
    console.log(err);
    this.emit('end');
}

//---------------------------------------------------------------------------
// Import Task File Js
//---------------------------------------------------------------------------

gulp.task('sass'        , require('./gulp-tasks/task-sass')         (gulp, plugins, path, onError));
gulp.task('js'          , require('./gulp-tasks/task-js')           (gulp, plugins, path, onError));
gulp.task('img'         , require('./gulp-tasks/task-images')       (gulp, plugins, path, onError));
gulp.task('ssi'         , require('./gulp-tasks/task-html-ssi')     (gulp, plugins, path, onError));
gulp.task('jquery'      , require('./gulp-tasks/task-jquery')       (gulp, plugins, path, onError));
gulp.task('bootstrap'   , require('./gulp-tasks/task-bootstrap')    (gulp, plugins, path, onError));

//---------------------------------------------------------------------------
// Task: Watch
//---------------------------------------------------------------------------

gulp.task('watch', function() {
    plugins.browserSync.init({
        server: path.output.root
    });
    gulp.watch(path.src.assets.sass             , ['sass']);
    gulp.watch(path.src.assets.js               , ['js']);
    gulp.watch(path.src.assets.img              , ['img']);
    gulp.watch(path.src.html                    , ['ssi']);
    gulp.watch(path.plugins.bootstrap.all       , ['bootstrap']);

    gulp.watch(path.output.html).on('chang', plugins.browserSync.reload);
});

//---------------------------------------------------------------------------
// Task: Default
//---------------------------------------------------------------------------

gulp.task('default', ['sass','js','img','ssi', 'jquery', 'bootstrap', 'watch']);

//---------------------------------------------------------------------------
// End
//---------------------------------------------------------------------------