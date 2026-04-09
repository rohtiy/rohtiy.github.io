// adding this here as a memory, this was implemented at start of my career, just small something I made.

toggleOn = false
function move(e) {
    toggleOn = !toggleOn
    if (toggleOn) {
        document.getElementById("sw").style.transform = "translate(50px)"
        document.getElementById("sw").style.transitionDuration = "100ms"
        document.getElementById("sw").style.boxShadow = "0px 1px 2px 1px grey"
        document.getElementById("bg").style.backgroundColor = "#53d769"
        document.getElementById("bg").style.transitionDelay = "100ms"
        document.getElementsByTagName("body")[0].style.backgroundColor = "black"
    }
    else {
        document.getElementById("bg").style.backgroundColor = "grey"
        document.getElementById("bg").style.transitionDelay = "0ms"
        document.getElementById("sw").style.boxShadow = "0px 1px 1px 1px grey"
        document.getElementById("sw").style.transform = "translate(0px)"
        document.getElementById("sw").style.transitionDuration = "100ms"
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"
    }
}