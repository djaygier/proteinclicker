let userdata = null
async function loginWithGoogle()
{
    firebase.auth()
    .signInWithPopup(provider)
    .then(async(result) =>{
        var user = result.user;
        
        var username = user.displayName;
        var email = user.email;

        setCookie("uid", user.uid)
        setCookie("email", user.email)
        setCookie("username", user.displayName)

        updateProfile(email, username)

        getUserData(user.uid)

        document.getElementById("loginGoogle").innerHTML = "Logout"
        document.getElementById("loginGoogle").setAttribute("onclick", "logout()")
        document.getElementById("save").style.visibility = "visible"

    }).catch((error) => {
        console.log(error)
    });
}

function logout() {

    firebase.auth().signOut().then(() => {
        document.getElementById("loginGoogle").innerHTML = "Login"
        document.getElementById("loginGoogle").setAttribute("onclick", "loginWithGoogle()")
        document.getElementById("save").style.visibility = "hidden"
        setCookie("uid", "")
    }).catch((error) => {
        console.log(error)
    });
}

function updateProfile(email, username) {
    document.querySelector(".email").innerHTML = email
    document.querySelector(".username").innerHTML = username
}

function addUserToDB(email, username, uid) {
    db.collection("users").doc(uid).set({
        email: email,
        username: username,
    })
}

function getUserData(uid, _callback) {
    const docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {

            protein = doc.data()["protein"]
            proteinAdd = doc.data()["proteinAdd"]
            productsData = doc.data()["products"]
            upgradesData = doc.data()["upgrades"]

            if (productsData != "") {
            
                for (const key in productsData){
                    products[key]["amount"] = productsData[key]["amount"]
                    products[key]["price"] = productsData[key]["price"]
                    products[key]["shiny"] = productsData[key]["shiny"]
                }
            }
            
            if (upgradesData != "") {
                for (const key in upgradesData){
                    upgrades[key]["bought"] = upgradesData[key]["bought"]
                    upgrades[key]["added"] = upgradesData[key]["added"]
            
                    if (upgrades[key]["bought"] == true) {
                        products[upgrades[key]["upgrade"]]["add"] *= upgrades[key]["multiplier"]
                    }
                }
            }
            
        } else { // doesn't exist
            addUserToDB(email, username, user.uid)
        }
    })
}

let cooldown = 0
function saveProgress() {
    cooldown = 60
    document.querySelector("#save > img").src = "media/loading.webp"

    db.collection("users").doc(getCookie("uid")).set({
        email: getCookie("email"),
        username: getCookie("username"),
        products: products,
        upgrades: upgrades,
        protein: protein,
        proteinAdd: proteinAdd,
    }).then (() => {
        checkAnimation()
    })

}

async function checkAnimation() {
    document.querySelector("#save > img").src = "media/check.webp"
    await delay(1700)
    document.querySelector("#save > img").src = "media/save.webp"
}