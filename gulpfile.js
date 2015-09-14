//---------------------------------------------------------------------------
//	Plugins
//---------------------------------------------------------------------------

var gulp 		 = require("gulp"),
	sass 		 = require("gulp-sass"),
	concat 		 = require("gulp-concat"), //Concatena todos os arquivos em um só
	watch 		 = require("gulp-watch"),
	plumber 	 = require("gulp-plumber"), //Show Error on Console
	minify_css   = require("gulp-minify-css"), //Minifica códigos Css
	uglify 		 = require("gulp-uglify"),	//Minifica códigos Js
	sourcemaps	 = require("gulp-sourcemaps"),
	notify	 	 = require("gulp-notify"), //Dispara uma notifiação no S.O.
	imagemin	 = require("gulp-imagemin"),
	jshint	 	 = require("gulp-jshint"), //Analisa erros de codificação JavaScript
	prefix 		 = require("gulp-autoprefixer"), //Adapta o código CSS para browsers antigos
	ssi	 		 = require("gulp-html-ssi"),
	pngquant	 = require("imagemin-pngquant"),
	browserSync	 = require("browser-sync");

//---------------------------------------------------------------------------
// Settings
//---------------------------------------------------------------------------

var src = {
	sass: "src/sass/**/*.scss",
	js: "src/js/**/*.js",
	img: "src/img/*",
	html: "src/**/*.html"
};

var output = {
	js: "output/js",
	css: "output/css",
	img: "output/img",
	html: "output/**/*.html",
	ssi: "output",
	min_css: "app.min.css",
	min_js: "app.min.js",
};

//---------------------------------------------------------------------------
// Error Handler
//---------------------------------------------------------------------------

var onError = function (err) {
	console.log(err);
	this.emit('end');
}

//---------------------------------------------------------------------------
// Task: Sass
//---------------------------------------------------------------------------

// SASS to CSS
gulp.task('sass', function(){
	return gulp.src(src.sass)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(prefix('last 2 versions'))
		.pipe(concat(output.min_css))
		.pipe(gulp.dest(output.css))
		.pipe(minify_css())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output.css))
		.pipe(browserSync.reload({stream: true}));
});

//---------------------------------------------------------------------------
// Task: Compile JS
//---------------------------------------------------------------------------

gulp.task('js', function() {
  	return gulp.src(src.js)
  		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
  		.pipe(uglify())
  		.pipe(concat(output.min_js))
  		.pipe(sourcemaps.init())
  		.pipe(sourcemaps.write())
  		.pipe(gulp.dest(output.js))
  		.pipe(browserSync.reload({stream: true}));
});

//---------------------------------------------------------------------------
// Task: Images
//---------------------------------------------------------------------------

gulp.task('img', function() {
	return gulp.src(src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(output.img));
});

//---------------------------------------------------------------------------
// Task: Html-SSI
//---------------------------------------------------------------------------

	gulp.task('ssi', function() {
		gulp.src(src.html)
        	.pipe(ssi())
        	.pipe(gulp.dest(output.ssi))
        	.pipe(browserSync.reload({stream: true}));
	});

//---------------------------------------------------------------------------
// Task: Watch
//---------------------------------------------------------------------------

gulp.task('watch', function() {
	browserSync.init({
		server: './output'
	});
	gulp.watch(src.js, ['js']);
	gulp.watch(src.sass, ['sass']);
	gulp.watch(src.img, ['img']);
	gulp.watch(src.html, ['ssi']);
	gulp.watch(output.html).on('chang', browserSync.reload);
});

//---------------------------------------------------------------------------
// Task: Default
//---------------------------------------------------------------------------

gulp.task('default', ['watch', 'sass', 'js', 'img', 'ssi']);

//---------------------------------------------------------------------------
// End
//---------------------------------------------------------------------------