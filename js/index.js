const addEvent = (item) => {
  document
    .getElementById(item)
    .setAttribute("onmousedown", "mouseDownAnimation('" + item + "')");
  document
    .getElementById(item)
    .setAttribute("onmouseup", "mouseUpAnimation('" + item + "')");
  document
    .getElementById(item)
    .setAttribute("onmouseleave", "mouseUpAnimation('" + item + "')");
};

const upgradeItem = (item) => {
  if (protein >= upgrades[item]["price"]) {
    if (upgrades[item]["upgrade"] == "scoop") {
      // CURSOR UPGRADE
      proteinAdd *= upgrades[item]["multiplier"];
    } else {
      // PRODUCT UPGRADES
      products[upgrades[item]["upgrade"]]["add"] *=
        upgrades[item]["multiplier"];
    }

    protein -= upgrades[item]["price"];
    document.getElementById(item).remove();
    upgrades[item]["bought"] = true;
    updateCount();
    updatePrice();
  }
};

// RIGHT FORMAT OF PRICE, WITH UNIT

const formatPrice = (price) => {
  let unit = "g";

  if (price >= 1000 && price < 1000000) {
    price /= 1000;
    price = price.toFixed(1);
    unit = "kg";
  } else if (price >= 1000000) {
    price /= 1000000;
    price = price.toFixed(3);
    unit = "ton";
  }

  return [price, unit];
};

// ADD UPGRADE ELEMENT

const addUpgrade = (item) => {
  upgrades[item]["added"] = true;

  let div = document.querySelector("bottom");

  let upgrade = document.createElement("upgrade");
  upgrade.setAttribute("onclick", `upgradeItem('${item}')`);
  upgrade.id = item;
  div.append(upgrade);

  let price = document.createElement("div");
  price.className = "price";

  let priceAmount = getUpgradeData(item, "price");
  let formatedPrice = formatPrice(priceAmount);
  price.innerHTML = parseFloat(formatedPrice[0]).toFixed(0);
  upgrade.append(price);

  let unit = document.createElement("div");
  unit.className = "unit";
  unit.innerHTML = formatedPrice[1];
  price.append(unit);

  let info = document.createElement("div");
  info.className = "info";
  info.innerHTML = getUpgradeData(item, "upgrade");
  upgrade.append(info);

  let multiplier = document.createElement("div");
  multiplier.className = "multiplier";
  multiplier.innerHTML = getUpgradeData(item, "multiplier") + "X";
  upgrade.append(multiplier);

  let image = document.createElement("img");
  image.src = "media/" + getUpgradeData(item, "foto");
  upgrade.append(image);
};

// A ASYNC LOADED FUNCTION
const loaded = async () => {
  // ADD ALL UPGRADES ELEMENTS FOR START
  for (const item in upgrades) {
    if (getUpgradeData(item, "added") == true) {
      if (getUpgradeData(item, "bought") == false) {
        addUpgrade(item);
      }
    }
  }

  // FIX SHINE ANIMATION
  await delay(50);
  document.documentElement.style.setProperty("--shine", "");
  await delay(50);
  document.documentElement.style.setProperty(
    "--shine",
    "slide 3s linear infinite alternate"
  );

  // ADD ALL PRODUCTS ELEMENTS
  for (const item in products) {
    let div = document.querySelector("right top");

    let product = document.createElement("product");
    product.id = item;
    div.append(product);

    // check if shiny
    if (getProductData(item, "shiny") == true) {
      document.getElementById(item).classList.add("shiny");
    }

    let img = document.createElement("img");
    img.alt = item;
    img.src = "media/" + item + ".webp";
    product.append(img);

    let title = document.createElement("div");
    title.className = "title";
    title.innerHTML = getProductData(item, "name");
    product.append(title);

    let price = document.createElement("div");
    price.className = "cost";
    price.innerHTML =
      Math.round(formatPrice(getProductData(item, "price"))[0] * 10) / 10;
    product.append(price);

    let unit = document.createElement("div");
    unit.className = "unit";
    unit.innerHTML = formatPrice(getProductData(item, "price"))[1];
    price.append(unit);

    let amount = document.createElement("div");
    amount.className = "product-amount";
    amount.innerHTML = getProductData(item, "amount");
    product.append(amount);
  }

  for (const item in products) {
    addEvent(item);
  }

  while (1) {
    await delay(20);
    protein += proteinPerSecond / 50;

    updateCount();
  }
};

