

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

const torchBtn = document.querySelector(".torch")

let isOn = false;
let stream = null;
let track = null;
torchBtn.addEventListener("click", async () => {
    
    try {
        if(!isOn) {

            stream = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: 'envireonment'}
            });

            track = stream.getVideoTracks()[0];
            
            await track.applyConstraints({
                advanced: [{torch: true}]
            });

            isOn = true;

        } else {
            if (track) {
               await track.applyConstraints({
                advanced: [{torch: true}]
            });
            
                if (sream) {
                    stream.getTracks().forEach(el => {
                        el.stop()
                    });
                }
                isOn = false;
            }
        }
    }catch (error){
        console.log(error)
    }
})