# CSS UNCUT

## WTF is this?

First, it's an experiment.
Second - it is an answer to a question I started asking myself after
I started auditing the css of many top websites and finding that there are quite a few that serve up
more than 500kb of css. Which seems bad. But how bad is it though?

## The Question

> "How big is the entire css language? Is it bigger or smaller than 500kb?"

So this is an attempt to put the entire css language in one file.
For the most part it's a bunch of single purpose classes name spaced to three different breakpoints.

Plus a few other things like a clearfix solution for good measure.

## The Answer

So how big is it?

* *480K* - i.css        (uncompresed)
* *390K* - i.min.css    (minified)
*  *47K* - i.min.css.gz (minified & gzipped)

This gives in an interesting baseline to compare against a sites css I think.
It should be noted that gzip loves single purpose classes as it places many
common words next to each other. If you randomize the order of class declaration in i.css,
it minifies and gzips down to *54kb*

## So what entails 'everything'?

Some things would be almost impossible to represent in totality. Like gradient combinations.
But most things are pretty easy.

### Dimensions

For each of the dimension properties i.e
```
width, max-width, min-width, height, max-height, min-height
```
There are classes for:
* A ten point rem scale based off powers of two
* Each percentage value (0-100%);
* Each keyword option i.e max-content, min-content, fit-content, fill-available.

### Colors

Skin classes for each of the 140 color names defined in the css/html spec.

## What needs work

Naming conventions. There are some nice grockable consistent patterns, but some of them aren't that
well thought out to be honest. Particularly things like flexbox, animation, and transitions.

Selector count. I wouldn't advise dropping this into your next project in totality.
There are more than 4096 selectors and that means certain versions of ie won't parse
the whole style sheet. If you want to drop the selector count though you can use something like un-css
to clean up any unused classes.

Documentation.

## Reference
http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome

# License

The MIT License (MIT)

Copyright (c) 2014 @mrmrs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

