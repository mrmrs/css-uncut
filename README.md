# SINK CSS

## WTF is this?

First, it's an experiment.
Second - it is an answer to a question I started asking myself after
I noticed some websites serving up more than a megabyte of css.

"How big is the entire css language? I mean the ENTIRE thing. Is it bigger or smaller than 1MB?"

So this is the entire css language - put into single purpose classes at multiple breakpoints (well, three to be exact.)
For properties that take integers as values instead of strings i.e margin and padding - I
create a 10 step scale (with a few exceptions.) A 10 step scale is generally more verbose than I need -
but figured it would be appropriate to be less concise for the purposes of this experiment.

I'm still adding things, but I'd say that I've got a pretty comprehensive covering of the language here at this point.
Below is the current file size:

* 163kb (minified)
* 17kb  (minified and gzipped)

## Why i.css?

Well, primarily because I'm lazy. 99% of the things I do only include one css file per page (gasp!)
so there generally isn't too much confusion about where the site styles are. I save keystrokes and
my users have to download fewer characters. I chose the letter i because.


# License

The MIT License (MIT)

Copyright (c) 2013 @mrmrs

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

