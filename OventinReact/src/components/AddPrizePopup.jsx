import React, { useState, useEffect } from 'react';

const INITIAL_FORM_STATE = {
  name: '',
  value: '',
  probability: 0,
  color: '#ffffff',
};

function AddPrizePopup({ isOpen, prizes, onClose, onAddPrize }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Reset form khi popup đóng
  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const detectPrizeType = (value) => {
    const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
    return imageRegex.test(value) ? 'image' : 'text';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const value = formData.value.trim();
    const probability = parseFloat(formData.probability);

    if (!name || !value) {
      alert('Vui lòng điền đầy đủ thông tin quà!');
      return;
    }

    if (isNaN(probability) || probability < 0) {
      alert('Tỉ lệ không hợp lệ!');
      return;
    }

    const currentTotalProbability = prizes.reduce((sum, prize) => sum + (prize.probability * 100), 0);
    const newTotalProbability = currentTotalProbability + probability;

    if (newTotalProbability > 100.01) {
      alert(`Không thể thêm. Tổng tỉ lệ hiện tại là ${newTotalProbability.toFixed(2)}% đã vượt mức 100%. Vui lòng điều chỉnh lại.`);
      return;
    }

    const newId = prizes.length > 0 ? Math.max(...prizes.map(p => p.id)) + 1 : 1;

    const newPrize = {
      id: newId,
      name: name,
      type: detectPrizeType(value),
      value: value,
      probability: probability / 100, // Chuyển từ % (0-100) sang dạng thập phân (0-1)
      color: formData.color,
    };

    onAddPrize(newPrize); // Gửi quà mới về cho component cha
    onClose(); // Đóng popup
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div id="add-prize-popup-overlay">
      <div id="add-prize-popup-box">
        <button id="add-prize-close-btn" className="popup-close" onClick={onClose}>&times;</button>
        <h3 className="probabilities-title">Thêm Quà Mới</h3>
        <form id="add-prize-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prize-name">Tên quà:</label>
            <input type="text" id="prize-name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group" id="prize-value-group">
            <label htmlFor="prize-value">Giá trị (Văn bản hoặc URL hình ảnh):</label>
            <input type="text" id="prize-value" name="value" value={formData.value} onChange={handleInputChange} required placeholder="Nhập văn bản hoặc dán URL hình ảnh..." />
          </div>
          <div className="form-group">
            <label htmlFor="prize-probability">Tỉ lệ (%):</label>
            <input type="number" id="prize-probability" name="probability" value={formData.probability} onChange={handleInputChange} min="0" max="100" step="any" placeholder="Nhập số thực" required />
          </div>
          <div className="form-group">
            <label htmlFor="prize-color">Màu nền:</label>
            <input type="color" id="prize-color" name="color" value={formData.color} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn-action">Lưu Quà</button>
        </form>
      </div>
    </div>
  );
}

export default AddPrizePopup;
