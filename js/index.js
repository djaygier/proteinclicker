function addEvent(item) {
    document.getElementById(item).setAttribute("onmousedown", "mouseDownAnimation('" + item + "')")
    document.getElementById(item).setAttribute("onmouseup", "mouseUpAnimation('" + item + "')")
    document.getElementById(item).setAttribute("onmouseleave", "mouseUpAnimation('" + item + "')")
}

function upgradeItem(item) {
    if (protein >= upgrades[item]["price"]) {
        if (upgrades[item]["upgrade"] == "scoop") {
            // CURSOR UPGRADE
            proteinAdd *= upgrades[item]["multiplier"]
    
        } else {

            // PRODUCT UPGRADES
            products[upgrades[item]["upgrade"]]["add"] *= upgrades[item]["multiplier"]

        }

        protein -= upgrades[item]["price"]
        document.getElementById(item).remove()
        upgrades[item]["bought"] = true
        updateCount()
        updatePrice()
    }
}

// RIGHT FORMAT OF PRICE, WITH UNIT

function formatPrice(price) {

    let unit = "g"

    if (price >= 1000 && price < 1000000) {
        price /= 1000
        price = price.toFixed(1)
        unit = "kg"
    } else if (price >= 1000000) {
        price /= 1000000
        price = price.toFixed(3)
        unit = "ton"
    }

    return [price, unit]

}


// ADD UPGRADE ELEMENT

function addUpgrade(item) {

    upgrades[item]["added"] = true

    var div = document.querySelector("bottom")
            
    var upgrade = document.createElement("upgrade")
    upgrade.setAttribute("onclick", `upgradeItem('${item}')`)
    upgrade.id = item
    div.append(upgrade)

    var price = document.createElement("div")
    price.className = "price"

    var priceAmount = getUpgradeData(item, "price")
    var formatedPrice = formatPrice(priceAmount)
    price.innerHTML = parseFloat(formatedPrice[0]).toFixed(0)
    upgrade.append(price)

    var unit = document.createElement("div")
    unit.className = "unit"
    unit.innerHTML = formatedPrice[1]
    price.append(unit)

    var info = document.createElement("div")
    info.className = "info"
    info.innerHTML = getUpgradeData(item, "upgrade")
    upgrade.append(info)

    var multiplier = document.createElement("div")
    multiplier.className = "multiplier"
    multiplier.innerHTML = getUpgradeData(item, "multiplier") + "X"
    upgrade.append(multiplier)

    var image = document.createElement("img")
    image.src = "media/" + getUpgradeData(item, "foto")
    upgrade.append(image)
}

// A ASYNC LOADED FUNCTION
async function loaded() {
    // ADD ALL UPGRADES ELEMENTS FOR START
    for (const item in upgrades) { 
        if (getUpgradeData(item, "added") == true) {
            if (getUpgradeData(item, "bought") == false) {
                addUpgrade(item)
            }
        }
    }

    // ADD ALL PRODUCTS ELEMENTS
    for (const item in products) {
        var div = document.querySelector("right top")

        var product = document.createElement("product")
        product.id = item
        div.append(product)

        var img = document.createElement("img")
        img.alt = item
        img.src = "media/" + item + ".webp"
        product.append(img)

        var title = document.createElement("div")
        title.className = "title"
        title.innerHTML = getProductData(item, "name")
        product.append(title)

        var price = document.createElement("div")
        price.className = "cost"
        price.innerHTML = Math.round(formatPrice(getProductData(item, "price"))[0] * 10) / 10
        product.append(price)

        var unit = document.createElement("div")
        unit.className = "unit"
        unit.innerHTML = formatPrice(getProductData(item, "price"))[1]
        price.append(unit)

        var amount = document.createElement("div")
        amount.className = "product-amount"
        amount.innerHTML = getProductData(item, "amount")
        product.append(amount)
    }

    for (const item in products) {
        addEvent(item)
    }

    while (1) {
        await delay(20)
        protein += (proteinAdd*getProductData("scoop", "amount"))/50
        totalProtein += (proteinAdd*getProductData("scoop", "amount"))/50

        for (const item in products) {
            if (item != "scoop") {
                protein += (getProductData(item, "amount") * getProductData(item, "add"))/50
                totalProtein += (getProductData(item, "amount")  * getProductData(item, "add"))/50
            }
        }
        
        updateCount()
    }
}

