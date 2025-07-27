const audio = document.getElementById('myAudio');
const muteCheckbox = document.getElementById('muteCheckbox');

// Default: muted so autoplay works
audio.muted = false;
audio.autoplay = false;

// Try to play (some browsers block it unless user interacts)
audio.play().catch((e) => {
  console.log('Autoplay blocked. Waiting for user interaction...');
});

// When checkbox changes
muteCheckbox.addEventListener('change', () => {
  audio.muted = muteCheckbox.checked;
  if (!muteCheckbox.checked) {
    audio.play(); // Try playing if unmuted
  }
  console.log("Muted:", muteCheckbox.checked);
});
