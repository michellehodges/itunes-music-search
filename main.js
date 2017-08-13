let searchButton = document.querySelector(".search-button");
searchButton.addEventListener('click', function(ev) {
  ev.preventDefault();
  fetchSearchedItem();
})

function convertToJson(songs) {
  return songs.json();
}

function returnSongs(songs) {
  let htmlInsertionAtContainer = '';
  let songsContainer = document.querySelector(".results");

  for (j = 0; j < songs.results.length; j++ ) {
    let song = songs.results[j];
    htmlInsertionAtContainer += `
    <h1>Search Results:</h1>
    <div class="search-result">
      <img src=${songs.results[j].artworkUrl60} class="search-image">
      <span>${songs.results[j].trackName}</span>
      <span>${songs.results[j].artistName}</span>
      <button type="button" class="play-now"  onclick="playSong('${songs.results[j].trackName}', '${songs.results[j].artistName}','${songs.results[j].previewUrl}');"
       value=${songs.results[j].previewUrl}>Play Now</button>
    </div>
      `;
  }
    songsContainer.innerHTML = htmlInsertionAtContainer;
}

function playSong(trackName,artistName,previewUrl) {
  let songPlayer = document.querySelector(".player");
  let htmlInsertionAtPlayer = '';
  htmlInsertionAtPlayer += `
  <audio class="music-player" controls="controls" src="${previewUrl}" autoplay controls></audio>
  <span>Now Playing: ${artistName} - ${trackName} </span>
  `
  songPlayer.innerHTML = htmlInsertionAtPlayer;
}

function fetchSearchedItem(){
  let searchedItem = document.querySelector(".search-box");
  let urlEncodedSearchedItem = encodeURIComponent(searchedItem.value);
  fetch(`
    https://itunes.apple.com/search?term=${urlEncodedSearchedItem}&limit=25&country=US
    `)
    .then(convertToJson)
    .then(returnSongs);
}
