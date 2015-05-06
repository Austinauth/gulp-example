# Gulp Example
> Following: [Getting started with Gulp](https://travismaynard.com/writing/getting-started-with-gulp)

## Step by step

### Setting up the project
1) First we need to create our project directory then `cd` into the project directory.

2) Run an `npm init` command in the project directory to initialize our `package.json` file. 


### Installing Gulp
3) In the command line input the following command.

`npm install -g gulp` 

This installs gulp into our project.

4) Next, we also need to install gulp locally.

`npm install --save-dev gulp`

The only thing different here is we used the `--save-dev` flag which instructs `npm` to add the dependency to our devDependencies list in our package.json file that we created earlier.

### Setting Up Our Gulpfile & Running Gulp

Once gulp is installed we have to give it some instruction so it knows what tasks for perform for us. But, first, we need to figure out exactly what tasks we need to run in our project.

> **SCENARIO**
> 
> * Lint our JavaScript
> * Compile Sass files
> * Concatentate our Javascript
> * Minify and rename said concatenated files

#### Install required plugins

5) Next we need to install the required plugins.

`npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev` 

This will install all of the plugins we will need and add them to our devDependencies in our `package.json` file like we did when we installed gulp.

#### Create our gulp file

> Now that our plugins are available for us to use, we can start writing our gulpfile and instructing gulp to perform the tasks our boss assigned to us.

> Before we get right into the code I think it’s very important to mention that gulp only has 5 methods. These methods are as follows: task, run, watch, src, and dest. These are all you will need to write your tasks.

In the root directory of your project create a new file and name it gulpfile.js and paste the following code inside.

##### gulpfile.js
```
// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
```

6) Now, all we have left to do is run gulp. Switch back over to your command-line and type:

`gulp`

This will call gulp and run everything we have defined in our default task.

## Links
* [Gulp](http://gulpjs.com/)
* [Getting started with Gulp](https://travismaynard.com/writing/getting-started-with-gulp)
