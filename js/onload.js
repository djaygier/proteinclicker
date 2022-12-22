// protein background when clicking effect

let protein = 0
let proteinAdd = 1
let proteinPerSecond = 0
let animationPerSecond = 0
let totalProtein = 1000

const r = document.documentElement;

cookieDataProducts = getCookie("products")
cookieDataUpgrades = getCookie("upgrades")
cookieDataProtein = getCookie("protein")
cookieDataProteinAdd = getCookie("proteinAdd")

let upgrades = ""
let products = ""
let loadedFromSave = false


const d = new Date();
let month = d.getMonth()+1;
let day = d.getDate();


/// Settings
// Audio
const music = new Audio("media/music.mp3");
music.play()
music.volume = 0.1

// Effects
let effects = 2


checkScreenSize()

addEventListener("resize", () => {
    checkScreenSize()
});

if (month == 12) {
    document.getElementsByClassName("hat")[0].style.backgroundImage = "url('../media/santahat.webp')"
}

products = 
{
    "scoop": {name:"Scoop", price:10, amount:0, add:1},
    "chef": {name:"Chef", price:150, amount:0, add:8},
    "chickenfarm": {name:"Chicken farm", price:2500, amount:0, add:50},
    "gym": {name:"Gym", price:10000, amount:0, add:100},
    "pharmacy": {name:"Pharmacy", price:200000, amount:0, add:1500},
    "factory": {name:"Whey Factory", price:1000000, amount:0, add:15000},
    "hospital": {name:"Hospital", price:50000000, amount:0, add:150000},
    "course": {name:"Sell Courses", price:1500000000, amount:0, add:500000},
    "survey": {name:"Make Surveys", price:10000000000, amount:0, add:10000000},
}

upgrades = 
{
    "scoop1": {upgrade:"scoop", price:150, multiplier:2, foto:"scoop.webp", unlockAt: 0, bought:false, added:true},
    "scoop2": {upgrade:"scoop", price:2000, multiplier:3, foto:"scoop.webp", unlockAt: 20, bought:false, added:false},
    "scoop3": {upgrade:"scoop", price:20000, multiplier:4, foto:"scoop.webp", unlockAt: 30, bought:false, added:false},
    "scoop4": {upgrade:"scoop", price:50000, multiplier:2, foto:"scoop.webp", unlockAt: 50, bought:false, added:false},
    "scoop5": {upgrade:"scoop", price:500000, multiplier:3, foto:"scoop.webp", unlockAt: 70, bought:false, added:false},
    "scoop6": {upgrade:"scoop", price:2000000, multiplier:5, foto:"scoop.webp", unlockAt: 100, bought:false, added:false},
    "scoop7": {upgrade:"scoop", price:50000000, multiplier:5, foto:"scoop.webp", unlockAt: 120, bought:false, added:false},
    "scoop8": {upgrade:"scoop", price:200000000, multiplier:2, foto:"scoop.webp", unlockAt: 150, bought:false, added:false},
    
    "chef1": {upgrade:"chef", price:5000, multiplier:2, foto:"banana.webp", unlockAt: 10, bought:false, added:false},
    "chef2": {upgrade:"chef", price:150000, multiplier:2, foto:"pancake.webp", unlockAt: 35, bought:false, added:false},
    "chef3": {upgrade:"chef", price:1000000, multiplier:5, foto:"fish.webp", unlockAt: 70, bought:false, added:false},
    "chef4": {upgrade:"chef", price:10000000, multiplier:5, foto:"avocado.webp", unlockAt: 100, bought:false, added:false},
    "chef5": {upgrade:"chef", price:200000000, multiplier:5, foto:"apple.webp", unlockAt: 150, bought:false, added:false},
    
    "chickenfarm1": {upgrade:"chickenfarm", price:10000, multiplier:2, foto:"corn.webp", unlockAt: 1, bought:false, added:false},
    "chickenfarm2": {upgrade:"chickenfarm", price:50000, multiplier:2, foto:"seeds.webp", unlockAt: 20, bought:false, added:false},
    "chickenfarm3": {upgrade:"chickenfarm", price:500000, multiplier:2, foto:"seeds.webp", unlockAt: 50, bought:false, added:false},
    
    "gym1": {upgrade:"gym", price:50000, multiplier:2, foto:"trainer.webp", unlockAt: 1, bought:false, added:false},
    "gym2": {upgrade:"gym", price:500000, multiplier:2, foto:"trainer.webp", unlockAt: 20, bought:false, added:false},
    "gym3": {upgrade:"gym", price:1500000, multiplier:8, foto:"trainer.webp", unlockAt: 30, bought:false, added:false},
    
    "hospital1": {upgrade:"hospital", price:500000000, multiplier:2, foto:"doctor.webp", unlockAt: 10, bought:false, added:false},

    "course1": {upgrade:"course", price:10000000000, multiplier:2, foto:"tristan.webp", unlockAt: 5, bought:false, added:false},
    "course2": {upgrade:"course", price:50000000000, multiplier:2, foto:"bugatti.webp", unlockAt: 15, bought:false, added:false},
}

if (cookieDataProducts != "") {
    let productsJson = JSON.parse(cookieDataProducts)

    for (const key in productsJson){
        products[key]["amount"] = productsJson[key]["amount"]
        products[key]["price"] = productsJson[key]["price"]
    }

    loadedFromSave = true
}

if (cookieDataUpgrades != "") {

    upgradesJson = JSON.parse(cookieDataUpgrades)

    for (const key in upgradesJson){
        upgrades[key]["bought"] = upgradesJson[key]["bought"]
        upgrades[key]["added"] = upgradesJson[key]["added"]

        if (upgrades[key]["bought"] == true) {
            products[upgrades[key]["upgrade"]]["add"] *= upgrades[key]["multiplier"]
        }
    }

    loadedFromSave = true
}

if (cookieDataProtein != "") {
    protein = parseFloat(cookieDataProtein)
    loadedFromSave = true
}

if (cookieDataProteinAdd != "") {
    proteinAdd = parseFloat(cookieDataProteinAdd)
    loadedFromSave = true
}
