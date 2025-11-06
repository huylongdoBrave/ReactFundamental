import React, { useState, useEffect, useRef } from 'react';
import Wheel from './Wheel';
import ResultPopup from './ResultPopup';
import RateTablePopup from './RateTablePopup';
import AddPrizePopup from './AddPrizePopup';

function WheelGame() {
  // === STATE MANAGEMENT ===
  const [prizes, setPrizes] = useState([]);
  const [currentSpins, setCurrentSpins] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  // const [rotationAngle, setRotationAngle] = useState(0);
  const wheelRef = useRef(null); // Ref để tham chiếu đến DOM của vòng quay

  // State cho các popup
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [isRatePopupOpen, setIsRatePopupOpen] = useState(false);
  const [isAddPrizePopupOpen, setIsAddPrizePopupOpen] = useState(false);

  // === DATA LOADING (useEffect) ===
  // Chạy 1 lần khi component được mount để tải dữ liệu
  useEffect(() => {
    const LOCAL_STORAGE_KEY = 'oventinPrizes';
    const savedPrizes = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes));
      console.log("Loaded prizes from Local Storage.");
    } else {
      // Dữ liệu mẫu nếu không có trong localStorage
      const mockData = [
        { id: 1, name: "Điện thoại", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38", probability: 0.0005, color: "#ef0012" },
        { id: 2, name: "Good luck", type: "text", value: "Chúc bạn may mắn lần sau", probability: 0.14, color: "#ffffff" },
        { id: 3, name: "Máy ảnh", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd", probability: 0.0005, color: "#ef0012" },
        { id: 4, name: "Thẻ cào", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066", probability: 0.25, color: "#ffffff" },
        { id: 5, name: "Điện thoại", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38", probability: 0.0005, color: "#ef0012" },
        { id: 6, name: "Good luck", type: "text", value: "Chúc bạn may mắn lần sau", probability: 0.14, color: "#ffffff" },
        { id: 7, name: "Máy ảnh", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd", probability: 0.0005, color: "#ef0012" },
        { id: 8, name: "Thẻ cào", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066", probability: 0.25, color: "#ffffff" }
      ];
      setPrizes(mockData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
      console.log("Loaded mock data and saved to Local Storage.");
    }
  }, []);

  // Effect để quản lý class 'body-no-scroll' khi popup mở/đóng
  useEffect(() => {
    if (isResultPopupOpen || isRatePopupOpen || isAddPrizePopupOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    // Cleanup function để đảm bảo class được xóa khi component unmount
    return () => document.body.classList.remove('body-no-scroll');
  }, []);

  // === HELPER FUNCTIONS ===
  const getWeightedRandomIndex = () => {
    const prizeProbabilities = prizes.map(p => p.probability);
    let rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < prizeProbabilities.length; i++) {
      cumulativeProbability += prizeProbabilities[i];
      if (rand < cumulativeProbability) {
        return i;
      }
    }
    return prizeProbabilities.length - 1;
  };

  // === EVENT HANDLERS ===
  const handleSpin = () => {
    if (isSpinning || currentSpins <= 0 || prizes.length === 0) return;

    setCurrentSpins(currentSpins - 1);
    setIsSpinning(true); // Báo hiệu bắt đầu quay, các nút sẽ bị vô hiệu hóa

    const winningSliceIndex = getWeightedRandomIndex();
    const sliceCount = prizes.length;
    const sliceAngle = 360 / sliceCount;
    const cssOffsetAngle = -(sliceAngle / 2);

    const randomSpins = Math.floor(Math.random() * 6) + 5;
    const targetAngle = winningSliceIndex * sliceAngle + cssOffsetAngle;
    // LUÔN tính góc quay mới, không dựa vào góc cũ. Dấu trừ để quay ngược chiều kim đồng hồ.
    const totalRotation = -(randomSpins * 360 + targetAngle);
    const spinDuration = 5;

    // Sử dụng ref để thao tác trực tiếp với style, đảm bảo animation chạy đúng
    const wheelElement = wheelRef.current;
    if (wheelElement) {
      // 1. Bật animation
      wheelElement.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
      // 2. Bắt đầu quay
      wheelElement.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Đặt hẹn giờ để xử lý kết quả sau khi animation kết thúc
    setTimeout(() => {
      const winningPrizeData = prizes[winningSliceIndex];
      setWinningPrize(winningPrizeData);
      setIsResultPopupOpen(true);

      // Reset vòng quay để chuẩn bị cho lần sau
      const finalRotation = totalRotation % 360;
      if (wheelElement) {
        wheelElement.style.transition = 'none'; // Tắt animation
        wheelElement.style.transform = `rotate(${finalRotation}deg)`; // Đặt lại góc
      }
      setIsSpinning(false); // Báo hiệu đã quay xong
    }, spinDuration * 1000);
  };

  const handleApplyPrizeChanges = (updatedPrizes) => {
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));
    alert('Đã cập nhật thành công!');
  };

  const handleAddPrize = (newPrize) => {
    const updatedPrizes = [...prizes, newPrize];
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));
    alert(`Đã thêm quà "${newPrize.name}"!`);
  };

  return (
    <>
      <main>
        <div className="game-area">
          <div className="container-title">
            <img src="/static/lucky-draw.png" alt="Lucky Draw" />
          </div>
          <div className="spin-counter">
            <p className="title-down">Bạn còn <span id="spin-count">{currentSpins}</span> lượt quay</p>
          </div>
          <div className="add-spin-container">
            <button id="add-spins-btn" className="btn-add" onClick={() => setCurrentSpins(currentSpins + 10)}>Thêm lượt</button>
          </div>
          <div className="wheel-row">
            <img src="/static/dolphine.png" alt="Dolphine" className="side-image" />
            <div className="wheel-wrapper">
              <div className="arrow-top"></div>
              <div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div>
              <div ref={wheelRef}>
                <Wheel prizes={prizes} />
              </div>
              <button id="spin" onClick={handleSpin} disabled={isSpinning}>
                <img src="/static/favicon_oven.png" alt="Spin" />
              </button>
            </div>
            <img src="/static/boy.png" alt="Boy" className="side-image" />
          </div>
        </div>
      </main>
      <p className="title-down">Bấm vào Vòng Quay May Mắn để bắt đầu quay</p>

      {/* POPUPS */}
      <ResultPopup
        isOpen={isResultPopupOpen}
        prize={winningPrize}
        onClose={() => setIsResultPopupOpen(false)}
      />

      <RateTablePopup
        isOpen={isRatePopupOpen}
        prizes={prizes}
        onClose={() => setIsRatePopupOpen(false)}
        onApplyChanges={handleApplyPrizeChanges}
      />

      <AddPrizePopup
        isOpen={isAddPrizePopupOpen}
        prizes={prizes}
        onClose={() => setIsAddPrizePopupOpen(false)}
        onAddPrize={handleAddPrize}
      />

      {/* SETUP BUTTONS */}
      <div className="show-button-container">
        <div className="button-group-top">
          <button id="show-probabilities-btn" className="btn-action" onClick={() => setIsRatePopupOpen(true)} disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Tỉ lệ</button>
          <button id="add-prize-btn" className="btn-action" onClick={() => setIsAddPrizePopupOpen(true)} disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Thêm quà</button>
        </div>
        <div className="button-group-top">
          <button id="restart-btn" className="btn-action" onClick={() => { localStorage.clear(); window.location.reload(); }} disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Khởi động lại</button>
        </div>
      </div>
      
    </>
  );
}

export default WheelGame;
