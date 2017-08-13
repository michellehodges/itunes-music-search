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
  let htmlInsertionSearchResults = '';
  let songsContainer = document.querySelector(".results");

  for (j = 0; j < songs.results.length; j++ ) {
    let song = songs.results[j];
    htmlInsertionAtContainer += `
    <div class="search-result"
      style="
        height: 200px;
        width: 200px;
        text-align: center;
        font-family: 'Arvo', serif;
        font-size: 15px;
    ">
      <img src=${songs.results[j].artworkUrl100} class="search-image" style="padding: 10px;"><br/>
      <span>${songs.results[j].trackName}</span><br/>
      <span>${songs.results[j].artistName}</span><br/>
      <button type="button" class="play-now" style="margin: 10px;" onclick="playSong('${songs.results[j].trackName}', '${songs.results[j].artistName}','${songs.results[j].previewUrl}');"
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
  <span
    style="
      font-family: 'Arvo', serif;
      font-size: 15px;
      padding-left: 70px;
  ">
    Now Playing: ${artistName} - ${trackName} </span>
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
