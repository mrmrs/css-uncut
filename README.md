# CSS UNCUT

## WTF is this?

1. An experiment.
2. The answer to a question I started to ask myself after I noticed my company serving
   up more than 1 megabyte of css.

## The Question

> "How big is the entire css language? Is it bigger or smaller than 500kb?"

So, what is css uncut? It is an attempt to put the entire css language in one file.
For the most part it's a bunch of single purpose classes name spaced to three different breakpoints.

Plus a few other things like a clearfix solution for good measure.

## The Answer

The file sizes:

```
 480K - i.css        (uncompresed)
 390K - i.min.css    (minified)
  47K - i.min.css.gz (minified & gzipped)
```

47kb minified and gzipped. This gives in an interesting baseline to compare 500kb+ css files to.
It should be noted that gzip loves single purpose classes as it's compression algorithm
works best when common words are close together.
If you randomize the order of class declaration in i.css,
it minifies and gzips down to *54kb* which turns out to be a delta of about 7kb.

## So what do you mean 'all' of css

Some things would be almost impossible to represent in totality. Like gradient combinations for instance.
But most things are pretty easy. Properties such as float, display, list-style-type, overflow etc.
have a fairly small set of values. This has all of those things. Four times.

Some things are a bit trickier though. How many different border-widths should be included? What about
border-colors? I tried to err on the side of being more verbose than I thought any feasible ui would need.
In this case I chose to include 140 different border colors for congruency with the provided skin classes.

#### Note documentation is work in progress

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

Documentation. Definitely needs more documentation.


## Reference

How much css do websites serve up to users?

```
ESPN          322kb
Kickstarter   844kb
Salesforce    1.02M
Macaw         593kb
Adobe         503kb
Apple Store   440kb
```

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

