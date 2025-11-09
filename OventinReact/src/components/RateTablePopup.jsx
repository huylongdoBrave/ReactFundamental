import React, { useState, useEffect, useMemo } from 'react';
import { ReactSortable } from "react-sortablejs";

function RateTablePopup({ isOpen, prizes, onClose, onApplyChanges }) {
  const [tempPrizes, setTempPrizes] = useState([]);

  // Khi popup mở ra (isOpen thay đổi), hoặc danh sách quà gốc thay đổi,
  // chúng ta sẽ sao chép sâu (deep copy) danh sách quà vào state tạm thời.
  useEffect(() => {
    if (isOpen) {
      setTempPrizes(JSON.parse(JSON.stringify(prizes)));
    }
  }, [isOpen, prizes]);

  // Tính tổng tỉ lệ mỗi khi tempPrizes thay đổi
  const totalProbability = useMemo(() => {
    return tempPrizes.reduce((sum, prize) => sum + (parseFloat(prize.probability) || 0), 0) * 100;
  }, [tempPrizes]);

  // Cập nhật tỉ lệ quà
  const handlePrizeChange = (id, field, value) => {
    setTempPrizes(currentPrizes =>
      currentPrizes.map(p => {
        if (p.id === id) {
          // Nếu là probability, chuyển đổi về dạng thập phân (0-1)
          const newValue = field === 'probability' ? parseFloat(value) / 100 : value;
          return { ...p, [field]: newValue };
        }
        return p;
      })
    );
  };

  // Xóa quà
  const handleDeletePrize = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa quà "${name}" không?`)) {
      setTempPrizes(currentPrizes => currentPrizes.filter(p => p.id !== id));
    }
  };

  // Cảnh báo sửa bị tràn tỉ lệ
  const handleApply = () => {
    if (totalProbability > 100.01) {
      alert(`Cảnh báo tỉ lệ đang ${totalProbability.toFixed(2)}% . Vui lòng chỉnh tổng dưới 100%`);
      return;
    }
    onApplyChanges(tempPrizes); // Gửi dữ liệu đã thay đổi ra component cha
    onClose(); // Đóng popup
  };


  
  if (!isOpen) {
    return null;
  }

  return (
    <div id="probabilities-popup-overlay">
      <div id="probabilities-popup-box">
        <button id="probabilities-close-btn" className="popup-close" onClick={onClose}>&times;</button>
        <h3 className="probabilities-title">Bảng Tỉ Lệ Trúng Thưởng</h3>
        <div className="probabilities-table">
          <div id="probabilities-table-body">
            {/* Dùng ReactSortable để bọc các item có thể kéo thả */}
            <ReactSortable list={tempPrizes} setList={setTempPrizes} handle=".prize-name-cell" animation={150} ghostClass="dragging">
              {tempPrizes.map(prize => (
                <div key={prize.id} className="probabilities-table-row" data-prize-id={prize.id}>
                  <div className="prize-id-cell">{prize.id}</div>
                  <div className="prize-name-cell" style={{ cursor: 'grab' }}>
                    <i className="fa-solid fa-grip-vertical" style={{ marginRight: '8px' }}></i>
                    {prize.name}
                  </div>
                  <div className="prize-type-cell" title={prize.value}>
                    {prize.type === 'image'
                      ? <img src={prize.value} className="prize-value-image" alt="Preview" />
                      : prize.value
                    }
                  </div>
                  <div className="prize-color-cell">
                    <input
                      type="color"
                      className="prize-color-input"
                      value={prize.color}
                      onChange={(e) => handlePrizeChange(prize.id, 'color', e.target.value)}
                    />
                  </div>
                  <div className="prize-prob-cell">
                    <input
                      type="number"
                      className="prize-prob-input"
                      value={(prize.probability * 100).toPrecision(4)}
                      onChange={(e) => handlePrizeChange(prize.id, 'probability', e.target.value)}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                  <div style={{ marginLeft: '10px' }} className="prize-delete-cell">
                    <button
                      className="delete-prize-btn"
                      title="Xóa"
                      onClick={() => handleDeletePrize(prize.id, prize.name)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
        <p id="probabilities-total" style={{ color: Math.abs(totalProbability - 100) > 0.01 ? '#ffeb3b' : 'white' }}>
          Tổng tỉ lệ: {totalProbability.toFixed(2)}%
        </p>
        <center>
          <button id="apply-probabilities-btn" type="button" className="btn-action" style={{ width: '300px' }} onClick={handleApply}>
            Cập nhật
          </button>
        </center>
      </div>
    </div>
  );
}

export default RateTablePopup;
