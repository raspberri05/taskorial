import React from "react";
import './main.css'

export default function Footer() {
  return (
    <>
      <footer className="bd-footer py-4 py-md-5 mt-5 footer-link footer">
          <div className="container py-4 py-md-5 px-4 px-md-3 border-top"> {/*delete "text-body-secondary class, make custom background but less thick*/}
            <div className="row">
              <div className="col-lg-3 mb-3">
                  <img src="../assets/originals/ORIGINAL_LOGO_IMG.png" height="30px"/>
                  <span className="fs-5">&nbsp;&nbsp;Taskorial</span>
                <br />
                <br />
                <ul className="list-unstyled">
                  <li className="mb-2">Code licensed under <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE"
                                                              target="_blank" rel="license noopener">GNU GPLv3</a>
                  </li>
                  <li className="mb-2">Copyright 2024 Taskorial
                  </li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 offset-lg-1 mb-3">
                <h5 className="fs-5">Links</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/">About</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5 className="fs-5">Contact Us</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="#">Email</a></li>
                  <li className="mb-2"><a href="/feedback">Feedback Form</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5 className="fs-5">Legal</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/terms" target="_blank" rel="noopener">Terms of Use</a></li>
                  <li className="mb-2"><a href="/privacy" target="_blank"
                                          rel="noopener">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5 className="fs-5">Community</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="https://github.com/raspberri05/taskorial" target="_blank"
                                          rel="noopener">Github</a></li>
                  <li className="mb-2"><a href="https://www.producthunt.com/posts/taskorial?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-taskorial" target="_blank"
                                          rel="noopener">Product Hunt</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

    </>
  );
}
