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
    battery.textContent = lev "%";
})


const battery = document.querySelector(".bat");
const avatar = document.querySelector(".avatar");


avatar.textContent = getDeviceName();

console.log(getDeviceName())
console.log(getPercentage())