import React, { useState, useEffect } from 'react';

type CarouselElement = {
    id: number 
    imageURL: string
    title: string
}
type Props = {
  items: Array<CarouselElement>
}
const MultiCardCarousel = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < items.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="tw-relative tw-w-full">
      <div className="tw-flex tw-overflow-hidden tw-rounded-lg tw-h-64 md:tw-h-96">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="tw-flex-shrink-0 tw-w-full tw-h-full tw-px-2"
            style={{ width: `${100 / itemsPerPage}%` }}
          >
            <img src={item?.imageURL} alt="" className="tw-object-cover tw-w-full tw-h-full tw-rounded-lg" />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="tw-absolute tw-right-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default MultiCardCarousel;