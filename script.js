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
        advanced: [{ torch: false }], // ✅ false, not true
      });

      stream.getTracks().forEach((t) => t.stop()); // ✅ stop tracks

      isOn = false; // ✅ false
      powerOn.textContent = "POWERED OFF";
    }
  } catch (error) {
    powerOn.textContent = error.message;
  }
});

async function getBatteryLevel() {
  const bat = await navigator.getBattery();
  const lev = Math.round(bat.level * 100) + "%";

  function update() {
    if (!navigator.getBattery) {
      battery.forEach((b) => (b.textContent = "...%"));
    }

    try {
      battery.forEach((b) => (b.textContent = lev));
    } catch (e) {
      battery.forEach((b) => (b.textContent = "...%"));
    }
  }

  update();

  bat.addEventListener("chargingchange", update);
  bat.addEventListener("levelchange", update);
}

async function detectCharge() {
  const batt = await navigator.getBattery();

  function update() {
    if (batt.charging) {
      detect.textContent = "Charging";
    } else {
      detect.textContent = "Discharging";
    }

    if (batt.level === 1) {
      detect.textContent = "Full";
    }

    if (batt.level <= 0.2) {
      detect.textContent = "Low";
    }

    console.log(batt.level);
  }

  update();

  batt.addEventListener("chargingchange", update);
}

function getTime() {
  const times = new Date();

  time.textContent = times.toLocaleTimeString();
}

getBatteryLevel();
detectCharge();
getTime();
