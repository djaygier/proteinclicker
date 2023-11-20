import { products, upgrades } from '../js/values.js';

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

const enablePhone = async () => {
  selectNav("home-icon", "left");
  document.querySelector("left").style.width = "100%";
  document.querySelector("left").style.visibility = "visible";
  document.querySelector("middle").style.visibility = "hidden";
  document.querySelector("right top").style.visibility = "hidden";
};

const disablePhone = async () => {
  document.querySelector("left").setAttribute("style", "");
  document.querySelector("left").style.visibility = "visible";
  document.querySelector("middle").style.visibility = "visible";
  document.querySelector("right top").style.visibility = "visible";
};

const checkScreenSize = () => {
  const screenWidth = screen.width;

  if (screenWidth <= 1280) {
    enablePhone();
    document.getElementById("phone").href = "css/phone.css";
    document.querySelector("nav").style.visibility = "visible";
  } else {
    disablePhone();
    document.getElementById("phone").href = "";
    document.querySelector("nav").style.visibility = "hidden";
  }

  // particle pos
  const width = document.querySelector("left").offsetWidth;
  const height = document.querySelector("left").offsetHeight;

  document.documentElement.style.setProperty(
    "--particle-pos-top",
    height / 2 + "px"
  );
  document.documentElement.style.setProperty(
    "--particle-pos-left",
    width / 2 + "px"
  );
};

const saveFile = () => {
  const allCookies = [
    getCookie("products"),
    getCookie("upgrades"),
    getCookie("protein"),
    getCookie("proteinAdd"),
  ];

  download("saveFile", JSON.stringify(allCookies));
};

const onLoadSave = () => {
  document.getElementById("input").addEventListener("change", getFile);
};

const getFile = (event) => {
  const input = event.target;
  if ("files" in input && input.files.length > 0) {
    readFileContent(input.files[0]).then((content) => {
      const cookieList = JSON.parse(content);

      const cookieDataProducts = cookieList[0];
      const cookieDataUpgrades = cookieList[1];
      const cookieDataProtein = cookieList[2];
      const cookieDataProteinAdd = cookieList[3];

      if (cookieDataProducts != "") {
        const productsJson = JSON.parse(cookieDataProducts);

        for (const key in productsJson) {
          products[key]["amount"] = productsJson[key]["amount"];
          products[key]["price"] = productsJson[key]["price"];
          products[key]["shiny"] = productsJson[key]["shiny"];
        }

        loadedFromSave = true;
      }

      if (cookieDataUpgrades != "") {
        const upgradesJson = JSON.parse(cookieDataUpgrades);

        for (const key in upgradesJson) {
          upgrades[key]["bought"] = upgradesJson[key]["bought"];
          upgrades[key]["added"] = upgradesJson[key]["added"];

          if (upgrades[key]["bought"] == true) {
            products[upgrades[key]["upgrade"]]["add"] *=
              upgrades[key]["multiplier"];
          }
        }

        loadedFromSave = true;
      }

      if (cookieDataProtein != "") {
        protein = parseFloat(cookieDataProtein);
        loadedFromSave = true;
      }

      if (cookieDataProteinAdd != "") {
        proteinAdd = parseFloat(cookieDataProteinAdd);
        loadedFromSave = true;
      }

      updateCount();
      updatePrice();
      updateProducts();
    });
  }
};

const readFileContent = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsText(file);
  });
};


export {
  delay,
  setCookie,
  getCookie,
  randomIntFromInterval,
  getProductData,
  getUpgradeData,
  toStringOnly,
  openPopup,
  closePopup,
  download,
  clearCookies,
  checkScreenSize,
  readFileContent,
  getFile,
  onLoadSave
};
