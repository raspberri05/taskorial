import React from "react";
import "./main.css";

export default function Footer() {
  return (
    <>
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
                  <a href="/sitemap.xml" target="_blank">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5 className="fs-5">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/terms" target="_blank" rel="noopener">
                    Terms of Use
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/privacy" target="_blank" rel="noopener">
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
                    rel="noopener"
                  >
                    Github
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.producthunt.com/posts/taskorial?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-taskorial"
                    target="_blank"
                    rel="noopener"
                  >
                    Product Hunt
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5 className="fs-5">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="mailto:support@taskorial.com" target="_blank">
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
                  <a href="https://vedantsinghania.com" target="_blank">
                    Vedant Singhania
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
