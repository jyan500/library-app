import React, { useState } from 'react';
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { GrNext as Next } from "react-icons/gr";

type Props = {
	data: Array<Array<React.ReactNode>>
	numPerPage: number
	total: number
}

export const TestCarousel = ({data, numPerPage, total}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const items = [
    //     { id: 1, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031', alt: 'Image 1' },
    //     { id: 2, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751', alt: 'Image 2' },
    //     { id: 3, src: 'https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009', alt: 'Image 3' },
    // ];

    const handlePrev = () => {
        const newIndex = (currentIndex === 0) ? data.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentIndex === data.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className = "tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-max-w-3xl tw-relative tw-overflow-hidden tw-rounded-lg">
                <div className="tw-relative tw-flex tw-flex-row tw-transition-transform tw-duration-500 tw-ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {data.map((nodeArray: Array<React.ReactNode>) => {
                        return (
                            // <div className = {`tw-relative ${numPerPage > 1 ? "tw-px-2" : ""}`} style={{width: numPerPage > 1 ? `${100/numPerPage}%` : "100%"}}>
                            //     {
                            //         nodeArray.map((element) => {
                            //             return element
                            //         })
                            //     } 
                            // </div>
                            <>
                                {
                                    nodeArray.map((element) => {
                                        return element
                                    })
                                } 
                            </>
                        )
                    })}
                </div>
                <div className = "tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-between tw-p-4">
                    <button
                    className="hover:tw-bg-white hover:tw-opacity-40 tw-bg-white tw-opacity-60 tw-text-gray-800 tw-px-2 tw-py-2 tw-rounded-full tw-cursor-pointer"
                    onClick={handlePrev}
                    >
                        <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
                            <Previous/>	
                        </IconContext.Provider>	
                    </button>
                    <button
                    className="hover:tw-bg-white hover:tw-opacity-40 tw-bg-white tw-opacity-60 tw-text-gray-800 tw-px-2 tw-py-2 tw-rounded-full tw-cursor-pointer"
                    onClick={handleNext}
                    >
                        <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
                            <Next/>
                        </IconContext.Provider>	
                    </button>
                </div>
            </div>
            <div className = "tw-p-4 tw-flex tw-items-center tw-justify-center tw-gap-2">
                {
                    Array.from(Array(total), (_, i) => {
                        return (
                            <div className = {`tw-transition tw-w-3 tw-h-3 tw-bg-gray-800 tw-rounded-full ${currentIndex === i ? "tw-p-2" : "tw-bg-opacity-50"}`}></div>
                        )
                    })
                }   
            </div>      
        </div>
    );
};

