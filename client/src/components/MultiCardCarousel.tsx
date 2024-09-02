import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { GrNext as Next } from "react-icons/gr";

type Props = {
    itemsPerPage: number
}

const MultiCardCarousel = ({ itemsPerPage }: Props) => {
    const items = [
        { id: 1, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031', alt: 'Image 1' },
        { id: 2, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751', alt: 'Image 2' },
        { id: 3, src: 'https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009', alt: 'Image 3' },
        { id: 4, src: 'https://web.archive.org/web/20240430085128im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/grogu-banner-888x444.jpg?ver=240426211614', alt: 'Image 4' },
        { id: 5, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/mentalhealth-banner2-888x444.jpg?ver=240502181558', alt: 'Image 5' },
        { id: 6, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/doug-banner-888x444.png?ver=240515171102', alt: 'Image 6' },
        { id: 7, src: 'https://web.archive.org/web/20240710205546im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/pacoutpost-banner-888x444.jpg?ver=240710194048', alt: 'Image 7' },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? items.length - itemsPerPage : currentIndex - itemsPerPage
        setCurrentIndex(newIndex)
    }

    const handleNext = () => {
        const newIndex = currentIndex + itemsPerPage >= items.length ? 0 : currentIndex + itemsPerPage
        setCurrentIndex(newIndex)
    }

    return (
        <div className = "tw-px-36 tw-flex tw-flex-col tw-justify-center">
            <div className="tw-relative tw-w-full tw-overflow-hidden tw-rounded-lg">
                {/* 
                    transition translate X based on the (currentIndex / itemsPerPage) * 100. 
                    i.e itemsPerPage = 3, when going from first to second page, currentIndex should become 3
                    3/3 * 100 = 100%
                    when going from second to third page, currentIndex should become 6
                    6/3 * 100 = 200%

                    Adds a negative to the final result (negative percent) so the animation starts from the right and goes to the left

                */}
                <div className="tw-flex tw-transition-transform tw-duration-700 tw-ease-in-out" style={{ transform: `translateX(-${(currentIndex/itemsPerPage) * 100}%)` }}>
                    {items.map((item, index) => (
                        /* 
                            Renders all items, the combination of flex-shrink-0 on each flex item, as well as the width being set to the percent each item takes per page
                            gives the illusion that only a certain amount of items display on each page based on the itemsPerPage.
                        */
                        <div key={item.id} style = {{width: `${1/itemsPerPage*100}%`}} className = "tw-h-full tw-flex-shrink-0 tw-px-2">
                            <img src={item.src} alt={item.alt} className="tw-object-cover tw-w-full tw-h-full tw-rounded-lg" />
                        </div>
                    ))}
                </div>
                <button
                    className="tw-absolute tw-top-1/2 tw-left-4 tw-transform -tw-translate-y-1/2 hover:tw-bg-white hover:tw-opacity-40 tw-bg-white tw-opacity-60 tw-text-gray-800 tw-px-2 tw-py-2 tw-rounded-full tw-cursor-pointer"
                    onClick={handlePrev}
                >
                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
                        <Previous/> 
                    </IconContext.Provider> 
                </button>
                <button
                    className="tw-absolute tw-top-1/2 tw-right-4 tw-transform -tw-translate-y-1/2 hover:tw-bg-white hover:tw-opacity-40 tw-bg-white tw-opacity-60 tw-text-gray-800 tw-px-2 tw-py-2 tw-rounded-full tw-cursor-pointer"
                    onClick={handleNext}
                >
                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
                        <Next/>
                    </IconContext.Provider> 
                </button>
            </div>
            <div className = "tw-p-4 tw-flex tw-items-center tw-justify-center tw-gap-2">
                {
                    /* total amount of indicators is based on items.length / itemsPerPage */
                    Array.from(Array(Math.ceil(items.length/itemsPerPage)), (_, i) => {
                        return (
                            /* 
                            the current page, which is when currentIndex === (i * itemsPerPage), is highlighted
                            i.e currentIndex = 6, and itemsPerPage = 3
                            if i === 2, 2 * 3 = 6, this would be the 3rd page since the 1st page is index 0
                            */
                            <div className = {`tw-transition tw-w-3 tw-h-3 tw-bg-gray-800 tw-rounded-full ${currentIndex === (i * itemsPerPage) ? "tw-p-2" : "tw-bg-opacity-50"}`}></div>
                        )
                    })
                }   
            </div>
        </div>
    )
}

export default MultiCardCarousel