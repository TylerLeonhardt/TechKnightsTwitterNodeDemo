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
