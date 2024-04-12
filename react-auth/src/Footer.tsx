import "./main.css";

export default function Footer() {
  return (
    <footer className="bd-footer py-4 py-md-5 mt-5 footer-link footer">
      <div className="container py-4 py-md-5 px-4 px-md-3 border-top">
        {" "}
        {/*delete "text-body-secondary class, make custom background but less thick*/}
        <div className="row">
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="fs-5">Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/">About</a>
              </li>
              <li className="mb-2">
                <a href="/sitemap.xml" target="_blank" rel="noreferrer">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="fs-5">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/terms">
                  Terms of Use
                </a>
              </li>
              <li className="mb-2">
                <a href="/privacy">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="fs-5">Community</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="https://github.com/raspberri05/taskorial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="mb-2">
                <iframe
                  src="https://github.com/sponsors/raspberri05/button"
                  title="Sponsor raspberri05"
                  height="32"
                  width="114"
                ></iframe>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="fs-5">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="mailto:support@taskorial.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  support@taskorial.com
                </a>
              </li>
              <li className="mb-2">
                <a href="/feedback">Feedback Form</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 offset-lg-1 mb-3">
            <h5>
              <img
                src="../assets/originals/ORIGINAL_LOGO_IMG.png"
                height="30px"
                alt="taskorial logo"
              />
              <span className="fs-5">&nbsp;&nbsp;Taskorial</span>
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">Copyright 2024 Taskorial</li>
              <li className="mb-2">
                Created by{" "}
                <a
                  href="https://vedantsinghania.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vedant Singhania
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
