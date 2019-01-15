function showRegisterForm() {

    var reg = document.getElementById("reg");
    var log = document.getElementById("log");
    if (reg.style.display === "none") {
        reg.style.display = "block";
        log.style.display = "none";
    } else {
        reg.style.display = "none";
        log.style.display = "block";
    }
}

function showLoginForm() {

    var reg = document.getElementById("reg");
    var log = document.getElementById("log");
    if (log.style.display === "none") {
        log.style.display = "block";
        reg.style.display = "none";
    } else {
        log.style.display = "none";
        reg.style.display = "block";
    }
}

