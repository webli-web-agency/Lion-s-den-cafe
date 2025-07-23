import React from 'react'

const CardImageAndDetails = ({ image, title, description }) => {
  return (
    <div className="w-[250px] h-[60vh] lg:w-[250px] lg:h-[60vh] md:w-[200px] md:h-[50vh] w-[80vw] h-[45vh] bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-300">
      <div className="h-[70%] w-full">
        <img
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
}

export default CardImageAndDetails
