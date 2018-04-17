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

let argTwo = ""

for (let i = 3; i < process.argv.length; i++) {
    if (i === 3) {
        argTwo = argTwo + process.argv[i]
    } else {
        argTwo = argTwo + "_" + process.argv[i]
    }
}

// Check for actions
if (action === 'getTweets') {

    console.clear()
    let params = {
        screen_name: argTwo,
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
} else if (action === "getMovie") {
    console.clear()
    let queryUrl = `http://www.omdbapi.com/?apikey=trilogy&t=${argTwo}`
    
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            let jsonBody = JSON.parse(body)
            console.log("")
            console.log(`Title: ${jsonBody.Title}`)
            console.log(`Released: ${jsonBody.Released}`)
            console.log(`iMDB Rating: ${jsonBody.Ratings[0].Value}`)
            console.log(`Rotten Tomatoes Rating: ${jsonBody.Ratings[1].Value}`)
            console.log(`Produced In: ${jsonBody.Country}`)
            console.log(`Language: ${jsonBody.Language}`)
            console.log(`Plot Summary: ${jsonBody.Plot}`)
            console.log(`Actors: ${jsonBody.Actors}`)

          }
    }) 

} else {
    // If user doesn't add recognized arguments
    console.clear()
    console.log("The argument options are as follows:")
    console.log("")
    console.log("getTweets <desired twitter handle>")
    console.log("getSongInfo <desired song title>")
    console.log("getRandom")
}