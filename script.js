window.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("img");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const audioElement = document.querySelector("audio");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("forward");
  const playBtn = document.getElementById("play");
  const progressBar = document.getElementById("progress-container");
  const progressIndicator = document.getElementById("progress");
  const currentTimeElement = document.getElementById("current-time");
  const durationElement = document.getElementById("duration");

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

  //Update the DOM with song
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

  const getSongDurationInMinutes = (duration) => {
    //Calculate duration of the song in minutes
    return Math.floor(duration / 60);
  }

  const getSongDurationInSeconds = (duration) => {
    //Calculate duration of the song in seconds
    let durationInSeconds = Math.floor(duration % 60);
      if (durationInSeconds < 10) {
        durationInSeconds = `0${durationInSeconds}`;
      }
      return durationInSeconds.toString();
  }

  
  const updateProgressBar = (event) => {
    if (isSongPlaying) {
      const { duration, currentTime } = event.srcElement;
      //Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progressIndicator.style.width = `${progressPercent}%`;
      
      const durationInMinutes = getSongDurationInMinutes(duration);
      const durationInSeconds = getSongDurationInSeconds(duration);
  
      //Wait for durationInSeconds to be calculated before changing DOM
      if (durationInSeconds !== "NaN") {
        durationElement.textContent = `${durationInMinutes}:${durationInSeconds}`;
      }

      const currentInMinutes = Math.floor(currentTime / 60);
      //Calculate current of the song in seconds
      let currentInSeconds = Math.floor(currentTime % 60);
      if (currentInSeconds < 10) {
        currentInSeconds = `0${currentInSeconds}`;
      }
      currentTimeElement.textContent = `${currentInMinutes}:${currentInSeconds}`;
    }
  };
  
  const navigateSong = (event) => {
    const progressBarWidth = event.srcElement.clientWidth;
    const barClickedPosition = event.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (barClickedPosition / progressBarWidth) * duration;
    !isSongPlaying && playSong();
  };
  
  //Select a first song on page load
  loadSong(songs[songIndex]);
  
  playBtn.addEventListener("click", () =>
    isSongPlaying ? pauseSong() : playSong()
  );

  prevBtn.addEventListener("click", playPreviousSong);
  nextBtn.addEventListener("click", playNextSong);
  audioElement.addEventListener("timeupdate", updateProgressBar);
  progressBar.addEventListener("click", navigateSong);
  audioElement.addEventListener('ended', playNextSong);
});