async function cookiesLoop() {
    while(1) {
        saveCookies()
        await delay(100)
    }

}

function saveCookies() {
    setCookie("products", JSON.stringify(products))
    setCookie("upgrades", JSON.stringify(upgrades))
    setCookie("protein", protein.toFixed(0).toString())
    setCookie("proteinAdd", proteinAdd.toString())
}

firstClick = false
async function clickProtein() {

    if (firstClick == false) {
        music.play()
        firstClick = true
    }

    protein += proteinAdd
    totalProtein += proteinAdd
    document.getElementById("clicker").style.animation = ""
    await delay(20)
    document.getElementById("clicker").style.animation = "shakeProtein 0.2s"

    
    updateCount()

    // Effects Low
    if (effects >= 1) {
        clickEffect()
    }

    // Effects Medium (Default)
    if (effects >= 2) {
        animateBackground()
        animateParticles()
    }

    // Effects High
    if (effects >= 3) {
        animateBackground()
        animateParticles()
    }

    // Effects Ultra high
    if (effects >= 4) {
        animateBackground()
        animateParticles()
    }
}

async function removeParticle(el) {
    await delay(500)
    el.remove()
}

async function animateParticles() {
    for (var i=1;i<=5; i++) {
        var div = document.getElementsByClassName("particles")[0]
        var particle = document.createElement("div")

        particle.className = "particle"

        particlesWidth = document.getElementsByClassName("particles")[0].offsetWidth
        particlesHeight = document.getElementsByClassName("particles")[0].offsetHeight

        xOffset = randomIntFromInterval(0, particlesWidth)
        yOffset = randomIntFromInterval(0, particlesHeight)

        size = randomIntFromInterval(5, 15)

        particle.style.width = size + "px"
        particle.style.height = size + "px"

        div.append(particle)

        await delay(10)

        particle.style.left = xOffset + "px"
        particle.style.top = yOffset + "px"
        particle.style.backgroundColor = "#222222"

        removeParticle(particle)
    }
}

// Background animation emojis
let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', (event) => {
	mouseX = event.clientX
	mouseY = event.clientY
});

async function clickEffect() {

    var div = document.getElementsByClassName("particles")[0]

    // effect background add emoji
    var effect = document.createElement("div")
    effect.className = "click-effect"
    effect.innerHTML = "+" + proteinAdd
    effect.style.left = mouseX-10 + "px"
    effect.style.top = mouseY+80 + "px"
    div.append(effect)
    
    await delay(1000)

    effect.remove()
}



async function animateBackground() {
    var div = document.getElementsByClassName("container-bg")[0]

    // effect background add emoji
    var img = document.createElement("img")
    img.src = "../media/muscle.webp"
    img.style.transform = "rotate(" + randomIntFromInterval(0, 360) + "deg)"
    widthRandom = randomIntFromInterval(30, 90)
    img.style.width = widthRandom + "px"

    img.style.left = randomIntFromInterval(0, 705) + "px"
    img.style.top = randomIntFromInterval(0, 1073) + "px"
    img.className = "emoji"
    div.append(img)


    await delay(100)
    
    img.style.opacity = 0

    await delay(900)
    img.remove()
}

// Protein Per second
function calcPps() {
    pps = 0

    for (const item in products) {
        if (item == "scoop") {
            pps += proteinAdd * getProductData(item, "amount")
        } else {
            pps += getProductData(item, "amount") * getProductData(item, "add")
        }
    }

    return pps
}

function setMuscle(size, muscle, number, type, previousSize, minimumSize) {

    if (type == "width") {
        document.getElementsByClassName(muscle)[number].style.width = minimumSize + ((totalProtein-previousSize)/size) + "px";
    
    } else if (type == "left") {
        document.getElementsByClassName(muscle)[number].style.left = "-" + minimumSize + ((totalProtein-previousSize)/size) + "px";
    
    } else if (type == "translatex") {
    document.getElementsByClassName(muscle)[number].style.transform = "translatex(" + minimumSize + ((totalProtein-previousSize)/size) + "px)";
    
    } else if (type == "-translatex") {
        document.getElementsByClassName(muscle)[number].style.transform = "translatex(" + "-" + minimumSize + ((totalProtein-previousSize)/size) + "px)";
    }

}




