# Tiny and How to build a web-server framework with Node.
### Why I'm launching this serial?
Last year, I first head about Node and soon got to know its famous web-server framework [Express](http://www.expressjs.com).
Knowing that Node is based on events and async I/O, I felt  interest in how it works when playing a role as web server.

However, to understand how Express process is not easy for a beginner of Node.
Though succeed in commerce, Express' code base is not reading-friendly as it was built in the early years when Node was just released.
Twisted inherits, nested callbacks and  even magic codes, all these make it an unfriendly framework for newcomers to study.

Early this year, I managed to re-write it in CoffeeScript.
That was [ExpressCoffee]( http://github.com/Twiknight/ExpressCoffee).
But even after that, I still can't understand how some certain lines works and how Express managed to organize its modules as a whole to support my site.

Then in September, after ECMAScript 2015 was passed, I turned to babel for a support of new ES standard.
It was just at that moment, an idea of translate Express to new standard codes.
That turned out to be [Express2015]( http://github.com/Twiknight/Express2015).
Had you spared some time to read it, you'd have already found that, it is just another ExpressCoffee.
No much help to understand how Node amazingly works on web.

Express2015 is written mostly in ES2015:
+ it uses classes instead of prototypes;
+ it turned all the `var` into `const` and `let`;
+ it transferred some of the nested callbacks into `Promise`;
+ it replaced some unreadable codes;

However its hard to touch the most twisted parts without refactoring the interfaces.
Once I determine to translate Express fully into ES 2015, I'll be faced with a problem:
* Is it still Express if I modified its interfaces and made it hard to work with the older version?

I realized I need a new framework, a framework works comfortably with the new standard of ES 2015 and without all the burdens from Express.

That's why I started [tiny]( https://github.com/Twiknight/tiny).
And why I started this serial as an introduction on how Node works as web server.
### What's this serial about?
As I mentioned on the last section. This is a tutorial helps the newcomers to understand how Node works as web server.

However this tutorial is different. What distinguishes it from the traditional tutorials is it works with a project of building a web server framework from the very beginning.

Yes, a web-server-framework just like Express, Not a web-server or website.

So this serial will focus on Node and Net, but we also introduce the whole procedure of how a project is started, designed, coded and tested.
As the chapter goes, tiny will grow from a small demo to a framework supporting complicate features. So it is also a glance on how incremental developing works.
### A glance for this project
Tiny is a project with code and book.
Below is a introduction to all the parts of it.
+ src: src is where the original code lies. Code here is written in ES 2015 following the new standard.
+ lib: lib contains the code compiled by [Babel](http://www.babeljs.org). Usually you won't read it.
+ demo: demo contains a demo built with tiny. Demo will vary on different branches to fit the current version of tiny.
+ tests: test cases to keep your code working well when you modify part of it.
+ book: where the tutorials lie.
+ other files:
    - gulpfile.js: we use gulp to help compiling our code. More about [Gulp](http://www.gulp.org).
    - .gitignore: a file to tell git to ignore some files. In our project, it prevents you from committing files in the node_modules directory.

### License
MIT.

It's hard to remember the twisted codes of all those licenses. So I just chose MIT. I won't copy what MIT says here, read it yourself.
### Author
[Twiknight]( https://github.com/Twiknight/)
