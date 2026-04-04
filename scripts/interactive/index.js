
export function placeInteractiveButton({ onClick, label, id = "button", size = { width: 300, height: 100 }, position = { top: (window.innerHeight) / 2, right: (window.innerWidth) / 2 }, parent, options }) {
    let button = document.createElement('button');
    button.id = id;
    button.innerText = label;
    button.style.position = 'absolute';
    button.style.width = size.width;
    button.style.height = size.height;
    button.style.top = `${position.top}px`;
    button.style.right = `${position.right}px`;
    button.style.zIndex = 3;
    button.addEventListener('click', onClick, options);
    if (!parent) {
        document.body.appendChild(button);
    }
    else {
        parent.appendChild(button);
    }
}

export function removeElement({ id = "button", parent, controller }) {
    let element = document.getElementById(id);
    parent ? parent.removeChild(element) : document.body.removeChild(element);
    controller?.abort?.();
}