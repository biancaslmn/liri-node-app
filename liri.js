require("dotenv").config();

// variables

var spotify = require("node-spotify-api");

var keys = require (".env");

var request = require ("request");

var moment = require ("moment");

var inquirer = require("inquirer");

new spotify = new spotify (keys.spotify);

// COMMANDS
// -----------------------------------
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
//-------------------------------------

var artistNames = function(artist) {
    return artist.name;
  };
  
  // Search Spotify
  var searchSpotify = function(musicName) {
    if (musicName === undefined) {
      musicName = "Eyes on fire";
    }

    spotify.search(
        {
          type: "track",
          query: musicName
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
    
          var songs = data.tracks.items;
    
          for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(artistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("==============================================");
          }
        }
      );
    };

    // Search Bands in town

    var findBands = function(artist) {
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
      
        request(queryURL, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
      
            if (!jsonData.length) {
              console.log("Sorry, we couldn't find any results matching " + artist);
              return;
            }
      
            console.log("Upcoming events for " + artist + ":");
      
            for (var i = 0; i < jsonData.length; i++) {
              var event = jsonData[i];
      
  // Log time/location of show
  console.log(
      event.venue.city +
      "," +
      (event.venue.country) +
      " at " +
      event.venue.name +
      " " +
      moment(event.datetime).format("MM/DD/YYYY")
  );
}
}
});
};

// Search Movie

var findMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "The Devil Wears Prada";
    }
  
    var urlLink =
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

      request(urlLink, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var jsonData = JSON.parse(body);
    
          console.log("Title: " + jsonData.Title);
          console.log("Year: " + jsonData.Year);
          console.log("Rated: " + jsonData.Rated);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
      });
    };

    // Taking text to call Liri commands
    var takeAction = function() {
        fs.readFile("random.txt", function(error, data) {
          console.log(data);
      
          var dataArr = data.split(",");
      
          if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
          } else if (dataArr.length === 1) {
            pick(dataArr[0]);
          }
        });
      };

      //
      

      //

      //Execute functions
      var runApp = function(firstArg, secondArg) {
        pick(firstArg, secondArg);
      };
      runApp(process.argv[2], process.argv.slice(3).join(" "));

      console.log ("Hello, my name is Liri. I'm here to assist you with entertainment related questions like, information about artists, movies and events ")

      inquirer
  .prompt([

    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    
    {
      type: "list",
      message: "Which action do you choose?",
      choices: ["", "", ""],
      name: ""
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
