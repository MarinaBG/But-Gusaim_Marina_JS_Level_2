let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let cssmin = require('gulp-cssmin');
let gulpif = require('gulp-if');
let clean = require('gulp-clean');
let htmlReplace = require('gulp-html-replace');
let browserSync = require('browser-sync');
let imagemin = require('gulp-imagemin');
let gutil = require('gulp-util');

let prod = 1;
let buildPath = prod ? 'build/prod/' : 'build/dev/';
let fileName = prod ? 'main.min' : 'main';
let src = {
    html: 'app/*.html',
    js: ['app/js/jquery.js', 'app/js/jquery-ui.js', 'app/js/jquery.carousel.js', 'app/js/*.js'],
    css: 'app/css/*.css',
    img: 'app/img/*.jpg',
    json: 'app/json/*.json',
}

gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(concat(`${fileName}.js`))
        .pipe(gulpif(prod, uglify()))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest(buildPath))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css', function() {
    return gulp.src(src.css)
        .pipe(concat(`${fileName}.css`))
        .pipe(gulpif(prod, cssmin()))
        .pipe(gulp.dest(buildPath))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src(src.html)
        .pipe(htmlReplace({
            'css': `${fileName}.css`,
            'js': `${fileName}.js`
        }))
        .pipe(gulp.dest(buildPath))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function(){
    return gulp.src(src.img)
    .pipe(gulpif(prod, imagemin()))
    .pipe(gulp.dest(`${buildPath}/img`))
});

gulp.task('json', function(){
    return gulp.src(src.json)
    .pipe(gulp.dest(`${buildPath}/json`))
});

gulp.task('clean', function() {
    return gulp.src(buildPath, {read: false})
        .pipe(clean());
});

gulp.task('build', ['js', 'css', 'html', 'img', 'json']);

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})

gulp.task('watch', ['browserSync', 'css', 'js', 'html'], function(){
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/js/*.js', ['js']);
    gulp.watch('app/js/*.html', ['html']);
});