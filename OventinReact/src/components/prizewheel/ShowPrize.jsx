import React, { useState, useEffect } from 'react';
import PrizeDetailPopup from './PrizeDetailPopup'; // Import component popup mới

function ShowPrize() {
  const [prizes, setPrizes] = useState([]);
  
  const [selectedPrize, setSelectedPrize] = useState(null);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {// Đọc danh sách quà từ localStorage
    const savedPrizes = localStorage.getItem('oventinPrizes');
    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes));
    }
  }, []);


  // sự kiện chống scroll
  const handleRowClick = (prize) => {
    setSelectedPrize(prize);
    // setIsPopupOpen(true);
    document.body.classList.add('body-no-scroll');
  };
  const handleClosePopup = () => {
    setSelectedPrize(null);
    // setIsPopupOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  // Hàm xử lý sự kiện cập nhật quà popup
  const handleUpdatePrize = (updatedPrize) => {
    // Cập nhật mảng prizes trong state
    const updatedPrizes = prizes.map(p => 
      p.id === updatedPrize.id ? updatedPrize : p
    );
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));  // Lưu vào localStorage
    handleClosePopup(); // Đóng popup và thông báo cho người dùng
    alert(`Đã cập nhật quà "${updatedPrize.name}" thành công!`);
    console.log('updated prize: ' + updatedPrizes);
  };

  // Hàm xử lý sự kiện xóa quà từ popup
  const handleDeletePrize = (prizeId) => {
    // Lọc ra các quà không bị xóa
    const updatedPrizes = prizes.filter(p => p.id !== prizeId);
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes)); // Lưu vào local

    handleClosePopup(); // Đóng popup
    alert('Đã xóa quà thành công!');
  };


  return (
    <>
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
                <tr key={prize.id} onClick={() => handleRowClick(prize)} style={{ cursor: 'pointer' }}>
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
        ) : (<p>Không có quà nào để hiển thị.</p>)
        }
      </div>

      {/* Cách viết dùng biến isPopupOpen 
      {isPopupOpen && (
        <PrizeDetailPopup 
          prize={selectedPrize}
          onClose={handleClosePopup}/>
      )} */}

      { ( /* Cách viết ko dùng biến isPopupOpen */
        <PrizeDetailPopup 
          prize={selectedPrize}
          onClose={handleClosePopup}
          onUpdate={handleUpdatePrize}
          onDelete={handleDeletePrize}
        />
      ) }

    </>
  );
}

export default ShowPrize;
