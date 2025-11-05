import React, { useMemo } from 'react';

function Wheel({ prizes }) {
  const sliceCount = prizes.length > 0 ? prizes.length : 1;
  const sliceAngle = 360 / sliceCount;
  const cssOffsetAngle = -(sliceAngle / 2);

  // Lấy kích thước của vòng quay từ biến CSS --container-wheel-size
  // và tính toán chiều rộng động cho mỗi ô quà.
  // useMemo để chỉ tính toán lại khi sliceAngle thay đổi.
  const dynamicWidth = useMemo(() => {
    // Giả sử kích thước vòng quay là 360px như trong CSS
    const containerWheelSize = 360; 
    // Công thức: đường kính * sin(góc ở tâm / 2).
    // Nhân với 1.05 để bù vào lỗi làm tròn của trình duyệt, giúp các ô khít vào nhau.
    return containerWheelSize * Math.sin((sliceAngle / 2) * (Math.PI / 180)) * 1.05;
  }, [sliceAngle]);

  return (
    <div className="container-wheel">
      {prizes.map((prize, index) => {
        const rotation = cssOffsetAngle + index * sliceAngle;
        return (
          <div
            key={prize.id}
            className="container-wheel-part"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              background: prize.color,
              width: `${dynamicWidth}px`, // Áp dụng chiều rộng động
            }}
            data-id={prize.id}
            data-name={prize.name}
          >
            {prize.type === 'image' ? (
              <>
                <img src={prize.value} alt={prize.name} className="image-wheel" />
                <span className="prize-name-display">{prize.name}</span>
              </>
            ) : (
              <p className="p-wheel">{prize.value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Wheel;
