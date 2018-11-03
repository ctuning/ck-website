var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var render = require('gulp-nunjucks-render');
var babel = require('gulp-babel');
var es = require('event-stream');

var dest = '';
var src = ''

// gulp.on('stop', function () {
//   process.nextTick(function () {
//     process.exit(0);
//   });
// });

gulp.task('connect', function(){
    connect.server({
      root: './'+dest,
      livereload: true
    });
  });

gulp.task('sass', function () {
    return gulp.src(src+'scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(dest+'css/'))
            .pipe(livereload(connect));
});

gulp.task('html-nunjucks', function() {
    return gulp.src(src+'*.html')
        .pipe(render({
            path: [src+'templates']
        }))
        .pipe(gulp.dest(dest))
        .pipe(livereload(connect))
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(src+'scss/**/*.scss', ['sass']);
    gulp.watch(src+'*.html', ['html-nunjucks']);
    gulp.watch(src+'templates/*.html', ['html-nunjucks']);
    // livereload(connect);
});

gulp.task('ck-repo-widget', function () {
    return es.merge(
        gulp.src('src/ck-repo-widget/widget.js')
            .pipe(babel({ presets: ["env"], plugins: ["transform-object-rest-spread"] }))
            .pipe(gulp.dest('public/ck-repo-widget/')),
        gulp.src('src/ck-repo-widget/widget.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('public/ck-repo-widget/'))
    );
});

gulp.task('concat', function () {
    return gulp.src([
        src+'bower_components/jquery/dist/jquery.min.js',
        src+'bootstrap/dist/js/bootstrap.bundle.min.js',
        src+'js/jquery.easing.min.js',
        src+'bower_components/pushy/js/pushy.min.js',
        src+'bower_components/waypoints/lib/jquery.waypoints.min.js',
        src+'bower_components/wow/dist/wow.min.js',
        // src+'js/jquery.countTo.js',
        src+'js/jquery.preloader.min.js',
        src+'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
        src+'bower_components/theia-sticky-sidebar/dist/ResizeSensor.min.js',
        src+'bower_components/theia-sticky-sidebar/dist/theia-sticky-sidebar.min.js',
        src+'bower_components/owl.carousel/dist/owl.carousel.min.js',
        src+'bower_components/textillate/assets/jquery.lettering.js',
        src+'bower_components/textillate/assets/jquery.fittext.js',
        src+'bower_components/textillate/jquery.textillate.js',
        src+'bower_components/jarallax/dist/jarallax.min.js',
        src+'bower_components/jarallax/dist/jarallax-video.min.js',
        src+'bower_components/masonry/dist/masonry.pkgd.min.js',
        src+'js/imagesloaded.pkgd.min.js',
        src+'js/jquery.countdown.min.js',
        src+'bower_components/jquery-knob/dist/jquery.knob.min.js',
        src+'js/smooth-scroll.min.js',
        src+'js/smooth-scroll.polyfills.min.js',
        src+'js/jquery.particleground.js',
        src+'js/typed.min.js',
        src+'js/jquery.sticky.js',
        src+'js/assan.custom.js'

    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(dest+'js/plugins/'));
});

gulp.task('concatCss', function () {
    return gulp.src([
        src+'bower_components/fontawesome/css/fontawesome.min.css',
        src+'bower_components/fontawesome/css/brands.min.css',
        src+'bower_components/fontawesome/css/regular.min.css',
        src+'bower_components/fontawesome/css/solid.min.css',
        src+'bower_components/themify-icons/css/themify-icons.css',
        src+'css/animate.css',
        // src+'bower_components/pushy/css/pushy.css',
        // src+'bower_components/magnific-popup/dist/magnific-popup.css',
        src+'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
        src+'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
        src+'et-line-font/style.css',
        src+'bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concatCss("plugins/plugins.css"))
    .pipe(gulp.dest(dest+'css/'));
});

gulp.task('build', ['concat', 'sass', 'html-nunjucks']);
gulp.task('dev', ['connect', 'concat', 'watch', 'sass', 'html-nunjucks']);


gulp.task('ck', function() {
    dest = 'public/';
    src = 'src/';
    gulp.start('build', ['ck-repo-widget']);
});

gulp.task('dev-ck', function() {
    dest = 'public/';
    src = 'src/';
    gulp.start('dev', ['ck-repo-widget']);
});

gulp.task('default', function() {
    console.log('\x1b[33m%s\x1b[0m', '\n Select build target:\n\n', 'gulp ck','               – website + widget cKnowledge.org\n');
})