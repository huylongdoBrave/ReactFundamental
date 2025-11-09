import React, { useState, useEffect } from 'react';

function PrizeDetailPopup({ prize, onClose, onUpdate, onDelete }) {
  const [editablePrize, setEditablePrize] = useState(null);

  useEffect(() => {
    // Khi prop 'prize' thay đổi (khi người dùng click vào một quà mới),
    // cập nhật state có thể chỉnh sửa bên trong popup.
    if (prize) {
      setEditablePrize({
        ...prize,
        // Chuyển đổi tỉ lệ từ dạng thập phân (0-1) sang dạng % (0-100) để hiển thị trong input
        probability: (prize.probability * 100).toPrecision(4)
      });
    } else {
      // Nếu không có prize (tức là popup nên đóng), reset state nội bộ
      setEditablePrize(null);
    }
  }, [prize]);

  // Sự kiện thay đổi trong input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePrize(prev => ({ ...prev, [name]: value }));
  };

  // Sự kiện nút cập nhật
  const handleUpdate = () => {
    // Chuyển đổi tỉ lệ từ % trở lại dạng thập phân trước khi gửi đi
    const updatedPrize = {
      ...editablePrize,
      probability: parseFloat(editablePrize.probability) / 100
    };
    onUpdate(updatedPrize); // Gọi hàm onUpdate được truyền từ component cha
  };

  // Sự kiện xóa
  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa quà "${editablePrize.name}" không?`)) {
      onDelete(editablePrize.id); // Gọi hàm onDelete được truyền từ component cha
    }
  };

  if (!editablePrize) {
    return null;
  }

  return (
    <div id="prize-detail-popup-overlay" onClick={onClose}>
      <div id="prize-detail-popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>&times;</button>
        {/* <h2 className="prize-detail-title">{editablePrize.name}</h2> */}

        <div className="prize-detail-content">
          {editablePrize.type === 'image' && (
            <img src={editablePrize.value} alt={editablePrize.name} className="prize-detail-image" />
          )}
          <div className="prize-detail-form">
            <div className="form-group-detail">
              <label>Tên quà:</label>
              <input type="text" name="name" value={editablePrize.name} onChange={handleInputChange} />
            </div>
            <div className="form-group-detail">
              <label>Giá trị (Text/URL):</label>
              <input type="text" name="value" value={editablePrize.value} onChange={handleInputChange} />
            </div>
            <div className="form-group-detail">
              <label>Tỉ lệ (%):</label>
              <input type="number" name="probability" value={editablePrize.probability} onChange={handleInputChange} step="any" />
            </div>
            <div className="form-group-detail form-group-color">
              <label>Màu nền:</label>
              <input type="text" name="color" value={editablePrize.color} onChange={handleInputChange} />
              <input type="color" value={editablePrize.color} onChange={handleInputChange} name="color" className="color-picker-detail"/>
            </div>
          </div>
        </div>

        <div className="prize-detail-actions">
          <button className="btn-action btn-update-prize" onClick={handleUpdate}>
            Cập nhật
          </button>
          <button className="btn-action btn-delete-prize" onClick={handleDelete}>
            Xóa
          </button>
        </div>

      </div>
    </div>
  );
}

export default PrizeDetailPopup;


          // <div className="prize-detail-info">
          //   <p><strong>ID:</strong> {prize.id}</p>
          //   <p><strong>Loại quà:</strong> {prize.type === 'image' ? 'Hình ảnh' : 'Văn bản'}</p>
          //   <p><strong>Tỉ lệ trúng:</strong> {(prize.probability * 100).toFixed(4)}%</p>
          //   <p><strong>Màu nền:</strong> 
          //     <span style={{
          //       display: 'inline-block',
          //       width: '20px',
          //       height: '20px',
          //       backgroundColor: prize.color,
          //       border: '1px solid #ccc',
          //       verticalAlign: 'middle',
          //       marginLeft: '10px'
          //     }}></span>
          //     <span style={{ marginLeft: '5px' }}>{prize.color}</span>
          //   </p>