function updateStickMan() {

    if(totalProtein <= 4000) {
        document.getElementsByClassName('chest')[0].style.width = 5+ (totalProtein/800) + "px"
        document.getElementsByClassName('boven-arm')[0].style.width = 5+ (totalProtein/800) + "px"
        document.getElementsByClassName('onder-arm')[0].style.width = 5+ (totalProtein/800) + "px"
        document.getElementsByClassName('boven-arm')[1].style.width = 5+ (totalProtein/800) + "px"
        document.getElementsByClassName('onder-arm')[1].style.width = 5+ (totalProtein/800) + "px"
    } else if (totalProtein <= 100000) { 

        // left muscles
        setMuscle(4000, 'bicep', 0, 'width', 4000, 0)
        setMuscle(4000, 'bicep', 1, 'width', 4000, 0)
        setMuscle(5000, 'bicep', 2, 'width', 4000, 0)

        setMuscle(7000, 'bicep', 1, 'translatex', 4000, 0)
        setMuscle(9000, 'bicep', 0, 'translatex', 4000, 0)

        // left muscles
        setMuscle(5000, 'bicep', 0, 'left', 4000, 0)
        setMuscle(5000, 'bicep', 1, 'left', 4000, 0)
        setMuscle(7000, 'bicep', 2, 'left', 4000, 0)

        // left muscles
        setMuscle(4000, 'bicep', 3, 'width', 4000, 0)
        setMuscle(4000, 'bicep', 4, 'width', 4000, 0)
        setMuscle(5000, 'bicep', 5, 'width', 4000, 0)

        setMuscle(7000, 'bicep', 4, 'translatex', 4000, 0)
        setMuscle(9000, 'bicep', 3, 'translatex', 4000, 0)

        // left muscles
        setMuscle(5000, 'bicep', 3, 'left', 4000, 0)
        setMuscle(5000, 'bicep', 4, 'left', 4000, 0)
        setMuscle(7000, 'bicep', 5, 'left', 4000, 0)

        setMuscle(14000, 'chest', 0, 'width', 4000, 10)
        setMuscle(14000, 'onder-arm', 0, 'width', 4000, 10)
        setMuscle(14000, 'onder-arm', 1, 'width', 4000, 10)
        setMuscle(14000, 'boven-arm', 0, 'width', 4000, 10)
        setMuscle(14000, 'boven-arm', 1, 'width', 4000, 10)
    }
}


function updateCount() {
    updateStickMan()
    proteinPerSecond = calcPps()


    if (protein >= 1000 && protein <= 1000000) {

        r.style.setProperty('--unit', "'kg'");
        document.getElementsByClassName("amount")[0].innerHTML = (protein/1000).toFixed(1)
    } else if (protein >= 1000000) {
        document.getElementsByClassName("amount")[0].innerHTML = (protein/1000000).toFixed(3)
        r.style.setProperty('--unit', "'ton'");
    } else {
        document.getElementsByClassName("amount")[0].innerHTML = (protein).toFixed(0)
        r.style.setProperty('--unit', "'g'");
    }


    document.getElementsByClassName("cps-amount")[0].innerHTML = formatPrice(proteinPerSecond)[0]
    r.style.setProperty('--unit-ps', "'" + formatPrice(proteinPerSecond)[1].toString() + "'");
    
    if (mouseDown != true) {
        for (const item in products) {
            if (protein >= getProductData(item,"price")) {
                document.getElementById(item).classList.add("enable")
            } else {
                document.getElementById(item).classList.remove("enable")
            }
        }
    }
}

let mouseDown = false
function mouseDownAnimation(item) {
    if (document.getElementById(item).classList.contains("enable")) {
        buyItem(item)
        document.getElementById(item).classList.remove("enable")
        mouseDown = true
    }
}

