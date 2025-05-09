const video = document.getElementById('video');
const checkMoodBtn = document.getElementById('checkMood');
const scanBar = document.getElementById('scanBar');
const manualSelect = document.getElementById('manualSelect');
const moodSelect = document.getElementById('moodSelect');
const confirmMood = document.getElementById('confirmMood');
const resultScreen = document.getElementById('resultScreen');
const movieThumb = document.getElementById('movieThumb');
const movieName = document.getElementById('movieName');
const watchNow = document.getElementById('watchNow');
const scanAgain = document.getElementById('scanAgain');

const MOVIES = {
  Happy: { name: "Welcome", link: "...", thumbnail: "..." },
  Sad: { name: "Call me Bae", link: "...", thumbnail: "..." },
  Excited: { name: "Citadel Honey Bunny", link: "...", thumbnail: "..." },
  Neutral: { name: "Farzi", link: "...", thumbnail: "..." },
  Angry: { name: "Agneepath", link: "...", thumbnail: "..." },
};

// Camera Access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => {
    document.getElementById('cameraSection').classList.add('hidden');
    moodSelect.classList.remove('hidden');
  });

// Button to check mood
checkMoodBtn.addEventListener('click', () => {
  scanBar.style.display = 'block';
  setTimeout(captureAndAnalyzeMood, 3000); // simulate scan time
});

// Simulated Mood Analysis
function captureAndAnalyzeMood() {
  scanBar.style.display = 'none';

  // Simulated OpenAI result
  const moods = ['Happy', 'Sad', 'Excited', 'Neutral', 'Angry'];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  showRecommendation(mood);
}

function showRecommendation(mood) {
  const movie = MOVIES[mood] || MOVIES['Neutral'];
  movieThumb.src = movie.thumbnail;
  movieName.innerText = movie.name;
  watchNow.href = movie.link;

  document.getElementById('cameraSection').classList.add('hidden');
  resultScreen.classList.remove('hidden');
}

// Fallback manual mood selection
manualSelect.addEventListener('click', () => {
  document.getElementById('cameraSection').classList.add('hidden');
  moodSelect.classList.remove('hidden');
});

let selectedMood = 'Neutral';
moodSelect.querySelectorAll('button[data-mood]').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMood = btn.dataset.mood;
  });
});

confirmMood.addEventListener('click', () => {
  moodSelect.classList.add('hidden');
  showRecommendation(selectedMood);
});

scanAgain.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  document.getElementById('cameraSection').classList.remove('hidden');
});
