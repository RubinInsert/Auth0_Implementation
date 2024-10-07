var user;
fetch("/api/profile/").then(data => data.json()).then(data => {
    document.getElementById("login-identity").innerText = data.nickname;
    user = data;
}).catch((err) => {
    console.log("User not logged in.")
});