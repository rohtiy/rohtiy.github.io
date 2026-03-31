async function sentRequestToBackend() {
    let pathName = window.location.pathname;
    let params = { 
        method : 'POST',
        headers: { 'Content-Type': 'application/json'},
        body : JSON.stringify({ pathName }) 
    };
    let url = window.APP_CONFIG.APP_URL + "/page"
    let response = await fetch(url, params);
    console.log("Response", response)
}

document.addEventListener('DOMContentLoaded', () => {
    sentRequestToBackend();
})