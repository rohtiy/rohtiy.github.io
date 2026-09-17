export function placeInteractiveButton({
    onClick,
    label,
    id = "button",
    size = { width: 280, height: 70 },
    parent,
    options
}) {
    document.getElementById(id)?.remove();

    const button = document.createElement('button');
    button.id = id;
    button.innerText = label;

    Object.assign(button.style, {
        position: 'fixed',              // fixed = truly centered in viewport, unaffected by page scroll
        width: `${size.width}px`,
        height: `${size.height}px`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        overflow: 'hidden',

        // Stargazing theme — deep navy base
        background: 'radial-gradient(circle at 30% 25%, rgb(11, 58, 107) 0%, rgb(3, 33, 68) 55%, rgb(1, 14, 32) 100%)',
        color: '#eaf2ff',
        border: '1px solid rgba(120, 170, 230, 0.4)',
        borderRadius: '18px',
        fontFamily: '-apple-system, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
        fontSize: '18px',
        fontWeight: '600',
        letterSpacing: '0.03em',
        textTransform: 'none',
        cursor: 'pointer',
        boxShadow: `
            0 0 18px rgba(70, 140, 220, 0.35),
            0 6px 20px rgba(0, 10, 25, 0.5),
            inset 0 1px 1px rgba(180, 210, 255, 0.25),
            inset 0 -1px 6px rgba(0, 0, 0, 0.35)
        `,
        textShadow: '0 0 10px rgba(150, 200, 255, 0.7)',
        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.25s ease, filter 0.2s ease',
        outline: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
    });

    // Starfield layer — small twinkling dots scattered across the button
    const starLayer = document.createElement('div');
    Object.assign(starLayer.style, {
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        borderRadius: '18px',
        overflow: 'hidden',
    });

    const starPositions = [
        { top: '15%', left: '12%', size: 2, delay: 0 },
        { top: '28%', left: '82%', size: 1.5, delay: 0.4 },
        { top: '70%', left: '20%', size: 1.5, delay: 0.8 },
        { top: '60%', left: '75%', size: 2, delay: 1.2 },
        { top: '35%', left: '50%', size: 1, delay: 0.2 },
        { top: '80%', left: '55%', size: 1.5, delay: 1.6 },
        { top: '20%', left: '65%', size: 1, delay: 1.0 },
        { top: '50%', left: '8%', size: 1, delay: 0.6 },
    ];

    starPositions.forEach(({ top, left, size, delay }) => {
        const star = document.createElement('span');
        Object.assign(star.style, {
            position: 'absolute',
            top,
            left,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)',
            opacity: '0.85',
            animation: `star-twinkle 2.6s ease-in-out ${delay}s infinite`,
        });
        starLayer.appendChild(star);
    });

    // Inject twinkle keyframes once
    if (!document.getElementById('star-twinkle-keyframes')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'star-twinkle-keyframes';
        styleTag.textContent = `
            @keyframes star-twinkle {
                0%, 100% { opacity: 0.25; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.3); }
            }
        `;
        document.head.appendChild(styleTag);
    }

    button.appendChild(starLayer);

    // Wrap label text in its own span so it layers above the star field
    const labelSpan = document.createElement('span');
    labelSpan.innerText = label;
    labelSpan.style.position = 'relative';
    labelSpan.style.zIndex = '1';
    button.innerText = '';
    button.appendChild(labelSpan);
    button.appendChild(starLayer); // re-append so stars sit behind label but above background

    const setActiveVisual = (active) => {
        if (active) {
            button.style.transform = 'translate(-50%, -50%) scale(0.96)';
            button.style.boxShadow = `
                0 0 24px rgba(90, 160, 240, 0.5),
                0 3px 12px rgba(0, 10, 25, 0.5),
                inset 0 1px 1px rgba(180, 210, 255, 0.3),
                inset 0 -1px 6px rgba(0, 0, 0, 0.4)
            `;
        } else {
            button.style.transform = 'translate(-50%, -50%) scale(1)';
            button.style.boxShadow = `
                0 0 18px rgba(70, 140, 220, 0.35),
                0 6px 20px rgba(0, 10, 25, 0.5),
                inset 0 1px 1px rgba(180, 210, 255, 0.25),
                inset 0 -1px 6px rgba(0, 0, 0, 0.35)
            `;
        }
    };

    // Mouse (desktop)
    button.addEventListener('mouseenter', () => {
        button.style.filter = 'brightness(1.15)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.filter = 'brightness(1)';
        setActiveVisual(false);
    });
    button.addEventListener('mousedown', () => setActiveVisual(true));
    button.addEventListener('mouseup', () => setActiveVisual(false));

    // Touch (mobile/tablet)
    button.addEventListener('touchstart', () => {
        setActiveVisual(true);
    }, { passive: true });
    button.addEventListener('touchend', () => {
        setActiveVisual(false);
    }, { passive: true });
    button.addEventListener('touchcancel', () => {
        setActiveVisual(false);
    }, { passive: true });

    // Keyboard accessibility
    button.addEventListener('focus', () => {
        button.style.boxShadow = `
            0 0 0 3px rgba(120, 180, 255, 0.5),
            0 0 24px rgba(90, 160, 240, 0.5),
            0 6px 20px rgba(0, 10, 25, 0.5)
        `;
    });
    button.addEventListener('blur', () => setActiveVisual(false));

    button.addEventListener('click', onClick, options);
    (parent ?? document.body).appendChild(button);

    return button;
}

export function removeElement({ id = "button", parent, controller }) {
    let element = document.getElementById(id);
    parent ? parent.removeChild(element) : document.body.removeChild(element);
    controller?.abort?.();
}