let clearingCookies = false;
const cookiesLoop = async (item) => {
  while (!clearingCookies) {
    saveCookies();
    await delay(100);
  }
};

const saveCookies = (item) => {
  setCookie("products", JSON.stringify(products));
  setCookie("upgrades", JSON.stringify(upgrades));
  setCookie("protein", protein.toFixed(0).toString());
  setCookie("proteinAdd", proteinAdd.toString());
};

firstClick = false;

const clickProtein = async () => {
  if (!firstClick) {
    music.play();
    firstClick = true;
  }

  protein += proteinAdd;
  totalProtein += proteinAdd;
  document.getElementById("clicker").style.animation = "";
  await delay(20);
  document.getElementById("clicker").style.animation = "shakeProtein 0.2s";

  updateCount();

  // Effects Low
  if (effects >= 1) {
    clickEffect();
  }

  // Effects Medium (Default)
  if (effects >= 2) {
    animateBackground();
    animateParticles();
  }

  // Effects High
  if (effects >= 3) {
    animateBackground();
    animateParticles();
  }

  // Effects Ultra high
  if (effects >= 4) {
    animateBackground();
    animateParticles();
  }
};

const removeParticle = async (el) => {
  await delay(500);
  el.remove();
};

const animateParticles = async () => {
  for (let i = 1; i <= 5; i++) {
    let div = document.getElementsByClassName("particles")[0];
    let particle = document.createElement("div");

    particle.className = "particle";

    particlesWidth =
      document.getElementsByClassName("particles")[0].offsetWidth;
    particlesHeight =
      document.getElementsByClassName("particles")[0].offsetHeight;

    xOffset = randomIntFromInterval(0, particlesWidth);
    yOffset = randomIntFromInterval(0, particlesHeight);

    size = randomIntFromInterval(5, 15);

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    div.append(particle);

    await delay(10);

    particle.style.left = xOffset + "px";
    particle.style.top = yOffset + "px";
    particle.style.backgroundColor = "#222222";

    removeParticle(particle);
  }
};

// Background animation emojis
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

const clickEffect = async (item) => {
  let div = document.getElementsByClassName("particles")[0];

  // effect background add emoji
  let effect = document.createElement("div");
  effect.className = "click-effect";
  effect.innerHTML = "+" + proteinAdd;
  effect.style.left = mouseX - 10 + "px";
  effect.style.top = mouseY + 80 + "px";
  div.append(effect);

  await delay(1000);

  effect.remove();
};

const animateBackground = async () => {
  let div = document.getElementsByClassName("container-bg")[0];

  // effect background add emoji
  let img = document.createElement("img");
  img.src = "../media/muscle.webp";
  img.style.transform = "rotate(" + randomIntFromInterval(0, 360) + "deg)";
  widthRandom = randomIntFromInterval(30, 90);
  img.style.width = widthRandom + "px";

  img.style.left = randomIntFromInterval(0, 705) + "px";
  img.style.top = randomIntFromInterval(0, 1073) + "px";
  img.className = "emoji";
  div.append(img);

  await delay(100);

  img.style.opacity = 0;

  await delay(900);
  img.remove();
};

// Protein Per second
const calcPps = () => {
  pps = 0;

  for (const item in products) {
    if (item == "scoop") {
      if (getProductData(item, "shiny") == true) {
        pps += proteinAdd * getProductData(item, "amount") * 2; // If shiny
      } else {
        pps += proteinAdd * getProductData(item, "amount"); // If not shiny
      }
    } else {
      if (getProductData(item, "shiny") == true) {
        pps += getProductData(item, "amount") * getProductData(item, "add") * 2; // If shiny
      } else {
        pps += getProductData(item, "amount") * getProductData(item, "add"); // If not shiny
      }
    }
  }

  return pps;
};

