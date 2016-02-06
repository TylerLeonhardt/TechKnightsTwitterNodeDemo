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
