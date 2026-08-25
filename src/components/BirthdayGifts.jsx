import React from 'react';

/* ── Birthday Product Cards Data ─────────────────────────── */
const products = [
  { id: 1, label: 'Flowers',      img: '/images/home/bday_card_1.png' },
  { id: 2, label: 'Cakes',        img: '/images/home/bday_card_2.png' },
  { id: 3, label: 'Personalised', img: '/images/home/bday_card_3.png' },
  { id: 4, label: 'Plants',       img: '/images/home/bday_card_4.png' },
  { id: 5, label: 'Hampers',      img: '/images/home/bday_card_5.png' },
];

export default function BirthdayGifts() {
  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero Banner ── */}
        <div
          className="relative w-full rounded-[20px] overflow-hidden mb-6"
          style={{
            background: 'linear-gradient(120deg, #e8583a 0%, #d4472a 40%, #c23c22 100%)',
            minHeight: '200px',
          }}
        >
          {/* Leaf / greenery decoration — top left */}
          <div
            className="absolute -top-4 -left-4 text-[80px] select-none pointer-events-none"
            style={{ transform: 'rotate(-20deg)', opacity: 0.9 }}
          >
            🌿
          </div>
          <div
            className="absolute top-0 left-10 text-[60px] select-none pointer-events-none"
            style={{ transform: 'rotate(10deg)', opacity: 0.7 }}
          >
            🍃
          </div>

          {/* Confetti / sparkle dots */}
          {[
            { top: '18%', left: '38%', size: '8px', color: '#ffd700' },
            { top: '60%', left: '42%', size: '6px', color: '#ffffff' },
            { top: '30%', left: '55%', size: '5px', color: '#ffd700' },
            { top: '72%', left: '60%', size: '7px', color: '#ffffff' },
            { top: '15%', left: '65%', size: '9px', color: '#ffd700' },
            { top: '50%', left: '72%', size: '5px', color: '#ffffff' },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                top: dot.top, left: dot.left,
                width: dot.size, height: dot.size,
                backgroundColor: dot.color, opacity: 0.8,
              }}
            />
          ))}

          {/* Left — headline text */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 max-w-[38%]">
            <p className="text-white font-sans font-normal text-2xl sm:text-3xl leading-snug drop-shadow">
              Joyful Gifts To
            </p>
            <p className="text-white font-sans font-extrabold text-2xl sm:text-3xl leading-snug drop-shadow">
              Make It Special
            </p>
          </div>

          {/* Right — birthday celebration illustration */}
          <div className="absolute right-0 top-0 h-full flex items-end justify-end pr-8 pb-2 gap-3 pointer-events-none select-none">
            {/* Bunting text */}
            <div className="absolute top-4 right-8 flex gap-1">
              {['H','A','P','P','Y','B','I','R','T','H','D','A','Y'].map((ch, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center w-6 h-7 rounded-sm font-bold text-[11px]"
                  style={{
                    backgroundColor: i < 5 ? '#fde68a' : '#fca5a5',
                    color: '#7c2d12',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    margin: i === 5 ? '0 4px 0 8px' : '0',
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>

            {/* Balloons */}
            <div className="absolute top-14 right-4 flex gap-2 text-4xl">
              <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🎈</span>
              <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🎉</span>
              <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', fontSize: '28px' }}>🥂</span>
            </div>

            {/* Cake illustration */}
            <div className="relative">
              <span
                className="block text-[90px] leading-none"
                style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))' }}
              >
                🎂
              </span>
            </div>
          </div>
        </div>

        {/* ── Product Grid — 5 category cards matching reference ── */}
        <div className="grid grid-cols-5 gap-4">
          {products.map(card => (
            <div
              key={card.id}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              {/* Card Image Container */}
              <div
                className="w-full overflow-hidden rounded-[18px] shadow-sm group-hover:shadow-md transition-all duration-200"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 select-none"
                />
              </div>

              {/* Category Name Label below */}
              <p className="text-[15px] font-bold text-gray-800 font-sans text-center group-hover:text-gray-900">
                {card.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
