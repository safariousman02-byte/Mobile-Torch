const battery = document.querySelectorAll(".batLev");
const detect = document.querySelector(".detectCharge");

async function getBatteryLevel() {
  if (!navigator.getBattery) {
    battery.forEach((b) => (b.textContent = "...%"));
  }

  try {
    const bat = await navigator.getBattery();
    battery.forEach((b) => (b.textContent = Math.round(bat.level * 100) + "%"));
  } catch (e) {
    battery.forEach((b) => (b.textContent = "...%"));
  }
}

async function detectCharge() {
  const batt = await navigator.getBattery();

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

getBatteryLevel();
detectCharge();
