// ====== ตั้งค่าตรงนี้ได้เลย ======
const CONFIG = {
  toName: "ไอหมูอ้วงงง",     // ชื่อแฟน
  fromName: "ฉัน",     // ชื่อคุณ
  heartEmojis: ["❤", "💕", "🌸", "💗", "💖"],
  heartCount: 45
};
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const toNameEl = document.getElementById("toName");
  if (toNameEl) toNameEl.textContent = CONFIG.toName;
  const fromNameEl = document.getElementById("fromName");
  if (fromNameEl) fromNameEl.textContent = CONFIG.fromName;

  const intro = document.getElementById("intro");
  const content = document.getElementById("content");
  const giftBox = document.getElementById("giftBox");

  const openGift = () => {
    if (giftBox.classList.contains("open")) return;
    giftBox.classList.add("open");
    setTimeout(() => {
      intro.classList.add("hide");
      content.classList.add("show");
      content.setAttribute("aria-hidden", "false");
    }, 650);
  };

  giftBox.addEventListener("click", openGift);
  giftBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGift();
    }
  });

  spawnHearts();
  handleVideo();
});

function spawnHearts() {
  const layer = document.getElementById("hearts");

  const createHeart = (withDelay) => {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = CONFIG.heartEmojis[Math.floor(Math.random() * CONFIG.heartEmojis.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 16 + Math.random() * 26 + "px";
    h.style.animationDuration = 5 + Math.random() * 8 + "s";
    if (withDelay) h.style.animationDelay = Math.random() * 7 + "s";
    layer.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  };

  for (let i = 0; i < 40; i++) createHeart(false);
  setInterval(() => createHeart(true), 500);
}

function handleVideo() {
  const video = document.getElementById("loveVideo");
  const hint = document.querySelector(".video-hint");
  if (!video) return;

  video.addEventListener("error", () => {
    if (hint) hint.textContent = "ยังไม่ได้ใส่ไฟล์คลิป — วางไฟล์ไว้ที่ assets/video.mp4";
  });
}
