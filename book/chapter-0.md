# Chapter 0: Preparation

### 0.0 Summary
This chapter is mainly about the work we need to get done before coding.
It is prepared for those who has little idea about how to use npm and gulp to initialize a project.
For those who are familiar with it, just skip the chapter and read the next.

### 0.1 Initialize your project
To initialize a Node project, you can manually create a repo and add the `pacakge.json` file.
But I recommend you to use the `npm init` command.

On windows, you can type in your cmd :
```
mkdir tiny
cd tiny
```
to create a folder called tiny and cd to the directory.
That will be your project folder.
Linux or Mac has similar command.  

After that, we'll get help from npm to establish our project:
```
npm init
```
Then in your console, npm will display you a series of configurations to set up the basic info of your project:
```
name: (tiny) tiny
tiny
version: (1.0.0)
description: A DIY web-server framework.
entry point: (index.js)
test command:
git repository: your-git-repo-url
keywords: web-server
author: your-name
license: (ISC) MIT
```
All the configurations you set will be written in a file called `package.json, and npm will echo the content on your screen. You can also turn to the file itself to check it.


### 0.2 Add dependencies
Yes, yes, we need some libraries developed by other developers to help us finishing our framework.
It is never a shame to use someone else's libraries.
In my opinion, everyone should learn to make use of the large amount of libraries the Internet offers.
In our tiny project, we'll mainly use these libraries:
- <b>babel.js</b>: A library that helps translating your ES6 code into ES5. Maybe after a few years, this will be unnecessary, but at this moment(Oct, 2015), it is hard to write ES6 projects without the help of babel.
- <b>gulp.js</b>: A library that helps managing your project. Project managers are in thousands, but I prefer gulp for it doesn't produce mountains of annoying temp files. Gulp handles file with stream, it is a very interesting procedure, but I won't talk here.
- <b>mocha</b>: Maybe this library will not be used in the first one or two chapter. But as the project itself grows, mocha will be introduced as the test framework. Tests are very important to modern software, we'll talk about it later.

Now open your console and cd to your project directory, just type:
```
npm i --save-dev gulp
npm i --save-dev gulp-babel
npm i --save-dev gulp-changed
```
the `i` means `install` in npm; `--save-dev`means the package will only be installed for the current project.

The lib gulp-changed is optional. I included it just to make the babel compiler work faster.

After npm finished the installing, you can check the file `package.json`.
The dependencies are automatically written.
```
"devDependencies": {
  "gulp": "^3.9.0",
  "gulp-babel": "^5.3.0",
  "gulp-changed": "^1.3.0"
}
```

### 0.3 Initialize git
Most modern projects use version control tools to help keep the project under control.
Version control is important. It not only provides a view of the project history but also allow multiple developers work on the same project.
With tiny, we use [git](http://www.git.org) or [github](http://www.github.com).
Don't be afraid, we won't use the high-level options.
This [brief tutorial](http://www.todo.xxx) is enough for you if you have never used git.
Now create a new file called `.gitignore`.
<b>Note</b> that the file name is `.gitignore`, don't forget the `.`.
If you use windows, it is not allow to create a file with start with '.'. You can create a file named with anything, and rename it in cmd:
```
rename your-file-name.txt .gitignore
```
Open this file and write:
```
node_modules
```
Save it. As its filename says, `.gitignore` will tell git to ignore certain files when track your version. In our project, we'll ignore files in `node_modules`, which are all dependencies and usually won't change.
Now just type:
```
git init
```
in your console.
A folder named with `.git` will be created.
You can just forget it. We won't apply any changes manually to this folder as it is under the management of git.

### 0.4 Config gulp
As I noticed earlier, we will write our project in ES6 and compile it into ES5 with babel.
With the help of building tools, it is really annoying labor.
So we introduced gulp.

To use gulp, we need a `gulpfile.js` to tell gulp what to do.
Here, we'll write the first line of code.

First, add this to the 1st line:
```
'use strict'
```
This line tells node to use 'strict' mode to run the code. Without 'strict' mode, `const` and `let` are not allowed.

Second, import Add-Ons we need.
```
const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
```
`gulp` is the gulp engine itself;
`gulp-babel` is the babel compiler for gulp;
`gulp-changed` will check the changed files thus we can ignore unchanged files when compiling.

Third, create a task:
```
const SRC = 'src/**/*.js';
const DEST = 'lib';

gulp.task('default', function(){
    return gulp.src(SRC)
            .pipe(changed(DEST))
            .pipe(babel())
            .pipe(gulp.dest(DEST));
});
```
SRC is our origin source folder while DEST means compile destination.
All the files compiled will be in the folder 'lib'.
The function means:
select the changed files in folder SRC, compile it with babel and output the compiled files to DEST.


Save this file and we now can type
```
gulp
```
in console to compile your code in folder 'src'.

If you prefer compiling each time you save a file,
gulp offers `watch` function to watch on file changes.
You can find more about gulp [here](http://www.gulp.org) and DIY your own gulp file.
