

const levelB = document.querySelector(".place");
 
navigator.getBattery().then( lev => {
    levelB.textContent = lev.level * 100 + "%"
    console.log(levelB.textContent)
}) 