const setMuscle = (size, muscle, number, type, previousSize, minimumSize) => {
  if (type == "width") {
    document.getElementsByClassName(muscle)[number].style.width =
      minimumSize + (totalProtein - previousSize) / size + "px";
  } else if (type == "left") {
    document.getElementsByClassName(muscle)[number].style.left =
      "-" + minimumSize + (totalProtein - previousSize) / size + "px";
  } else if (type == "translatex") {
    document.getElementsByClassName(muscle)[number].style.transform =
      "translatex(" +
      minimumSize +
      (totalProtein - previousSize) / size +
      "px)";
  } else if (type == "-translatex") {
    document.getElementsByClassName(muscle)[number].style.transform =
      "translatex(" +
      "-" +
      minimumSize +
      (totalProtein - previousSize) / size +
      "px)";
  }
};

const updateStickMan = () => {
  if (totalProtein <= 4000) {
    document.getElementsByClassName("chest")[0].style.width =
      5 + totalProtein / 800 + "px";
    document.getElementsByClassName("boven-arm")[0].style.width =
      5 + totalProtein / 800 + "px";
    document.getElementsByClassName("onder-arm")[0].style.width =
      5 + totalProtein / 800 + "px";
    document.getElementsByClassName("boven-arm")[1].style.width =
      5 + totalProtein / 800 + "px";
    document.getElementsByClassName("onder-arm")[1].style.width =
      5 + totalProtein / 800 + "px";
  } else if (totalProtein <= 100000) {
    // left muscles
    setMuscle(4000, "bicep", 0, "width", 4000, 0);
    setMuscle(4000, "bicep", 1, "width", 4000, 0);
    setMuscle(5000, "bicep", 2, "width", 4000, 0);

    setMuscle(7000, "bicep", 1, "translatex", 4000, 0);
    setMuscle(9000, "bicep", 0, "translatex", 4000, 0);

    // left muscles
    setMuscle(5000, "bicep", 0, "left", 4000, 0);
    setMuscle(5000, "bicep", 1, "left", 4000, 0);
    setMuscle(7000, "bicep", 2, "left", 4000, 0);

    // left muscles
    setMuscle(4000, "bicep", 3, "width", 4000, 0);
    setMuscle(4000, "bicep", 4, "width", 4000, 0);
    setMuscle(5000, "bicep", 5, "width", 4000, 0);

    setMuscle(7000, "bicep", 4, "translatex", 4000, 0);
    setMuscle(9000, "bicep", 3, "translatex", 4000, 0);

    // left muscles
    setMuscle(5000, "bicep", 3, "left", 4000, 0);
    setMuscle(5000, "bicep", 4, "left", 4000, 0);
    setMuscle(7000, "bicep", 5, "left", 4000, 0);

    setMuscle(14000, "chest", 0, "width", 4000, 10);
    setMuscle(14000, "onder-arm", 0, "width", 4000, 10);
    setMuscle(14000, "onder-arm", 1, "width", 4000, 10);
    setMuscle(14000, "boven-arm", 0, "width", 4000, 10);
    setMuscle(14000, "boven-arm", 1, "width", 4000, 10);
  }
};

const updateCount = () => {
  updateStickMan();
  proteinPerSecond = calcPps();

  if (protein >= 1000 && protein <= 1000000) {
    r.style.setProperty("--unit", "'kg'");
    document.getElementsByClassName("amount")[0].innerHTML = (
      protein / 1000
    ).toFixed(1);
  } else if (protein >= 1000000) {
    document.getElementsByClassName("amount")[0].innerHTML = (
      protein / 1000000
    ).toFixed(3);
    r.style.setProperty("--unit", "'ton'");
  } else {
    document.getElementsByClassName("amount")[0].innerHTML = protein.toFixed(0);
    r.style.setProperty("--unit", "'g'");
  }

  document.getElementsByClassName("cps-amount")[0].innerHTML =
    formatPrice(proteinPerSecond)[0];
  r.style.setProperty(
    "--unit-ps",
    "'" + formatPrice(proteinPerSecond)[1].toString() + "'"
  );

  if (mouseDown != true) {
    for (const item in products) {
      if (protein >= getProductData(item, "price")) {
        document.getElementById(item).classList.add("enable");
      } else {
        document.getElementById(item).classList.remove("enable");
      }
    }
  }
};

