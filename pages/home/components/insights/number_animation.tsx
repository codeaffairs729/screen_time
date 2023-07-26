import React, { useState, useEffect } from 'react';

const NumberAnimation = ({ targetNumber=0, duration }: { targetNumber: number, duration: number }) => {
    const [currentNumber, setCurrentNumber] = useState(0);
    const steps = 100;
    const increment = targetNumber / steps;

    useEffect(() => {
        let animationFrame:any;
        let frameCount = 0;

        const updateNumber = () => {
            if (frameCount < steps) {
                setCurrentNumber((prevNumber) => prevNumber + increment);
                frameCount++;
                animationFrame = requestAnimationFrame(updateNumber);
            } else {
                setCurrentNumber(targetNumber);
            }
        };

        animationFrame = requestAnimationFrame(updateNumber);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [targetNumber]);

    return <div className=' sm:text-3xl text-sm'>{Math.floor(currentNumber)}</div>;
};

export default NumberAnimation;