let { src, dest, watch, series, parallel} = require('gulp');

let browserSync  = require('browser-sync').create();
let sass         = require('gulp-sass');
let concat       = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './app/'
    },
    notify: false,
    online: true
  });
};

function styles() {
  return src('./app/sass/**/*.scss')
  .pipe(sass())
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: [ 'last 10 versions' ] }))
  .pipe(dest('./app/css/'))
  .pipe(browserSync.stream());
}
function html() {
  return src('./app/index.html')
  .pipe(browserSync.stream())
}

function startWatch() {
  watch('./app/sass/**/*.scss', styles);
  watch('./app/index.html', html);
}


exports.browsersync = browsersync;
exports.styles      = styles;


exports.default     = parallel(styles, browsersync, startWatch);