window.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("img");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const audioElement = document.querySelector("audio");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("forward");
  const playBtn = document.getElementById("play");

  const songs = [
    {
      name: "jacinto-1",
      title: "Electric Chill Machine",
      artist: "Jacinto Design",
    },
    {
      name: "jacinto-2",
      title: "Seven Nation Army (Remix)",
      artist: "Jacinto Design",
    },
    {
      name: "jacinto-3",
      title: "Goodnight Disco Queen",
      artist: "Jacinto Design",
    },
    {
      name: "metric-1",
      title: "Front Row (Remix)",
      artist: "Metric/Jacinto Design",
    },
  ];

  let isSongPlaying = false;
  let songIndex = 0; //set which song from list to play

  const playSong = () => {
    audioElement.play();
    isSongPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  };
  const pauseSong = () => {
    audioElement.pause();
    isSongPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
  };

  //Update the DOM with songs
  const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audioElement.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
  };

  const playPreviousSong = () => {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  };

  const playNextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  };

  //Select a first song on page load
  loadSong(songs[songIndex]);

  playBtn.addEventListener("click", () =>
    isSongPlaying ? pauseSong() : playSong()
  );

  prevBtn.addEventListener("click", playPreviousSong);
  nextBtn.addEventListener("click", playNextSong);
});
