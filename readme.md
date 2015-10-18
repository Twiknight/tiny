# Tiny : DIY web-server framework with Node.
## Why I'm launching this serial?
Last year, I head about Node and soon got fascinated with its events driven and non-blocking I/O model. Interested in how it works when playing a role as web server, I got to know its famous web-server framework [Express](expressjs).

However, to understand how Express works is not easy for a beginner of Node.
Though Express succeeds in commercial world, the code is far from friendly to readers as it has been built since the early versions of Node.
Twisted inherits, nested callbacks and sometimes magic codes, all these keep it from a learning material for those who want take a glimpse on how Node works on net.

Early this year, I managed to re-write it in CoffeeScript.
That was [ExpressCoffee](expresscoffee).
But even after that, I still can't understand how some certain lines work and how Express managed to organize its modules as a whole to support my site.

Then in September, after ECMAScript 2015 was passed, I turned to babel for a support of new ES standard.
It was just at that moment, an idea of translate Express to new ES code came up to me.
That turned out to be [Express2015]( express2015).
Had you spared some time to read it, you'd find it just another ExpressCoffee.
No much help to understand how Node amazingly works on web.

Express2015 is written mostly in ES2015:
+ it uses classes instead of prototypes;
+ it turned all the `var`s into `const` and `let`;
+ it transferred some of the nested callbacks into `Promise`;
+ it replaced a few unreadable lines;

However its hard to touch the most twisted parts without refactoring the interfaces.
Once I try to change the interfaces, I'll be faced with a problem:
* Is it still Express if I modified its interfaces and made it hard compatible with the older version?

I realized I need a new framework, a framework works comfortably with the new standard of ES 2015 and without all the burdens from Express.

That's why I started [tiny]( tiny).

And I at the same time I started this serial to help those who hold the same interest in Node and web-server as me.

## What's this serial about?
As I mentioned on the last section. This is a tutorial helps the newcomers to understand how Node works as web server.

However this one is different. What distinguishes it from the numerous traditional tutorials is that it works with a project of building a web server framework from the very beginning.

Yes, a web-server-framework just like Express, Not a web-server or website.

So this serial will mainly focus on Node and Net, but I'll also introduce how a project is started, designed, coded and tested with Node.
As the chapter goes, tiny will support more and more features. So it is also a glimpse on how incremental developing works.

## A tree view of the project repo
Tiny contains both code and book.
Below is a introduction to all the parts of it.
+ __src__: src is where the original code lies. Code here is written in ES 2015 following the new standard.
+ __lib__: lib contains the code compiled by [Babel](babel). Usually you won't read it (as it lacks readablity).
+ __demo__: demo contains a demo built with tiny. Demo will vary on different branches to fit the current version of tiny.
+ __tests__: tests contains test cases. They wipe out predictable bugs and keep the consistency of your API.
+ __book__: book is where the tutorials lie.
+ __other files__:
    - __gulpfile.js__: we use gulp to help compiling our code. More about [Gulp](gulp).
    - __.gitignore__: a file to tell git to ignore some files. In our project, it prevents you from committing files in the node_modules directory. More about [git](git).
    - __license__: MIT license.

### License
[MIT](license).


### Author
[Twiknight](my-page)

mail: [twiknight@163.com](mail)



[expressjs]: https://github.com/strongloop/express
[expresscoffee]: https://github.com/Twiknight/ExpressCoffee
[express2015]: https://github.com/Twiknight/express2015
[tiny]:https://github.com/Twiknight/tiny
[babel]: http://babeljs.io/
[gulp]: http://gulpjs.com/
[git]:http://www.git-scm.com/
[my-page]:  https://github.com/Twiknight/
[mail]: mailto:twiknight@163.com
