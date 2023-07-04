import React, { useState, useEffect } from 'react';

const Popup = ({ duration }: { duration: number }) => {
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    return (
        <div className='absolute mx-[38%] sm:my-[10%] z-10 ]'>
            {visible && (
                <div
                    className=" sm:h-[400px] sm:w-[400px] flex flex-col items-center justify-center"
                    style={{
                        background:
                            "",
                    }}
                >
                    <img
                        className="-mt-8 hidden sm:block"
                        src="/gif/success.gif"
                        width={220}
                    ></img>
                    <span className=" text-sm sm:text-2xl text-dtech-main-dark font-bold">
                        {" "}
                        LOG IN{" "}
                    </span>
                    <span className=" text-sm sm:text-2xl text-dtech-main-dark font-bold">
                        SUCCESSFULL!
                    </span>

                </div>
            )}
        </div>
    );
};

export default Popup;