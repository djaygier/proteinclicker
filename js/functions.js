const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getProductData = (item, data) => {
  return products[item][data];
};

const getUpgradeData = (item, data) => {
  return upgrades[item][data];
};

const toStringOnly = (str) => {
  return str.replace(/\d/g, "").replace(".", "");
};

const openPopup = () => {
  document.querySelector("settings").style.visibility = "visible";
  document.querySelector("popup").style.visibility = "visible";
};

const closePopup = () => {
  document.querySelector("settings").style.visibility = "hidden";
  document.querySelector("popup").style.visibility = "hidden";
};

const download = (filename, text) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Function to clear cookies and then reload the page

const clearCookies = async () => {
  clearingCookies = true;
  await delay(1000);
  setCookie("protein", "");
  setCookie("proteinAdd", "");
  setCookie("products", "");
  setCookie("upgrades", "");
  await delay(500);
  location.reload();
};
