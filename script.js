let isPowerOn = true;

function togglePower() {
  isPowerOn = !isPowerOn;
  const powerBtn = document.getElementById("powerBtn");
  const powerIcon = document.getElementById("powerIcon");
  const powerText = document.getElementById("powerText");
  const orangeGlow = document.getElementById("orangeGlow");

  if (isPowerOn) {
    powerBtn.classList.add("active");
    powerIcon.className =
      "fa-solid fa-power-off text-4xl text-amber-500 mb-3 drop-shadow";
    powerText.innerText = "POWER ON";
    powerText.className =
      "text-xs font-black tracking-widest text-slate-800 uppercase";
    orangeGlow.style.opacity = "1";
  } else {
    powerBtn.classList.remove("active");
    powerIcon.className = "fa-solid fa-power-off text-4xl text-slate-400 mb-3";
    powerText.innerText = "POWER OFF";
    powerText.className =
      "text-xs font-black tracking-widest text-slate-400 uppercase";
    orangeGlow.style.opacity = "0";
  }
}

function setLumen(preset) {
  const buttons = document.querySelectorAll(".lumen-btn");
  const bar = document.getElementById("lumenBar");
  const badge = document.getElementById("lumenBadge");

  buttons.forEach((btn) => {
    btn.className =
      "lumen-btn neu-flat-sm py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition";
  });

  event.target.className =
    "lumen-btn neu-pressed py-2 rounded-xl text-xs font-bold text-amber-600 transition";

  let width = "100%";
  if (preset === "25%") width = "25%";
  else if (preset === "50%") width = "50%";
  else if (preset === "75%") width = "75%";
  else if (preset === "MAX") width = "100%";

  bar.style.width = width;
  badge.innerText = preset === "MAX" ? "100% MAX" : preset;
}

function setTimer(el) {
  const timerBtns = document.querySelectorAll(".timer-btn");
  timerBtns.forEach((btn) => {
    btn.className =
      "timer-btn neu-flat-sm py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition";
  });
  el.className =
    "timer-btn neu-pressed py-2 rounded-xl text-xs font-bold text-indigo-600 transition";
}

function toggleSwitch(btn) {
  const thumb = btn.querySelector(".toggle-switch-thumb");
  const isActive = btn.classList.contains("active");

  if (isActive) {
    btn.classList.remove("active");
    thumb.style.transform = "translateX(0px)";
  } else {
    btn.classList.add("active");
    thumb.style.transform = "translateX(20px)";
  }
}

function setTab(btn) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.className =
      "nav-item flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition";
    const span = item.querySelector("span");
    if (span) span.className = "text-[10px] font-medium";
  });

  btn.className =
    "nav-item flex flex-col items-center space-y-1 text-indigo-600";
  const activeSpan = btn.querySelector("span");
  if (activeSpan) activeSpan.className = "text-[10px] font-bold";
}
