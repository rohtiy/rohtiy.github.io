export function toggleFullScreen(element) {
    if (!document?.fullscreenElement) {
        element.requestFullscreen();
    } else {
        document.exitFullscreen?.();
    }
}

export function getRandomPositionOnCanvas(canvas) {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    }
}
