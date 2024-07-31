console.log("Welcome to My Music Hub");

// Initialize Variables
let currentSongIndex = 0;
let audioPlayer = new Audio('audio/song1.mp3');
let playPauseButton = document.getElementById('playPauseButton');
let progressBar = document.getElementById('progressBar');
let playingGif = document.getElementById('playingGif');
let currentSongTitle = document.getElementById('currentSongTitle');
let songElements = Array.from(document.getElementsByClassName('songElement'));

let songList = [
    {title: "Song 1 - Artist", filePath: "audio/song1.mp3", coverPath: "images/cover1.jpg"},
    {title: "Song 2 - Artist", filePath: "audio/song2.mp3", coverPath: "images/cover2.jpg"},
    {title: "Song 3 - Artist", filePath: "audio/song3.mp3", coverPath: "images/cover3.jpg"},
    {title: "Song 4 - Artist", filePath: "audio/song4.mp3", coverPath: "images/cover4.jpg"},
    {title: "Song 5 - Artist", filePath: "audio/song5.mp3", coverPath: "images/cover5.jpg"},
    // Add more songs as needed
];

songElements.forEach((element, index) => { 
    element.getElementsByTagName("img")[0].src = songList[index].coverPath; 
    element.getElementsByClassName("songTitle")[0].innerText = songList[index].title; 
});

// Handle play/pause button click
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused || audioPlayer.currentTime <= 0) {
        audioPlayer.play();
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
        playingGif.style.opacity = 1;
    } else {
        audioPlayer.pause();
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
        playingGif.style.opacity = 0;
    }
});

// Update progress bar as the audio plays
audioPlayer.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioPlayer.currentTime / audioPlayer.duration) * 100); 
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioPlayer.currentTime = progressBar.value * audioPlayer.duration / 100;
});

const resetAllPlayIcons = () => {
    Array.from(document.getElementsByClassName('songPlayButton')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songPlayButton')).forEach((element) => {
    element.addEventListener('click', (event) => { 
        resetAllPlayIcons();
        currentSongIndex = parseInt(event.target.id);
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');
        audioPlayer.src = `audio/${currentSongIndex + 1}.mp3`;
        currentSongTitle.innerText = songList[currentSongIndex].title;
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        playingGif.style.opacity = 1;
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
    });
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentSongIndex >= songList.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex += 1;
    }
    audioPlayer.src = `audio/${currentSongIndex + 1}.mp3`;
    currentSongTitle.innerText = songList[currentSongIndex].title;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    playPauseButton.classList.remove('fa-play-circle');
    playPauseButton.classList.add('fa-pause-circle');
});

document.getElementById('previousButton').addEventListener('click', () => {
    if (currentSongIndex <= 0) {
        currentSongIndex = 0;
    } else {
        currentSongIndex -= 1;
    }
    audioPlayer.src = `audio/${currentSongIndex + 1}.mp3`;
    currentSongTitle.innerText = songList[currentSongIndex].title;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    playPauseButton.classList.remove('fa-play-circle');
    playPauseButton.classList.add('fa-pause-circle');
});
