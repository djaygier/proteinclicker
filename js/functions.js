function delay(time) {
    // Makes a new Promise object that will resolve after time milliseconds.
    return new Promise(resolve => setTimeout(resolve, time));
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getProductData(item, data) {
    return products[item][data]
}

function getUpgradeData(item, data) {
    return upgrades[item][data]
}

function toStringOnly(str) {
    return str.replace(/\d/g, '').replace('.', "");
}

function openPopup() {
    document.querySelector("settings").style.visibility = "visible";
    document.querySelector("popup").style.visibility = "visible";
}

function closePopup() {
    document.querySelector("settings").style.visibility = "hidden";
    document.querySelector("popup").style.visibility = "hidden";
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// function to clear cookies and then reload page

async function clearCookies() {
    clearingCookies = true
    await delay(1000)
    setCookie("protein", "")
    setCookie("proteinAdd", "")
    setCookie("products", "")
    setCookie("upgrades", "")
    await delay(500)
    location.reload()
}