function mouseUpAnimation(item) {
    mouseDown = false
    if (protein >= getProductData(item,"price")) {
        document.getElementById(item).classList.add("enable")
    }
}

function updatePrice(amount) {
    amount *= 1.1
    return amount
}


function buyItem(product) {

    // check if player has enough protein
    if (protein >= getProductData(product,"price")) {

        // check if doesnt have one already (Only add upgrade when at 0)

        for (const item in upgrades) {
            if (item.toString().includes(product)) {
                if (products[product]["amount"] == getUpgradeData(item, "unlockAt")-1) {
                    if(getUpgradeData(item, "bought") == false) {
                        addUpgrade(item)
                    }
                } else if (products[product]["amount"] > getUpgradeData(item, "unlockAt")-1) {
                    if(getUpgradeData(item, "added") == false) {
                        addUpgrade(item)
                    }
                }
            }
        }

        protein -= getProductData(product,"price")
        products[product]["price"] = updatePrice(getProductData(product,"price"))
        products[product]["amount"] += 1

        // get price data
        let unit = formatPrice(getProductData(product,"price"))[1]
        let price = formatPrice(getProductData(product,"price"))[0]
        
        // display price
        document.querySelector(`#${product} > div.cost`).innerHTML = Math.round(price *10) /10 + `<div class="unit">${unit}</div>`

        document.querySelector(`#${product} > div.product-amount`).innerHTML = getProductData(product, "amount")
    }

    updateCount()
}

async function enablePhone() {
    selectNav('home-icon', 'left')
    document.querySelector("left").style.width = "100%"
    document.querySelector("left").style.visibility = "visible"
    document.querySelector("middle").style.visibility = "hidden"
    document.querySelector("right top").style.visibility = "hidden"
    document.querySelector("right bottom").style.visibility = "hidden"
}

async function disablePhone() {
    document.querySelector("left").setAttribute("style", "")
    document.querySelector("left").style.visibility = "visible"
    document.querySelector("middle").style.visibility = "visible"
    document.querySelector("right top").style.visibility = "visible"
    document.querySelector("right bottom").style.visibility = "visible"
}

function checkScreenSize() {
    const screenWidth = screen.width

    if (screenWidth <= 1280) {
        enablePhone()
        document.getElementById("phone").href = "css/phone.css"
        document.querySelector("nav").style.visibility = "visible"
    } else {
        disablePhone()
        document.getElementById("phone").href = ""
        document.querySelector("nav").style.visibility = "hidden"
    }

    // particle pos
    const width = document.querySelector("left").offsetWidth
    const height = document.querySelector("left").offsetHeight

    document.documentElement.style.setProperty('--particle-pos-top', height/2 + "px");
    document.documentElement.style.setProperty('--particle-pos-left', width/2 + "px");
}

function selectNav(id, query) {

    // Remove the "enable" class from all icons
    document.getElementById("gym-icon").classList.remove("enable")
    document.getElementById("upgrade-icon").classList.remove("enable")
    document.getElementById("home-icon").classList.remove("enable")

    // Add the "enable" class to the icon that was clicked
    document.getElementById(id).classList.add("enable")

    // Hide all sections
    document.querySelector("left").style.visibility = "hidden"
    document.querySelector("middle").style.visibility = "hidden"
    document.querySelector("right top").style.visibility = "hidden"
    document.querySelector("left").style.zIndex = "10"
    document.querySelector("middle").style.zIndex = "10"
    document.querySelector("right top").style.zIndex = "10"

    // Show the section that was clicked
    document.querySelector(query).style.visibility = "visible"
    document.querySelector(query).style.zIndex = "11"
}

function changedSetting(setting) {
    const chosen = document.getElementById(setting).value

    if (setting == "effects") {
        effects = chosen
    } else if (setting == "music") {
        if (chosen == 0) {
            music.volume = "0"
        } else if (chosen == 1) {
            music.volume = "0.05"
        } else if (chosen == 2) {
            music.volume = "0.1"
        } else if (chosen == 3) {
            music.volume = "0.2"
        } else if (chosen == 4) {
            music.volume = "1"
        }
    }
}