import React, { useState } from 'react';

const Carousel = () => {
    const items = [
        { id: 1, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031', alt: 'Image 1' },
        { id: 2, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751', alt: 'Image 2' },
        { id: 3, src: 'https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009', alt: 'Image 3' },
        { id: 4, src: 'https://web.archive.org/web/20240430085128im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/grogu-banner-888x444.jpg?ver=240426211614', alt: 'Image 4' },
        { id: 5, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/mentalhealth-banner2-888x444.jpg?ver=240502181558', alt: 'Image 5' },
        { id: 6, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/doug-banner-888x444.png?ver=240515171102', alt: 'Image 6' },
        { id: 7, src: 'https://web.archive.org/web/20240710205546im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/pacoutpost-banner-888x444.jpg?ver=240710194048', alt: 'Image 7' },
    ]


  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className = "tw-px-36 tw-flex tw-justify-center">
        <div className="tw-max-w-[800px] tw-max-h-[600px] tw-w-full tw-h-full tw-relative tw-overflow-hidden tw-rounded-lg">
          <div
            className="tw-flex tw-transition-transform tw-duration-700 tw-ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="tw-flex-shrink-0 tw-w-full tw-h-full">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="tw-object-cover tw-w-full tw-h-full"
                  />
              </div>
            ))}
          </div>
          <button
            className="tw-absolute tw-top-1/2 tw-left-4 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="tw-absolute tw-top-1/2 tw-right-4 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default Carousel;

// import React, { useState } from 'react';

// const Carousel = () => {
//    const items = [
//         { id: 1, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031', alt: 'Image 1' },
//         { id: 2, src: 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751', alt: 'Image 2' },
//         { id: 3, src: 'https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009', alt: 'Image 3' },
//         { id: 4, src: 'https://web.archive.org/web/20240430085128im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/grogu-banner-888x444.jpg?ver=240426211614', alt: 'Image 4' },
//         { id: 5, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/mentalhealth-banner2-888x444.jpg?ver=240502181558', alt: 'Image 5' },
//         { id: 6, src: 'https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/doug-banner-888x444.png?ver=240515171102', alt: 'Image 6' },
//         { id: 7, src: 'https://web.archive.org/web/20240710205546im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/pacoutpost-banner-888x444.jpg?ver=240710194048', alt: 'Image 7' },
//     ]


//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
//   };

//   return (
//     <div className="tw-relative tw-max-w-[700px] tw-max-h-[400px] tw-w-full tw-h-full tw-overflow-hidden tw-rounded-lg tw-shadow-lg">
//       <div
//         className="tw-flex tw-transition-transform tw-duration-700 tw-ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {items.map((item) => (
//           <div key={item.id} className="tw-flex-shrink-0 tw-w-full tw-h-full">
//             <img
//               src={item.src}
//               alt={item.alt}
//               className="tw-w-full tw-h-full tw-object-cover"
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handlePrev}
//         className="tw-absolute tw-top-1/2 tw-left-4 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
//       >
//         Prev
//       </button>
//       <button
//         onClick={handleNext}
//         className="tw-absolute tw-top-1/2 tw-right-4 tw-transform -tw-translate-y-1/2 tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Carousel;