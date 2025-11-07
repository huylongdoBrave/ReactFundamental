import React, { useState, useEffect } from 'react';

function ShowPrize() {
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    // Đọc danh sách quà từ localStorage
    const savedPrizes = localStorage.getItem('oventinPrizes');
    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes));
    }
  }, []); // Mảng rỗng đảm bảo effect này chỉ chạy 1 lần

  return (
    <main>
      <div className="prize-list-container">
        <h1 className="prize-list-title">Danh Sách Quà Tặng</h1>

        {prizes.length > 0 ? (
          <table className="prize-table">
            <thead>
              <tr>
                <th>Tên Quà</th>
                <th>Hình ảnh / Giá trị</th>
                <th>Tỉ lệ</th>
              </tr>
            </thead>
            <tbody>
              {prizes.map(prize => (
                <tr key={prize.id}>
                  <td data-label="Tên Quà">{prize.name}</td>
                  <td data-label="Giá trị">
                    {prize.type === 'image' ? (
                      <img src={prize.value} alt={prize.name} className="prize-table-image" />
                    ) : (
                      <span className="prize-table-text">{prize.value}</span>
                    )}
                  </td>
                  <td data-label="Tỉ lệ">
                    {(prize.probability * 100).toFixed(4)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có quà nào để hiển thị.</p>
          
        )}

      </div>
    </main>
  );
}

export default ShowPrize;
