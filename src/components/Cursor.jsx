import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        const onMouseMove = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (dot) {
                dot.style.left = `${posX}px`;
                dot.style.top = `${posY}px`;
            }

            if (outline) {
                outline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef}></div>
            <div className="cursor-outline" ref={outlineRef}></div>
        </>
    );
};

export default Cursor;
