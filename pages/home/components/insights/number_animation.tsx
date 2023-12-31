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

    return <div className='lg:text-[20px] sm:text-[24px] text-xs'>{Math.floor(currentNumber)}</div>;
};

export default NumberAnimation;