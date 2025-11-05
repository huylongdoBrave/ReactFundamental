import React from 'react';

function Footer() {
  return (
    <footer>
        {/* Footer */}
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
  );
}
export default Footer;