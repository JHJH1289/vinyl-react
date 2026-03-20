import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2>The Vinyl Underground</h2>
          <p>Busan live music venue and underground performance space.</p>
        </div>

        <div className="footer-info">
          <div className="footer-section">
            <h3>Contact</h3>
            <p>부산광역시 예시 주소 123</p>
            <p>Tel. 051-123-4567</p>
          </div>

          <div className="footer-section">
            <h3>Email</h3>
            <p>
              vinylunderground@example.com
            </p>
          </div>

          <div className="footer-section">
            <h3>YouTube</h3>
            <a
              href="https://www.youtube.com/@bananamusicfriends"
              target="_blank"
              rel="noreferrer"
            >
              youtube.com/@bananamusicfriends
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 The Vinyl Underground. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;