// Required Resources
require("dotenv").config();
let keys = require("./keys.js")
let Twitter = require("twitter")
let request = require("request")

// Environment Variables
// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.Twitter);

// Start Of App

// Put Arguments into variables
let action = process.argv[2]
let twitterHandle = process.argv[3]

// Check for actions
if (action === 'getTweets') {

    let params = {
        screen_name: twitterHandle,
        count: 20,
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log("")
                console.log(tweets[i].text)
                console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------")
            }
        } else {
            console.log(error)
        }
    });
} else {
    // If user doesn't add recognized arguments
    console.log("The argument options are as follows:")
    console.log("")
    console.log("getTweets <desired twitter handle>")
    console.log("getSongInfo <desired song title>")
    console.log("getRandom")
}