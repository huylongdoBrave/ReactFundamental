// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css'
import './main.css'


function App() {


  return (
    <>
    
    {/* Header */}
    <header>
    <nav className="main-nav">
        <div className="nav-left">
            <a href="#" className="logo">
                <img src="/static/favicon_oven.png" alt="Oventin Logo" />
            </a>
            <ul className="main-menu">
                <li className="menu-item ">
                    <a href="#">
                        <div className="menu-item-box">
                            {/* <i className="fa-solid fa-dharmachakra menu-icon"></i> */}
                            <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="" />
                            <span className="menu-title">Sản Phẩm</span>
                        </div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#">
                        <div className="menu-item-box">
                            {/* <i className="fa-solid fa-clock-rotate-left menu-icon"></i> */}
                            <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="" />
                            <span className="menu-title">Đổi Quà</span>
                        </div>
                    </a>
                </li>
                <li className="menu-item active">
                    <a href="#">
                        <div className="menu-item-box">
                            {/* <i className="fa-solid fa-gift menu-icon"></i> */}
                            <img  className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png" alt="" />
                            <span className="menu-title">Vòng Quay</span>
                        </div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#">
                        <div className="menu-item-box">
                            <img src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png" alt="" className="menu-icon" />
                            <span className="menu-title">Thêm</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div className="nav-right">
            <div className="nav-right-item"><i className="fa-solid fa-star"></i> <span>1,000</span></div>
            <div className="nav-right-item"><i className="fa-solid fa-ticket"></i> <span>10</span></div>
            <button className="nav-button">Nhập mã</button>
            <div className="nav-right-item">
                {/* <i className="fa-solid fa-user"></i> */}
                 <img className="img-nav-right" src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc" alt="" />
            </div>
        </div>
    </nav>
</header>

    {/* Main Content */}
<main>
    <div className="game-area">
        <div className="container-title">
            <img src="/static/lucky-draw.png" alt="" />
        </div>
        <div className="spin-counter">
            <p className="title-down">Bạn còn <span id="spin-count">5</span> lượt quay</p>
        </div>
        <div className="add-spin-container">
            <button id="add-spins-btn" className="btn-add">Thêm lượt</button>
        </div>    
        <div className="wheel-row">
            <img src="/static/dolphine.png" alt="Dolphine" className="side-image" />
            <div className="wheel-wrapper">
                <div className="arrow-top"></div>
                <div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div>
                <div className="container-wheel">{/* Receive Json Data */}</div>
                <button id="spin"><img src="/static/favicon_oven.png" alt="Spin" /></button>
            </div>
             <img src="/static/boy.png" alt="Boy" className="side-image" />
        </div>
    </div>
</main>
  <p className="title-down">Bấm vào Vòng Quay May Mắn để bắt đầu quay</p>

        {/* POPUP KẾT QUẢ*/}
    <div id="popup-overlay" className="popup-hidden">
        <img src="/static/dolphine.png" alt="Dolphine" className="side-image-popup" />
        <div id="popup-box">
            <img src="/static/favicon_oven.png" alt="Oventin Logo" className="popup-logo" />
            <img src="/static/noti.png" alt="Thông báo" className="popup-title" />
            {/* <button id="popup-close-btn" className="popup-close">&times;</button> */}
            <p id="popup-prize-name" className="popup-prize"></p>
            <small id="popup-prize-id"></small>
            <button id="popup-confirm-btn" className="popup-confirm">Tiếp tục quay</button>
        </div>
        <img src="/static/boy.png" alt="Boy" className="side-image-popup" />
    </div>


        {/* .PHẦN NÚT SETUP */}
    {/* Button add prize, probabilities prize */}
    <div className="show-button-container">
        <div className="button-group-top"> {/* Nhóm 1 hàng */}
            <button id="show-probabilities-btn" className="btn-action">Tỉ lệ</button>
            <button id="add-prize-btn" className="btn-action">Thêm quà</button>
        </div>
        <div className="button-group-top">
            <button id="restart-btn" className="btn-action" style={{ opacity: 0 }}>Khởi động lại vòng xoay</button>
        </div>
    </div>


    {/* .BẢNG TÙY CHỈNH */}
    {/* Popup Probabilities Table */}
    <div id="probabilities-popup-overlay" className="popup-hidden">
        <div id="probabilities-popup-box">
            <button id="probabilities-close-btn" className="popup-close">&times;</button>
            <h3 className="probabilities-title">Bảng Tỉ Lệ Trúng Thưởng</h3>
            <div className="probabilities-table">
                <div id="probabilities-table-body"></div>
            </div>
            <p id="probabilities-total">Tổng tỉ lệ 100%</p>
            <center><button id="apply-probabilities-btn" type="button" className="btn-action" style={{ width: '300px' }}>Cập nhật</button></center>
        </div>
    </div>

    {/* Popup Add Prize Table */}
    <div id="add-prize-popup-overlay" className="popup-hidden">
        <div id="add-prize-popup-box">
            <button id="add-prize-close-btn" className="popup-close">&times;</button>
            <h3 className="probabilities-title">Thêm Quà Mới</h3>
            <form id="add-prize-form">
                <div className="form-group">
                    <label htmlFor="prize-name">Tên quà:</label>
                    <input type="text" id="prize-name" name="name" required />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="prize-type">Loại quà:</label>
                    <select id="prize-type" name="type">
                        <option value="text">Chữ (Text)</option>
                        <option value="image">Hình ảnh (Image)</option>
                    </select>
                </div> */}
                <div className="form-group" id="prize-value-group">
                    <label htmlFor="prize-value">Giá trị (Văn bản hoặc URL hình ảnh):</label>
                    <input type="text" id="prize-value" name="value" required placeholder="Nhập văn bản hoặc dán URL hình ảnh..." />
                </div>
                <div className="form-group">
                    <label htmlFor="prize-probability">Tỉ lệ (%):</label>
                    <input type="number" id="prize-probability" name="probability" defaultValue="0" min="0" max="100" step="any" placeholder="Nhập số thực" required />
                </div>
                <div className="form-group">
                    <label htmlFor="prize-color">Màu nền:</label>
                    <input type="color" id="prize-color" name="color" defaultValue="#ffffff" />
                </div>
                <button type="submit" className="btn-action">Lưu Quà</button>
            </form>
        </div>
    </div>


    {/* Footer */}
<footer >
    <div className="container-footer">
        <div className="content-footer">
            <div className="footer-top">
                <p className="company-name">CÔNG TY TNHH AB AGRI VIỆT NAM</p>
                <p>Tầng 6A2 Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
            </div>
            <div className="footer-middle">
                <div className="footer-column">
                    <div className="footer-item"><i className="fa-solid fa-phone"></i><span>/Ovaltine Vietnam</span></div>
                    <div className="footer-item"><i className="fa-solid fa-envelope"></i><span>/Ovaltine Vietnam</span></div>
                    <div className="footer-item"><i className="fa-brands fa-facebook"></i><span>Thể lệ chương trình</span></div>
                </div>
                <div className="footer-column">
                    <div className="footer-item"><i className="fa-solid fa-file-contract"></i><span>/Ovaltine Vietnam</span></div>
                    <div className="footer-item"><i className="fa-solid fa-shield-halved"></i><span>/Ovaltine Vietnam</span></div>
                    <div className="footer-item"><i className="fa-solid fa-circle-question"></i><span>Chính sách bảo mật</span></div>
                </div>
                <div className="footer-column">
                    <div className="footer-item"><i className="fa-solid fa-certificate"></i><span>/19005306</span></div>
                    <div className="footer-item"><i className="fa-solid fa-gavel"></i><span>/Ovaltine Vietnam</span></div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Ovaltine Vietnam © 2025</p>
            </div>
        </div>
    </div>
</footer>

    </>
  )
}

export default App
