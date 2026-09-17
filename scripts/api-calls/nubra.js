const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getAndDisplayMessage() {
    const url = window.APP_CONFIG.APP_URL + "/nubra";

    const params = { method: 'GET' };

    await delay(10000);

    let finalResponse;
    try {
        let response = await fetch(url, params);
        finalResponse = await response.json();
    } catch (error) {
        console.error("Error fetching message:", error);
        return;
    }

    if (!finalResponse?.title) {
        return;
    }

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

//document.addEventListener('DOMContentLoaded', () => { getAndDisplayMessage(); });