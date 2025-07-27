const scene = document.getElementById('scene');
const space = document.getElementById('space');



const messages = [
  "Happy Birthday", "Thet Thet", "13/2/2007",
  "My Heart", "❤️", "🎁", "🌟", "My love",
  "Ma Ma", "🎂", "💘"
];

const imgs = [
  "photo/photo_1_2025-07-27_22-05-44.jpg", "photo/photo_2_2025-07-27_22-05-44.jpg", "photo/photo_3_2025-07-27_22-05-44.jpg", "photo/photo_5_2025-07-27_22-05-44.jpg", "photo/photo_6_2025-07-27_22-05-44.jpg", "photo/photo_7_2025-07-27_22-05-44.jpg", "photo/photo_8_2025-07-27_22-05-44.jpg",
]
console.log(imgs)
const colors = ["blue", "pink", "yellow", "green"];

let zoom = -1000;
let rotationX = 0, rotationY = 0;
let dragging = false, startX, startY;

function generateText() {
  const el = document.createElement("div");
  el.className = ` floating ${colors[Math.floor(Math.random() * colors.length)]}`;


  // 80% chance to show text, 20% chance to show an image
  if (Math.random() < 0.9) {
    el.innerText = messages[Math.floor(Math.random() * messages.length)];
  } else {
    const img = document.createElement("img");
    img.src = imgs[Math.floor(Math.random() * imgs.length)];

    img.alt = "Love";
    img.style.width = "30%";
    img.style.height = "10%";
    img.style.borderRadius = "10%";
    img.style.pointerEvents = "";
    el.appendChild(img);

  }


  // Position in a 3D spherical world
  const radius = 300 + Math.random() * 300;
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.random() * Math.PI;

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  // Random position
  el.style.left = `${Math.random() * 100}vw`;
  el.style.top = `-${Math.random() * 50}px`;
  el.style.fontSize = `${1 + Math.random() * 1.5}rem`;
  el.style.animation = ` fall ${10 + Math.random() * 10}s linear forwards;`

  el.style.transform = `
    translate3d(${x}px, ${y}px, ${z}px)
    rotateX(${Math.random() * 0}deg)
    rotateY(${Math.random() * 0}deg)`
    ;
  el.style.fontSize = ` ${1 + Math.random() * 1.5}rem`;

  space.appendChild(el);
  setTimeout(() => el.remove(), 15000);
}

setInterval(generateText, 200);

function updateTransform() {
  space.style.transform = `   translateZ(${zoom}px)
    rotateX(${rotationX}deg)
    rotateY(${rotationY}deg)`

    ;
}

// Zoom with mouse wheel
document.addEventListener('wheel', e => {
  zoom += e.deltaY;
  updateTransform();
});

// Desktop drag
scene.addEventListener('mousedown', e => {
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
});
document.addEventListener('mouseup', () => dragging = false);
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  rotationY += dx * 0.2;
  rotationX -= dy * 0.2;
  startX = e.clientX;
  startY = e.clientY;
  updateTransform();
});

// Touch mobile
scene.addEventListener('touchstart', e => {
  dragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
scene.addEventListener('touchmove', e => {
  if (!dragging) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;
  rotationY += dx * 0.2;
  rotationX -= dy * 0.2;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  updateTransform();
});
scene.addEventListener('touchend', () => dragging = false);

