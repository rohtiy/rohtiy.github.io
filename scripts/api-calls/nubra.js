const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getAndDisplayMessage() {
    const path = "/nubra";
    const url = window.APP_CONFIG.APP_URL + path;
    const fallback =  window.APP_CONFIG.FALLBACK_URL + path;

    let finalResponse = await fetchMessage(url);

    if (!finalResponse?.title) {
        finalResponse = await fetchMessage(fallback);
    }

    if(!finalResponse?.title){
        return;
    }

    await delay(10000);

    document.title = finalResponse.title;

    let title = document.createElement('h1');
    let messageDiv = document.createElement('div');

    title.innerText = finalResponse.title;
    title.style.position = 'absolute';
    title.style.top = '100px';
    title.style.left = '50%';
    title.style.transform = 'translateX(-50%)';
    title.style.color = 'white';
    title.style.textAlign = 'center';
    title.style.opacity = '0';
    title.style.transition = 'opacity 1s ease-in-out';

    messageDiv.innerText = '';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '200px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.color = 'white';
    messageDiv.style.textAlign = 'center';

    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '200px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.color = 'white';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.width = '80%'; // Prevent it from stretching edge-to-edge
    messageDiv.style.maxWidth = '600px';

    // 2. Make it scrollable and constrain its height so it fits on screen
    messageDiv.style.overflowY = 'auto';
    messageDiv.style.maxHeight = 'calc(100vh - 250px)'; // 100vh is full screen height, minus 250px for the top spacing
    // 3. Apply the hidden scrollbar class
    messageDiv.classList.add('no-scrollbar');

    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 1s ease-in-out 2s';

    const paragraphs = finalResponse.message.split('\n');

    paragraphs.forEach(text => {
        let p = document.createElement('p');
        p.innerText = text;
        p.style.marginBottom = '15px';
        p.style.lineHeight = '1.6';
        messageDiv.appendChild(p);
    });

    document.body.appendChild(title);
    document.body.appendChild(messageDiv);

    requestAnimationFrame(() => {
        title.style.opacity = '1';
        messageDiv.style.opacity = '1';
    });
}

async function fetchMessage(url) {
    const params = { method: 'GET' };
    try {
        let response = await fetch(url, params);
        finalResponse = await response.json();
        return finalResponse;
    } catch (error) {
        console.error("Error fetching message:", error);
        return {};
    }
}

//document.addEventListener('DOMContentLoaded', () => { getAndDisplayMessage(); });