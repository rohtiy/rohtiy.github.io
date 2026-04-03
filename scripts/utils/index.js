export function toggleFullScreen() {
    if (!document?.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen?.();
    }
}