let mouseDown = false;
const mouseDownAnimation = (item) => {
  if (document.getElementById(item).classList.contains("enable")) {
    buyItem(item);
    document.getElementById(item).classList.remove("enable");
    mouseDown = true;
  }
};

const mouseUpAnimation = (item) => {
  mouseDown = false;
  if (protein >= getProductData(item, "price")) {
    document.getElementById(item).classList.add("enable");
  }
};
const updatePrice = (amount) => {
  amount *= 1.1;
  return amount;
};

const setShiny = async (product) => {
  if (!products[product]["shiny"]) {
    products[product]["shiny"] = true;
    document.getElementById(product).classList.add("shiny");
    await delay(50);
    document.documentElement.style.setProperty("--shine", "");
    await delay(50);
    document.documentElement.style.setProperty(
      "--shine",
      "slide 3s linear infinite alternate"
    );
  }
};

const setShupdateProductsiny = () => {
  for (const item in products) {
    let unit = formatPrice(products[item]["price"])[1];
    document.querySelector(`#${item} > div.product-amount`).innerHTML =
      products[item]["amount"];
    document.querySelector(`#${item} > div.cost`).innerHTML =
      formatPrice(products[item]["price"])[0] +
      `<div class="unit">${unit}</div>`;
    if (products[item]["shiny"]) {
      document.getElementById(item).classList.add("shiny");
    } else {
      document.getElementById(item).classList.remove("shiny");
    }
  }
};

const buyItem = (product) => {
  // check if player has enough protein
  if (protein >= getProductData(product, "price")) {
    // small shiny chance
    if (randomIntFromInterval(1, 300) == 1) {
      setShiny(product);
    }

    // check if doesnt have one already (Only add upgrade when at 0)
    for (const item in upgrades) {
      if (item.toString().includes(product)) {
        if (
          products[product]["amount"] ==
          getUpgradeData(item, "unlockAt") - 1
        ) {
          if (getUpgradeData(item, "bought") == false) {
            addUpgrade(item);
          }
        } else if (
          products[product]["amount"] >
          getUpgradeData(item, "unlockAt") - 1
        ) {
          if (getUpgradeData(item, "added") == false) {
            addUpgrade(item);
          }
        }
      }
    }

    protein -= getProductData(product, "price");
    products[product]["price"] = updatePrice(getProductData(product, "price"));
    products[product]["amount"] += 1;

    // get price data
    let unit = formatPrice(getProductData(product, "price"))[1];
    let price = formatPrice(getProductData(product, "price"))[0];

    // display price
    document.querySelector(`#${product} > div.cost`).innerHTML =
      Math.round(price * 10) / 10 + `<div class="unit">${unit}</div>`;

    document.querySelector(`#${product} > div.product-amount`).innerHTML =
      getProductData(product, "amount");
  }

  updateCount();
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

const selectNav = (id, query) => {
  // Remove the "enable" class from all icons
  document.getElementById("gym-icon").classList.remove("enable");
  document.getElementById("upgrade-icon").classList.remove("enable");
  document.getElementById("home-icon").classList.remove("enable");

  // Add the "enable" class to the icon that was clicked
  document.getElementById(id).classList.add("enable");

  // Hide all sections
  document.querySelector("left").style.visibility = "hidden";
  document.querySelector("middle").style.visibility = "hidden";
  document.querySelector("right top").style.visibility = "hidden";
  document.querySelector("left").style.zIndex = "10";
  document.querySelector("middle").style.zIndex = "10";
  document.querySelector("right top").style.zIndex = "10";

  // Show the section that was clicked
  document.querySelector(query).style.visibility = "visible";
  document.querySelector(query).style.zIndex = "11";
};

const changedSetting = (setting) => {
  const chosen = document.getElementById(setting).value;

  if (setting == "effects") {
    effects = chosen;
  } else if (setting == "music") {
    if (chosen == 0) {
      music.volume = "0";
    } else if (chosen == 1) {
      music.volume = "0.05";
    } else if (chosen == 2) {
      music.volume = "0.1";
    } else if (chosen == 3) {
      music.volume = "0.2";
    } else if (chosen == 4) {
      music.volume = "1";
    }
  }
};
