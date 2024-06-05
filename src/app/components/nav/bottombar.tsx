"use client";

import Link from "next/link";

export default function BottomBar() {
  return (
    <footer className="bd-footer mt-5 footer-link footer">
      <div className="container py-4 py-md-5 px-4 px-md-3 border-top border-dark-subtle">
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
                <a href="/terms">Terms of Use</a>
              </li>
              <li className="mb-2">
                <Link href="/privacy">Privacy Policy</Link>
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
                  <i className="fab fa-github" /> Github
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/sponsors/raspberri05"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-hand-holding-usd" /> Sponsor
                </a>
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
                  <i className="fas fa-envelope" /> support@taskorial.com
                </a>
              </li>
              <li className="mb-2">
                <Link href="#">
                  <i className="fas fa-comment-dots" /> Feedback Form
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 offset-lg-1 mb-3">
            <h5>
              <img
                src="../images/originals/ORIGINAL_LOGO_IMG.png"
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
