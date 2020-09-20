---
layout: post
title:  "Trying to Write Cover Letters with NLP"
date:   2020-09-06 16:21:07 +0100
categories: update
---

# Overview

I wanted to learn more about natural language processing because it's a fascinating topic that's recently made huge leaps by harnessing the recent progress in deep learning techniques. One of the coolest things you can do is train a network to generate text character by character, and the results are often remarkably [coherent](http://karpathy.github.io/2015/05/21/rnn-effectiveness/).

I find the best way to learn is by doing, and as I was just getting deep into the job application slog my idea was to get the network to generate cover letters for me. My thinking was that most cover letters are pretty generic with a lot of the same sweeping phrases used for all kinds of work and so it wouldn't be too hard to train a network to come up with something more or less comprehensible. You can read more about the details and why I was wrong below or you can skip straight to the [results]({% link cover.markdown %}).

The code for the data generation and training can be found in this [Github repository](https://github.com/tgrbrooks/DeepCover) and the web deployment code is part of the repository for this [website](https://github.com/tgrbrooks/tgrbrooks.github.io).

# Generating Training Data

The most important part of any machine learning algorithm is the data used for training. For generating text that sounds like a cover letter I would need a large number of examples in a format that a neural network can understand. It turns out that this is more difficult than it sounds. As far as I'm aware, there is no large repository of cover letters publically available. Searching the web, I was only ever able to find a couple of examples per result and there was no real consistency in how they could be obtained from the pages.

One way that did seem to give an almost endless supply of examples was running an image search, and so I tried to write a script to scrape the results and turn them into useable text. Google tries to make it difficult to scrape the results of its image search so you have to use their API. I ended up writing two scripts, one that used the Google API and one that can scrape directly from Bing.

Both work in pretty much the same way, return some images from a given search query, use [pytesseract](https://pypi.org/project/pytesseract/) to perform optical character recognition and get the text from the images, and try to identify the main body of text. The Google scraper gave higher quality images and hence better results from the text recognition but the API has daily limits which would quickly run out and the Bing scraper had no limits.

Even though the Google results were higher quality, there were still a lot of errors. As the old adage goes, "garbage in = garbage out", and any common errors that would occur in the text recognition would probably be reproduced by the network. To try to get around this, I also wrote a script to scrape job adverts as much of the same language is used and the original text is fairly simple to scrape from a job site. I then initally trained the network on the job adverts to give it a grasp of correct spellings of words and then retrained it on the cover letter examples to try to change the perspective of the text.

# The Network

I used TensorFlow to build and train the network, mostly following the text generation example that can be found [here](https://www.tensorflow.org/tutorials/text/text_generation). Characters, words and sentences are not well suited to most deep learning frameworks. Most text classification tasks use words as their base unit and use embedding vectors to represent them. Words become vectors in n-dimensional space and the components of the vector are trained so that similar words cluster together.

For the initial text generation model, I used characters as the base unit so the network wouldn't be restricted by the dictionary of words in the training set. This makes the model smaller but it's also got to do more work because it's starting from a point where it knows nothing about how to construct a word, let alone forming sentences and using correct grammar.

As the input data is fairly poor quality with a fair number of incorrect spellings the output of the character model was pretty bad. I then trained a word based model to try to remove some of the errors and, while the results were a little better, the model quickly begins talking nonsense.

# Getting it on the Web

It's always nice to have some sort of interface to view the output of the model rather than just printing text to the terminal. I was vaguely aware that there was a JavaScript implementation of TensorFlow and thought it would be nice to deploy to my website. It's relatively straightforward to port it over without a great deal of expertise in JS. The model can be converted using the [tensoflowjs converter](https://www.tensorflow.org/js/tutorials/conversion/import_keras) and then most of the syntax is very similar to Python.

One issue that popped up is that the inference of a letters worth of text is a time consuming process, especially when it's being done in a browser. This resulted in the page freezing for a long period of time before dumping the entire document to the screen. To skirt around this problem I used a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to effectively "thread" the inference. This stops the page freezing and can be configured to send back words one at a time once they've been generated so the user doesn't get bored waiting.

# Why it's Terrible

I work on a pretty old Mid 2012 Macbook Pro, so I don't exactly have a lot of compute power or easy access to a GPU. This severely limits the size of the model I can train and the length of the training. As this is a pretty silly personal project I'm not going to go out and rent GPU time so there's not much I can do on the model size front.

As I mentioned before, a lot of the training data is pretty poor quality. I've done a little playing around with cleaning up the data post optical character recognition without much success. There are many more things I could do to improve the data quality but, if I'm honest, I quite like it the way it is. The output is at a stage where it's more or less legible as a cover letter and pretty funny, if the model got too good you'd just end up reading random cover letter after random cover letter, and noone wants that.
