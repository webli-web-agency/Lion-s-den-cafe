import React from 'react';


const CardImageAndDetails = React.memo(({ image, title, description }) => {
  return (
    <div className="w-[70vw] sm:w-[40vw] md:w-[280px] h-[50vh] sm:h-[50vh] md:h-[60vh] bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-300">
      <div className="h-[70%] w-full">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[30%] p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
});

export default CardImageAndDetails;