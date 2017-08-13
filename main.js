//ON CLICK OF "SEARCH"
let searchButton = document.querySelector(".search-button");
searchButton.addEventListener('click', function(ev) {
  ev.preventDefault();
  console.log("searchButton is working");
  fetchSearchedItem();
})

//GLOBAL FUNCTIONS HERE
function convertToJson(songs) {
  console.log("convertToJson is working")
  return songs.json();
}

function returnSongs(songs) {
  console.log("returnSongs is twerking!")
  let htmlInsertionAtContainer = '';
  let htmlInsertionAtPlayer = '';
  let songsContainer = document.querySelector(".results");
  let songPlayer = document.querySelector(".player");

  htmlInsertionAtPlayer += `
  <audio class="music-player" controls="controls" src="${previewUrl}" controls autoplay></audio>
  <span>Now Playing: ${artistName} - ${trackName} </span>
  `

  for (j = 0; j < songs.results.length; j++ ) {
    let song = songs.results[j];
    htmlInsertionAtContainer += `
    <h1>Search Results:</h1>
    <div class="search-result">
      <img src=${songs.results[j].artworkUrl60} class="search-image">
      <span>${songs.results[j].trackName}</span>
      <span>${songs.results[j].artistName}</span>
      <button type="button" class="play-now" value=${previewUrl}>Play Now</button>
    </div>
      `;
  }

    songsContainer.innerHTML = htmlInsertionAtContainer;
    songPlayer.innerHTML = htmlInsertionAtPlayer;
    console.log(songs);
  }

function fetchSearchedItem(){
  console.log("fetchSearchedItem is working")
  let searchedItem = document.querySelector(".search-box");
  let urlEncodedSearchedItem = encodeURIComponent(searchedItem);
  fetch(`
    https://itunes.apple.com/search?term=${urlEncodedSearchedItem.value}&limit=25&country=US
    `)
    .then(convertToJson)
    .then(returnSongs);
}

function playSong(song) {
  // When the play song button is clicked,
  // assign the value of previewURL to audio class music
  // then automatically play the song.
  console.log("playButton is working!");
}

//ON CLICK OF "PLAY SONG", play the preview of the URL that was clicked. Assign the value of that URL to the audio class music player.
let playButton = document.querySelector(".play-now");
playButton.addEventListener('click', function() {
  console.log("playButton is working!");
  playSong();
})
