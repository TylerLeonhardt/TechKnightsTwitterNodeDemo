---
title: Creating a basic Twitter Bot in Node.js
slug: workshops/nodejs-twitterbot
template: workshop
author: Tyler Leonhardt
---


In this workshop, we will be making a Twitter bot written in Javascript using Node.js. What are these words I am saying??

#### Twitter bot???
A Twitter bot is a typically an application that you write that listens for something to happen on twitter and than does something in response. In our case, we'll be listening for someone to tweet with a certain hashtag and then tweet something when that happens.

#### Javascript???
Javascript is an awesome programming language. That's not my opinion. That's a fact. Why? Because of "Atwood's Law": any application that can be written in JavaScript, will eventually be written in JavaScript. People are writing complex front-end frameworks like Angular.js and React.js, to complete [operating](https://node-os.com/) [systems](http://os.js.org/) in Javascript. Not only is the web powered by Javascript, but it's used to make mobile apps, desktop apps, EVERYTHING. Learn Javascript and you'll go far.

#### Node.js???
Node.js isn't actually a language. What it is, is a "runtime environment" that allows javascript code to be run on pretty much every platform (Windows, OS X, Linux, etc). This means that now we can use Javascript to write a webserver, native applications, or a Twitter bot ;)

## Prerequisites
1. You need Node.js
2. You need a Twitter Account
3. Ease with or at least knowledge of using the command-line tools for your operating system (it's okay, we'll walk you throgh this if you're not)

### Node.js Installation
#### Windows
  1. Visit https://nodejs.org/en/ and choose the v5.5.0 stable button
  2. Install it with the default options
  3. Open a new command prompt
  4. Type node and press enter
  5. A new prompt should appear. Type console.log("hello") and press enter.
  6. Observe that hello is printed. Press CTRL-C a few times to close the Node interpreter

#### OSX
  * If you have brew, use `brew install nodejs`. Otherwise, visit https://nodejs.org/en/ and download the v5.5.0 stable version.

#### Linux
  * Depends on your distro, Google to figure out how to install the latest version of Node. Some systems (specifically Debian) may have very old versions of Node in their default package repositories, so make sure the latest version is installed and not something ancient like 0.7.

### Creating a Twitter App
You will need a registered Twitter account. Although I included it as a requirement at the top of this page, this is the part where you will need it. _Before you can continue, make sure you have a Twitter account!_

If you have *not* added your phone number to your Twitter account, [add one here before continuing](https://twitter.com/settings/add_phone).

#### Naming your App
After logging into your account on its website, proceed to https://apps.twitter.com. This is where you will register your app, get your API information, and control how your application works.

![apps.twitter.com](https://videlais.files.wordpress.com/2014/12/twitter_newapp.png)

Click on the “Create New App” button to start the process of creating a new app and registering it with Twitter.

![create an application](https://videlais.files.wordpress.com/2014/12/twitter_createapp.png)

For each required field, “Name”, “Description” and “Website”, make sure you fill out the information. You can fill these out with dummy values now and change them later:
* Name: "TwitterbotDemo" (for example)
* Description: "A simple bot" (for example)
* Website: "https://google.com" (for example)

Note, too, that the “Name” will be how this application is known to other services. While you can using something simple like "TwitterbotDemo" for this example, it might be worthwhile to find a name you like and is not already in use for more advanced projects.

![](https://videlais.files.wordpress.com/2014/12/twitter_agree.png)

Before you can finalize creating a Twitter application, you must agree to the Developer Agreement.


Take the time right now to read through it and become aware of how Twitter expects an application to act and what rights you have as a developer through this agreement. If you want to, of course.


Once done, click on “Create your Twitter application”.

![](https://videlais.files.wordpress.com/2014/12/twitter_appscreen.png?w=620)

With your application now created, you can change the default permissions from “Read-only” (the application can only read your tweets) to “Read and Write” (the application can read and write tweets).

#### Changing Permissions
To do that, click on the “Permissions” tab.

![](https://videlais.files.wordpress.com/2014/12/twitter_permissions.png?w=620)


From the choices, select “Read and Write” and then click on the “Update Settings” button.

Now that the permissions have been changed and your application will be allowed write tweets in the future.

Now we need to find the API key information and create an access token. This means that we will be grabbing and creating some unique tokens that will be used to identify our app. Think of this as the "username and passwords of applications". Since they are basically passwords... Don't share them with anyone!

Let's proceed. Click on the “Keys and Access Tokens” tab.

![](https://videlais.files.wordpress.com/2014/12/twitter_customerscret.png?w=620)

There are 4 tokens we will need:
1. API Key
2. API Secret
3. Access Token
4. Access Token Secret

The first two, Twitter generates for us. However, it doesn't automatically create an Access Token for your application. To do that, scroll down the page to find that section.

![](https://videlais.files.wordpress.com/2014/12/twitter_accesstoken.png?w=620)

To generate an Access Token at your current permission levels (“Read and Write”) for your application, click on the “Create my access token” button.

![](https://videlais.files.wordpress.com/2014/12/twitter_accesstokengranted1.png)

Once generated, you should now have a Consumer Key, Consumer Secret, Access Token, and Access Token Secret. All four will be needed to use the basic Twitter bot successfully!

TIME TO ACTUALLY CODE SOMETHING!

## Hello World!
The javascript hello world is actually only 1 line of code but let's go ahead and get set up.

### Setup

1. Open up a terminal or command prompt.
2. mentally think of where you want your project folder to go (for example, on the Desktop)
3. In the terminal, type: `cd ` and then navigate to the directory of your choice. (i.e. `cd Desktop`)
4. make a folder in that directory by doing `mkdir twitterbot`
5. now go in to that folder by doing: `cd twitterbot/`

NOTE: Don't close the terminal! We'll need it later!

### Our app.js

Now it's time to actually make our javascript file and write our Hello World!

1. Open up your favorite text editor. Some really great ones are Atom, Sublime Text and Vim. You might also have Notepad++ that's a good one too!
2. Create a new file called `app.js` and save it in our `twitterbot` folder we made previously.
3. In our app.js, write the following line: `console.log("Hello World!");`. This is similar to `System.out.println` in Java and `printf` in C. That's all the code we need to write for now!
4. Save the file and go back to the terminal we had open.
5. In order to run our javascript file, type `node app.js` in the terminal and hit enter! You should see "Hello World!" printed out after. You just used Node.js!

I won't go too deep in to javascript's syntax. But it resembles C in some ways so I'm sure you'll pick it up. If you have any trouble, just ask or Google it!

## npm - Node Package Manager

`npm`which stands for "Node Package Manager" is something that is installed by default with Node.js. It allows you to install packages that you can use in your Node.js code so you don't have to reinvent the wheel everytime! It's awesome.

For this workshop, we're going to install the `twitter` package which we will use to interact with Twitter's API. Twitter's API allows us to interact with Twitter via code. In our case, we'll use javascript!

In order to install it, type `npm install twitter` in the terminal while still in the `twitterbot` folder.

Wait a minute and if you look inside the folder, you'll see a folder called `node_modules`. This houses all the packages you add to your project.

Now open up the `app.js` file again in the text editor.

## The `twitter` package

To see all the documentation on how to use this package, take a look at: https://www.npmjs.com/package/twitter. DOCUMENTATION IS YOUR FRIEND. I cannot stress that enough.

### The setup

As we can see, first we need to `require` the twitter package we installed moments ago:

```javascript
var TwitterPackage = require('twitter');```

The `require` function is kind of similar to a C or Java `include` or `import`. What this line does is load the twitter package and allows you to access all the functions and properties from the variable `TwitterPackage`.

Now, remember those 4 tokens we got above? It's time to use those.

```javascript
var secret = {
  consumer_key: 'PUT YOURS',
  consumer_secret: 'PUT YOURS',
  access_token_key: 'PUT YOURS',
  access_token_secret: 'PUT YOURS'
}
var Twitter = new TwitterPackage(secret);
```

What this code is doing, is creating a javascript Object with our tokens in them, and creating a new Twitter Object with those tokens and are storing that new object in the variable `Twitter`. This will allows us to tell Twitter that we are who we are and that they should let us access Twitter's API.

NOTE: As mentioned before, those tokens are like passwords. If you plan on putting this code on GitHub or somewhere else, make sure you take out your tokens. If anyone got ahold of them, they could do some serious damage.

## Posting a tweet with code using the REST API

Twitter has a REST API that allows us to do different things. One of the things it can do is allow us to "POST" a tweet.

Looking back at that documentation page, we can see how to do that. For us, it looks like this:

```javascript
Twitter.post('statuses/update', {status: 'I Love Tech Knights!'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
```
There are several things happening here:

1. `Twitter.post` means that we are calling the post function in the Twitter object. This is similar in Java.
2. we pass the post function several things:
  1. 'statuses/update' means we want to post a status update (aka a tweet)
  2. `{status: 'I Love Tech Knights'}` is a javascript object that we are passing in to this function where we set the status of the tweet being sent out.
    * Note: Although this contains just the text of the tweet we want to send, there are a whole bunch of other options to set depending on what we want to post to twitter (Think: add images, add location, etc). We just want to post a simple status so we just set the status property.
  3. The last thing we pass in is a function. Yes, in javascript, you can actually pass functions in to other functions. It is one of the things that makes javascript a "functional programming language." A little nicer looking than Haskell, isn't it.

##### More information about the function we pass in.
As mentioned, we're passing in this function. In the `Twitter.post` function, you're expected to pass a function in that will be run AFTER twitter tries to post the tweet. This is what we call a "callback function." In that function, you'll notice 3 parameters:

1. error - if there is an error in the process of posting the tweet, this variable will contain an object with information about the error that occurred
2. tweet - an object that contains all the tweet data
3. response - an object of the actual response twitter sends back when you post a tweet.

In our code, we'll just post our tweet and then print it out in the console.

Go ahead and comment out the "Hello World" line. We don't need it anymore. In javascript, commenting is just like in C or Java. `//` or `/**/`.

Now, save that code, open up your terminal again and run:

`node app.js`

If you go to Twitter, you should see your tweet "I Love Tech Knights!" posted!

Congratulations! You just posted to Twitter via code!

### The Streaming API

Twitter has a very cool API called the Streaming API which gives us information about Tweets in real-time. In other words, when some one tweets something that we care about, we get all the data about that tweet.

First thing's first, let's go back to that documentation. There, we can see an example of the Streaming API. Modifying it for our use case, it looks something like this:

```javascript
Twitter.stream('statuses/filter', {track: '#TechKnightsDemo'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
```

Alright, let's break this down.

The `Twitter.stream` function takes in 3 parameters:
1. The 1st param is a string that tells twitter we want to listen for statuses with a certain filter.
2. The 2nd param is where we define that filter with an object. That object contains the property: `track` which lets us define a word, hashtag or phrase that we care to listen for. For this, we will be tracking when some one tweets with the hashtag "TechKnightsDemo".
3. the last parameter is a function that gets called when Twitter is done setting up our stream. When it's done setting up our stream, it then passes that stream object in to the function. Within this function, we can setup what happens when we receive a tweet along with other things such as error handling, etc. Let's take a closer look at what happens when we receive data:

```javascript
stream.on('data', function(tweet) {
  console.log(tweet.text);
});
```

So, using the stream object, it calls the `on` function. Now with the `on` function, you pass in a string and a function. This says, "when a get data (a tweet), call this function with that data." For now, we just print out `tweet.text` which is how you access the actual text of the tweet that was received that used "#TechKnightsDemo".

Let's go ahead and comment the `Twitter.post` code so we don't post the same tweet twice. Then, if we save that, and call `node app.js` in the terminal, you'll notice that the terminal no longer shows you a prompt. This is because it's running and listening for some sort of data to come in from that stream. If you need to stop it, press CTRL-C a few times to return to the prompt.

Now, to test this, go ahead and go to Twitter and tweet something with "#TechKnightsDemo", then check your running terminal and you should see the text of your tweet, printed out.

Congratulations! You just listened for tweets!

## Next Steps

Now you're probably wondering what's next. Well, let's recap so far:

* We've written some code that tweets something,
* and written something that listen for tweets.

There's only one more step left and that's to bring those ideas together! I've given you all the tools (and code) you need to make a very basic Twitter bot, now it's time for you to put those pieces together.

If you get it working, how about extending it further? There are so many possibilities. Here are some ideas:

* Tip calculator bot
* Random number generator bot
* Magic eight ball bot

I recommend changing the hashtag you're listening to as you might get others using the same hashtag. Try to make it unique.

#### Here are some hints that might help:
* `Math.random()` returns a random double between 0 and 1
* A string array:
```javascript
['AN','ARRAY','OF','STRINGS','LOOKS','LIKE','THIS']
```
* This will return an array of strings that were separated by spaces (i.e: `['This', 'is','a','string']` in the following example)
```javascript
var myString = "This is a string";
var stringArray = myString.split(" ");
```

One of the things you might want to do is reply to the person who tweeted with your hashtag. To do this, you need to "mention" them.

You can access the username of the person who tweeted with your hashtag by doing:

`tweet.user.screen_name`

In order to mention them, concatenate an "@" symbol at the beginning by doing:

`var mentionString = "@" + tweet.user.screen_name;`

then just concatenate that to the string you want to tweet out and boom, you're now replying to the person who tweeted at you.

Those are some hints, but like in most programming conundrums: Google it! There are resources online at your disposal that give you the answer you're looking for. StackOverflow is a great website for answers to small questions like "How do I do X in javascript". You can also ask someone walking around.

## SOLUTIONS
These are all of the solutions for the example project ideas, along with the basic "reply" example. They are also in the repo.

### Basic "reply" solution
This code shows you how to reply to someone that used a certain hashtag.

```javascript
var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./secret");

// my secret.json file looks like this:
// {
//   "consumer_key": "...",
//   "consumer_secret": "...",
//   "access_token_key": "...",
//   "access_token_secret": "..."
// }

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#TechKnightsDemo'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //build our reply object
    var statusObj = {status: "Hi @" + tweet.user.screen_name + ", How are you?"}

    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
```

### Tip calculator solution

This solution shows you how to make a tip calculator by tweeting:

`<decimal percentage to tip> <check amount> #TechKnightsDemoTip`

for example:
`.233 100 #TechKnightsDemoTip`would respond with:
`Hi @TylerLeonhardt, 23.3% of $100.00 is $23.30. That's a total of: $123.30!`

Here's the code:

```javascript
var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./secret");

// my secret.json file looks like this:
// {
//   "consumer_key": "...",
//   "consumer_secret": "...",
//   "access_token_key": "...",
//   "access_token_secret": "..."
// }

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#TechKnightsDemoTip'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //split up the tweet's text
    var tipArr = tweet.text.split(" ");

    // turn those Strings in to a floats
    var percent = parseFloat(tipArr[0]);
    var amount = parseFloat(tipArr[1]);

    // calculate the tip amount
    var tipAmount = percent * amount;

    //build our reply string
    var reply = "Hi @" + tweet.user.screen_name + ", " + (percent*100) + "% of $" + amount.toFixed(2) + " is $" + tipAmount.toFixed(2) + ". That's a total of: $" + (tipAmount+amount).toFixed(2) +"!";

    //call the post function to tweet something
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
```

### Random Number Gen solution

This solution shows you how to make a random number generator by tweeting:

`<lower bound> <upper bound> #TechKnightsDemoRandom`

for example:
`0 100 #TechKnightsDemoRandom`would respond with:
`Hi @TylerLeonhardt, a random number between 0 and 100 is 42!`

Here's the code:

```javascript
var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./secret");

// my secret.json file looks like this:
// {
//   "consumer_key": "...",
//   "consumer_secret": "...",
//   "access_token_key": "...",
//   "access_token_secret": "..."
// }

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#TechKnightsDemoRandom'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //split up the tweet's text
    var tipArr = tweet.text.split(" ");

    // turn those Strings in to a floats
    var lowerBound = parseInt(tipArr[0]);
    var upperBound = parseInt(tipArr[1]);

    // calculate the random number (Math.random returns a double between 0 and 1)
    var randomNum = Math.random() * (upperBound - lowerBound) + lowerBound;

    //build our reply string
    var reply = "Hi @" + tweet.user.screen_name + ", a random number between " + tipArr[0] + " and " + tipArr[1] + " is " + Math.round(randomNum) + "!";

    //call the post function to tweet something
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
```

### Magic 8 Ball solution

This solution shows you how to make a "magic 8 ball bot" that will tweet with a random response to anything that uses the hashtag "TechKnightsDemoMagic".

Here's the code:

```javascript
var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./secret");

// my secret.json file looks like this:
// {
//   "consumer_key": "...",
//   "consumer_secret": "...",
//   "access_token_key": "...",
//   "access_token_secret": "..."
// }

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// we will randomly pick one of these items in this array
var arrOfMagicSayings = [
  "Signs point to yes.",
  "Yes.",
  "Reply hazy, try again.",
  "Without a doubt.",
  "My sources say no.",
  "As I see it, yes.",
  "You may rely on it.",
  "Concentrate and ask again.",
  "Outlook not so good.",
  "It is decidedly so.",
  "Better not tell you now.",
  "Very doubtful.",
  "Yes - definitely.",
  "It is certain.",
  "Cannot predict now.",
  "Most likely.",
  "Ask again later.",
  "My reply is no.",
  "Outlook good.",
  "Don't count on it."
]

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#TechKnightsDemoMagic'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    // calculate the random index (Math.random returns a double between 0 and 1)
    var randomIndex = Math.round(Math.random() * arrOfMagicSayings.length);

    //build our reply string grabbing the string in that randomIndex we've calculated
    var reply = "Hi @" + tweet.user.screen_name + ", " + arrOfMagicSayings[randomIndex];

    //call the post function to tweet something
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
```
