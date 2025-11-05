import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket } from '@fortawesome/free-solid-svg-icons';

function Header() {
return (
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
                            <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="" />
                            <span className="menu-title">Sản Phẩm</span>
                        </div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#">
                        <div className="menu-item-box">
                            <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="" />
                            <span className="menu-title">Đổi Quà</span>
                        </div>
                    </a>
                </li>
                <li className="menu-item active">
                    <a href="#">
                        <div className="menu-item-box">
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
            {/* <div className="nav-right-item"><i className="fa-solid fa-star"></i> <span>1,000</span></div>
            <div className="nav-right-item"><i className="fa-solid fa-ticket"></i> <span>10</span></div> */}
            <div className="nav-right-item"><FontAwesomeIcon icon={faStar} /> <span>1,000</span></div>
            <div className="nav-right-item"><FontAwesomeIcon icon={faTicket} /> <span>10</span></div>
            <button className="nav-button">Nhập mã</button>
            <div className="nav-right-item">
                <img className="img-nav-right" src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc" alt="" />
            </div>
        </div>
    </nav>
</header>
);
}

export default Header;
