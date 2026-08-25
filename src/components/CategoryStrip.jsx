import React from 'react';

export default function CategoryStrip() {
  const items = [
    { label: 'Rakhi', img: '/images/home/image1.png' },
    { label: 'Same Day', img: '/images/home/image2.png' },
    { label: 'Flowers', img: '/images/home/image3.png' },
    { label: 'Cakes', img: '/images/home/image4.png' },
    { label: 'Personalised', img: '/images/home/image5.png' },
    { label: 'Plants', img: '/images/home/image6.png' },
    { label: 'Chocolates', img: '/images/home/image7.png' },
    { label: 'Hampers', img: '/images/home/image8.png' },
    { label: 'Balloon Decor', img: '/images/home/image9.png' },
    { label: 'Trendy Gifts', img: '/images/home/image10.png' },
    { label: 'LUXE Gifts', img: '/images/home/image11.png' }
  ];

  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive grid for desktop, flex-scroll for mobile to prevent illustration clipping */}
        <div className="lg:grid lg:grid-cols-11 flex items-center overflow-x-auto gap-4 lg:gap-1 scrollbar-none pb-4">
          {items.map((item) => (
            <a
              href="#"
              key={item.label}
              className="flex flex-col items-center text-center group cursor-pointer flex-shrink-0"
            >
              {/* Category Illustration Container - Enlarged and optimized for wide/horizontal illustrations */}
              <div className="h-20 w-24 md:h-24 md:w-28 flex items-center justify-center group-hover:scale-108 transition-all duration-300">
                <img
                  src={item.img}
                  alt={item.label}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* Category Label */}
              <span className="text-[12px] md:text-[14px] font-bold text-gray-800 mt-3 font-sans group-hover:text-olive-600 transition-colors">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
