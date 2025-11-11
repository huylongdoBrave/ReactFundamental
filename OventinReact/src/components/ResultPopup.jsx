import React from 'react';

function ResultPopup({ isOpen, prize, onClose }) {
  if (!isOpen) return null;

  return (
    <div id="popup-overlay">
        <img src="/static/dolphine.png" alt="Dolphine" className="side-image-popup" />
        <div id="popup-box">
            <img src="/static/favicon_oven.png" alt="Oventin Logo" className="popup-logo" />
            <img src="/static/noti.png" alt="Thông báo" className="popup-title" />
            <p id="popup-prize-name" className="popup-prize">{prize?.name || 'Chúc bạn may mắn lần sau'}</p>
            <small id="popup-prize-id">{prize ? `_ ID: ${prize.id}` : ''}</small>
            <button id="popup-confirm-btn" className="popup-confirm" onClick={onClose}>Tiếp tục quay</button>
        </div>
        <img src="/static/boy.png" alt="Boy" className="side-image-popup" />
    </div>
  );
  
}

export default ResultPopup;
