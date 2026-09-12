

const levelB = document.querySelector(".place");
 
navigator.getBattery().then( lev => {
    levelB.textContent = lev.level * 100 + "%"
    console.log(levelB.textContent)
}) 

if ("AmbientLightSensor" in window) {
  try {
    const sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", () => {
      console.log("Current light level:", sensor.illuminance);
    });
    sensor.start();
  } catch (err) {
    console.error("Sensor error:", err);
  }
}

const time = document.querySelector("#val1")
const timeL = new Date();
time.textContent = timeL.toLocaleTimeString();