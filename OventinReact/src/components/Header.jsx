import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

function Header() {
return (
<header>
    <nav className="main-nav">
        <div className="nav-left">
            {/* <a href="#" className="logo"> */}
            <Link to="/" className="logo">
                <img src="/static/favicon_oven.png" alt="Oventin Logo" />
            </Link>
            {/* </a> */}
            <ul className="main-menu">
                {/* Bọc mỗi mục menu trong NavLink và gán className động */}
                {/* <NavLink to="/products" className={({ isActive }) => isActive ? "active-link active" : ""}></NavLink> */}
                <NavLink to="/show-prize" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>
                    <div className="menu-item-box">
                        <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="Sản phẩm" />
                        <span className="menu-title">Danh Sách <br /> Sản Phẩm</span>
                    </div>
                </NavLink>

                <a href="#" className="menu-item">
                    <div className="menu-item-box">
                        <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="Đổi Quà" />
                        <span className="menu-title">Đổi Quà</span>
                    </div>
                </a>

                <NavLink to="/" end className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>
                    <div className="menu-item-box">
                        <img className="menu-icon" src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png" alt="Vòng quay" />
                        <span className="menu-title">Vòng Quay</span>
                    </div>
                </NavLink>

                <a href="#" className="menu-item">
                    <div className="menu-item-box">
                        <img src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png" alt="Thêm" className="menu-icon" />
                        <span className="menu-title">Thêm</span>
                    </div>
                </a>
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
