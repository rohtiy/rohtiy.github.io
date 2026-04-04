async function sentRequestToBackend() {
    let pathName = window.location.pathname;
    let params = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pathName }) };
    let url = window.APP_CONFIG.APP_URL + "/page"
    await fetch(url, params);
}

document.addEventListener('DOMContentLoaded', () => { sentRequestToBackend(); });