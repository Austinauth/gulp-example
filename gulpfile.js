// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// This includes the gulp core and plugins associated with the 
// tasks that we will be performing. Next, we setup each of our 
// separate tasks. These tasks are lint, sass, scripts and default.

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Our lint task checks any JavaScript file in our 
// js/ directory and makes sure there are no errors in our code.

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// The sass task compiles any of our Sass files in our scss/ directory 
// into .css and saves the compiled .css file in our css/ directory.

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// The scripts task concatenates all JavaScript files in our 
// js/ directory and saves the ouput to our dist/ directory. 
// Then gulp takes that concatenated file, minifies it, renames it 
// and saves it to the dist/ directory alongside the concatenated file.

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// The watch task is used to run tasks as we make changes to our files. 
// As you write code and modify your files, the gulp.watch() method will 
// listen for changes and automatically run our tasks again so we don't have 
// to continuously jump back to our command-line and run the gulp command each time.

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

// The default task is basically a wrapper to our other tasks. 
// This will be the task that is ran upon entering gulp into the command line without 
// any additional parameters.