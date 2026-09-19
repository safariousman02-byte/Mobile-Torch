const battery = document.querySelectorAll(".batLev");
const detect = document.querySelector(".detectCharge");
const time = document.querySelector(".time");
const powerBtn = document.querySelector(".power-section");
const powerOn = document.querySelector(".power-label");

let stream = null;
let track = null;
let isOn = false;

powerBtn.addEventListener("click", async () => {
  try {
    // TURN ON
    if (!isOn) {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      track = stream.getVideoTracks()[0]; // ✅ video, not audio

      await track.applyConstraints({
        advanced: [{ torch: true }],
      });

      isOn = true;
      powerOn.textContent = "POWERED ON";

      // TURN OFF
    } else {
      await track.applyConstraints({
        advanced: [{ torch: false }],
      });

      stream.getTracks().forEach((t) => t.stop());

      isOn = false;
      powerOn.textContent = "POWERED OFF";
    }
  } catch (error) {
    powerOn.textContent = error.message;
  }
});

async function getBatteryLevel() {
  if (!navigator.getBattery) {
    battery.forEach((b) => (b.textContent = "...%"));
    return;
  }

  const bat = await navigator.getBattery();

  function update() {
    const lev = Math.round(bat.level * 100) + "%";

    battery.forEach((b) => (b.textContent = lev));
  }

  update();

  bat.addEventListener("chargingchange", update);
  bat.addEventListener("levelchange", update);
}

async function detectCharge() {
  if (!navigator.getBattery) {
    detect.textContent = "--";
    return;
  }

  const batt = await navigator.getBattery();

  function update() {
    if (batt.charging) {
      detect.textContent = "Charging";
    } else if (batt.level === 1) {
      detect.textContent = "Full";
    } else if (batt.level <= 0.2) {
      detect.textContent = "Low";
    } else {
      detect.textContent = "Discharging";
    }

    console.log(batt.level);
  }

  update();

  batt.addEventListener("chargingchange", update);
  batt.addEventListener("levelchange", update);
}

function getTime() {
  time.textContent = new Date().toLocaleTimeString();
}

setInterval(getTime, 1000);
getTime();

getBatteryLevel();
detectCharge();
