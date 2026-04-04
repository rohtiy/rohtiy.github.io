export function toggleFullScreen(element) {
    if (!document?.fullscreenElement) {
        element.requestFullscreen();
    } else {
        document.exitFullscreen?.();
    }
}