const period = document.querySelector(".period");
const battery = document.querySelector(".bat");
const avatar = document.querySelector(".avatar");
const localeTime = document.querySelector(".time");
const battery2 = document.querySelector(".battery2");
const position = document.querySelector(".active");

function getDeviceName() {
  const name = navigator.userAgent;

  if (/iPhone/i.test(name)) return "iPhone";
  if (/iPad/i.test(name)) return "iPad";
  if (/Android/i.test(name)) return "Android";
  if (/Windows/i.test(name)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(name)) return "Mac";
  if (/Linux/i.test(name)) return "Linux";

  return "Device";
}

async function getPercentage() {
  const battery = await navigator.getBattery();
  return battery.level * 100;
}

getPercentage().then((lev) => {
  battery.textContent = lev + "%";
  battery2.textContent = lev + "%";
  console.log(getPercentage());
  getCharging();
});

avatar.textContent = getDeviceName();
console.log(getDeviceName());

function getTime() {
  const time = new Date();
  console.log(time.toLocaleTimeString());

  console.log(time.getHours());

  const pin = new Date().getHours();
  console.log(pin);

  if (pin < 12) period.textContent = "Morning";
  if (pin < 17) period.textContent = "Afternoon";
  if (pin < 21) period.textContent = "Morning";
  if (pin < 0) period.textContent = "Night";

  return time.toLocaleTimeString();
}
localeTime.textContent = getTime();

async function getCharging() {
  const charge = await navigator.getBattery();
  const text = document.querySelector(".charge");

  charge.charging
    ? (text.textContent = "Charging")
    : (text.textContent = "Discharging");
}

function getDirection() {
  window.addEventListener("deviceorientationabsolute", (e) => {
    const head = e.alpha;
    const dir = getCompassDirection(head);
    document.querySelector(".active").textContent = dir;
  });
}

function getCompassDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) return "North";
  if (deg >= 22.5 && deg < 67.5) return "North-East";
  if (deg >= 67.5 && deg < 112.5) return "East";
  if (deg >= 112.5 && deg < 157.5) return "South-East";
  if (deg >= 157.5 && deg < 202.5) return "South";
  if (deg >= 202.5 && deg < 247.5) return "South-West";
  if (deg >= 247.5 && deg < 292.5) return "West";
  return "North-West";
}

getDirection();

const btn = document.querySelector(".power-section");
const status = document.getElementById("status");

let stream = null;
let track = null;
let isOn = false;

btn.addEventListener("click", async () => {
  try {
    if (!isOn) {
      // Request camera
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      // Get the video track
      track = stream.getVideoTracks()[0];

      // Turn on torch
      await track.applyConstraints({
        advanced: [{ torch: true }],
      });

      isOn = true;
      torchBtn.textContent = "Turn OFF";
      torchBtn.classList.add("on");
      status.textContent = "Torch is ON";
    } else {
      // Turn off torch
      if (track) {
        await track.applyConstraints({
          advanced: [{ torch: false }],
        });
      }

      // Stop camera
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      isOn = false;
      torchBtn.textContent = "Turn ON";
      torchBtn.classList.remove("on");
      status.textContent = "Torch is OFF";
    }
  } catch (error) {
    console.error(error);
  }
});

console.log("jack a dit..");
