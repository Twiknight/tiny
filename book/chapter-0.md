# Chapter 0: Preparation

## 0.0 Summary
This chapter is mainly about preparation needed before starting to write code.
It is prepared for those who has little idea about how to use npm and gulp to initialize a project.
For those who are familiar with Node, just skip the chapter.

## 0.1 Initialize your project
To initialize a Node project, we need a folder to hold all the files.
Of course you can manually create a folder and add the `pacakge.json` file.
But I recommend you to use the `npm init` command.

First, just open your console (windows cmd or OSX terminal or something similar) and type:
```
mkdir tiny
cd tiny
```
to create a folder called "tiny" and change your working directory to it.


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
All the configurations you set will be written in a file called `package.json` whose content will be echoed on your screen.
You can also check the file itself.


## 0.2 Add dependencies
Yes, yes, we need help from some 3rd-part libraries.
Don't be disappointed, it is never a shame to use other's libraries.
Modern software developing is a combination of efforts from developers across the world.

In our tiny project, these libraries will be included:
- __babel__: A library that helps translating your ES6 code into ES5. Maybe after a few years, babel will be obsoleted, but at this moment(Oct, 2015), it is nearly impossible to run ES6 projects without the help of babel.
- __gulp__: A building tool for Node projects. Building tools are in thousands, but I prefer gulp for it doesn't introduce those annoying temp files. Gulp itself is a very interesting tool to study, but that's not our issue.
- __mocha__: Maybe this library will not be used in the first one or two chapter. But as the project itself grows, mocha will be introduced as the test framework. Tests are very important, we'll talk about it later.
- __benchmark__: benchmark is a high resolution JavaScript benchmarking library. We'll need it when performance came to the issue.

Now open the console and cd to our working directory, just type:
```
npm i --save-dev gulp
npm i --save-dev gulp-babel
npm i --save-dev gulp-changed
```
the `i` means `install` in npm; `--save-dev`means the package will only be installed for the current project.

The lib gulp-changed is optional. I included it just prevent the babel compiler from compiling unchanged files.

After npm finished the installing, you can check the file `package.json`.
The dependencies are automatically written.
```
"devDependencies": {
  "gulp": "^3.9.0",
  "gulp-babel": "^5.3.0",
  "gulp-changed": "^1.3.0"
}
```

## 0.3 Initialize git
Version control is necessary if you want to track code of different chapters in our project.
With tiny, we use [git](git-site) or [GitHub](github-site).
Don't be afraid, we won't touch the advanced features.

This [brief tutorial](git-tutorial) is enough git beginners.

Before initializing git, we create a new file called `.gitignore`.
>__Note__ that the file name is `.gitignore`, don't forget the dot.

If you use windows, it is not allow to create a file starts with '.'.
In this case, You can create a file named with anything, and rename it in cmd:
```
rename your-file-name.txt .gitignore
```
Then it's time to determine what to ignore.
Open this file and write:
```
node_modules
```
Save it. The file `.gitignore` will tell git to ignore certain files when track your version.
Here we'll ignore folder `node_modules` which holds our dependencies.
After that, you can type:
```
git init
```
in your console (or use git or GitHub GUI).
A folder named with `.git` will be created.
Just forget it. We won't apply any changes manually to this folder as it is under the management of git.

## 0.4 Configure gulp
As I mentioned earlier, we will write our project in ES6 and compile it into ES5 with babel.
Without the help of building tools, it is really annoying labor.
So we introduced gulp.

To use gulp, we need a `gulpfile.js` file to set up gulp tasks.
Here, we'll create this file and open it.

__First__, add this to the 1st line:
```
'use strict'
```
This line tells node to use 'strict' mode to run the code.
Without it, keywords like `const` and `let` are not allowed.

__Second__, import Add-Ons we need.
```
const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
```
`gulp` is the gulp engine itself;

`gulp-babel` is the babel compiler for gulp;

`gulp-changed` will check the changed files thus we can ignore unchanged files when compiling.

__Third__, create a task:
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
`SRC` is our origin source folder while `DEST` refers to compile destination.

The function means:
>Select the changed files in folder `SRC`, compile it with babel and output the compiled files to `DEST`.


Save this file and we now can type
```
gulp
```
in console to compile your code in folder `src`.

If you prefer compiling each time you save a file,
gulp offers `watch` function to watch on file changes.
You can find more about gulp from its [official site](gulp-site) and DIY your own gulp file.


[babel-site]:http://babeljs.io/
[git-site]:http://www.git-scm.com/
[gulp-site]:http://gulpjs.com/
[git-tutorial]:http://rogerdudler.github.io/git-guide/
