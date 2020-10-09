const {task, src, dest, series, parallel, watch} = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')

sass.compiler = require('node-sass')

task('styles', () => {
	return src('./src/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream())
})

task('server', () => {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	})
})

task('watch', () => {
	watch('./src/scss/*.scss', parallel('styles'))
	watch('./src/*.html').on('change', browserSync.reload)
})

task('default', parallel('watch', 'server', 'styles'))
