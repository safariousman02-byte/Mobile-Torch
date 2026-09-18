function getDeviceName() {
    const name = navigator.userAgent;

        if (/iPhone/i.test(name))       return "iPhone";
        if (/iPad/i.test(name))         return "iPad";
        if (/Android/i.test(name))      return "Android";
        if (/Windows/i.test(name))      return "Windows";
        if (/Macintosh|Mac OS X/i.test(name)) return "Mac";
        if (/Linux/i.test(name))        return "Linux";

    return "Device";
}

async function getPercentage() {
    const battery = await navigator.getBattery();
    return battery.level * 100;
}

getPercentage().then(lev => {
    battery.textContent = lev + "%";
    battery2.textContent = lev + "%";
    console.log(getPercentage())


})



const battery = document.querySelector(".bat");
const avatar = document.querySelector(".avatar");
const localeTime = document.querySelector(".time")
const battery2 = document.querySelector(".battery2");


avatar.textContent = getDeviceName();
console.log(getDeviceName())

function getTime(){
    const time = new Date();
    console.log(time.toLocaleTimeString())

    return time.toLocaleTimeString();
}
localeTime.textContent = getTime()


async function getCharging() {
    const charge = await navigator.getBattery();
    const text = document.querySelector(".charge");

    charge.charging ? text.textContent = "Charging" : text.textContent = "Descharging"

}

console.log("jack a dit..")