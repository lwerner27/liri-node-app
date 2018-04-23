// Required Resources
require("dotenv").config();
let keys = require("./keys.js")
let fs = require("fs")
let Twitter = require("twitter")
let request = require("request")
var Spotify = require('node-spotify-api');

// Environment Variables
var spotify = new Spotify(keys.Spotify);
var client = new Twitter(keys.Twitter);

// Put Arguments into variables
let action = process.argv[2]

let argTwo = ""

let songTitle = ""

let dataArr = fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
        console.log(err)
    }

    return data.split(",")

})

for (let i = 3; i < process.argv.length; i++) {
    songTitle = songTitle + process.argv[i] + " "
}
songTitle = songTitle.trim()

for (let i = 3; i < process.argv.length; i++) {
    if (i === 3) {
        argTwo = argTwo + process.argv[i]
    } else {
        argTwo = argTwo + "_" + process.argv[i]
    }
}

// Get Tweets Function
function getTweets() {
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
}

// Get Movie Function
function getMovie() {
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
}

// Get Song Function
function getSong() {
    console.clear()

    spotify.search({ type: 'track', query: songTitle, limit: 1 })
    .then(function(response) {
        console.log("")

        console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);
        console.log(`Title: ${response.tracks.items[0].name}`);

        // Checks if there is a Preview Link
        if (response.tracks.items[0].preview_url) {
            console.log(`Preview Link: ${response.tracks.items[0].preview_url}`)
        } else {
            console.log("Preview Link Unavailable")
        }

        console.log(`Album Title: ${response.tracks.items[0].album.name}`)

    })
    .catch(function(err) {
        console.log(err);
    });
}

function getRandom() {

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err)
        }
    
        let dataArr = data.split(",")

        console.log(dataArr)

        songTitle = dataArr[1]

        checkAction(dataArr[0])
    
    })
}

// Display Options Function
function displayOptions() {
    // If user doesn't add recognized arguments
    console.clear()
    console.log("The argument options are as follows:")
    console.log("")
    console.log("getTweets <desired twitter handle> ex) getTweets LucasJWerner")
    console.log("getMovie <desired movie title> ex) getMovie Man Of Steel")
    console.log("getSong <desired song title> ex) getSong Tiny Dancer")
    console.log("getRandom")
}

// Check action Function
function checkAction(action) {
    if (action === 'getTweets') {

        getTweets()
    
    } else if (action === "getMovie") {
    
        getMovie()
    
    } else if (action === "getSong") {
    
        getSong()
    
    } else if (action === "getRandom") {

        getRandom()

    } else {
    
        displayOptions()
    
    }
}

checkAction(action)