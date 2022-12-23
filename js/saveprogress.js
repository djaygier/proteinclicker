function saveFile() {
    allCookies = 
    [
        getCookie("products"),
        getCookie("upgrades"),
        getCookie("protein"),
        getCookie("proteinAdd"),
    ]

    download("saveFile", JSON.stringify(allCookies))
}

function onLoadSave() {
    document.getElementById('input').addEventListener('change', getFile)
}

function getFile(event) {
	const input = event.target
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => 
        {
            cookieList = JSON.parse(content)

            cookieDataProducts = cookieList[0]
            cookieDataUpgrades = cookieList[1]
            cookieDataProtein = cookieList[2]
            cookieDataProteinAdd = cookieList[3]

            if (cookieDataProducts != "") {
                let productsJson = JSON.parse(cookieDataProducts)
            
                for (const key in productsJson){
                    products[key]["amount"] = productsJson[key]["amount"]
                    products[key]["price"] = productsJson[key]["price"]
                    products[key]["shiny"] = productsJson[key]["shiny"]
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

            updateCount()
            updatePrice()
            updateProducts()
        })
    }
}

function readFileContent(file) {
	const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.readAsText(file)
    })
}