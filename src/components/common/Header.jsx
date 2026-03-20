import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import menuIcon from "../../assets/images/menu.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleScroll = (sectionId) => {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo-button" onClick={closeMenu}>
          THE VINYL
          <br />
          UNDERGROUND
        </Link>

        <div className="menu-wrap">
          <button
            type="button"
            className="menu-button"
            onClick={toggleMenu}
            aria-label="메뉴 열기"
          >
            <img src={menuIcon} alt="" className="menu-icon" />
          </button>

          <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
            <button type="button" onClick={() => handleScroll("home")}>
              홈
            </button>
            <button type="button" onClick={() => handleScroll("venue")}>
              공연장 소개
            </button>
            <button type="button" onClick={() => handleScroll("reservation")}>
              예약하기
            </button>
            <button type="button" onClick={() => handleScroll("location")}>
              오시는 길
            </button>
            <Link to="/admin/login" onClick={closeMenu}>
              로그인
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;