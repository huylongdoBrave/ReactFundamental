import React from 'react';

function Wheel({ prizes, rotationAngle }) {
  const sliceCount = prizes.length > 0 ? prizes.length : 1;
  const sliceAngle = 360 / sliceCount;
  const cssOffsetAngle = -(sliceAngle / 2);

  return (
    <div className="container-wheel" style={{ transform: `rotate(${rotationAngle}deg)` }}>
      {prizes.map((prize, index) => {
        const rotation = cssOffsetAngle + index * sliceAngle;
        return (
          
          <div
            key={prize.id}
            className="container-wheel-part"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              background: prize.color,
            }}
          >
            {prize.type === 'image' ? (
              <img src={prize.value} alt={prize.name} className="image-wheel" />
            ) : (
              <p className="p-wheel">{prize.value}</p>
            )}
            <span className="prize-name-display">{prize.name}</span>
          </div>

        );
      })}
    </div>
  );
}

export default Wheel;
