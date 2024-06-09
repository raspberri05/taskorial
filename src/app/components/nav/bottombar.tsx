import Image from "next/image";

export default function BottomBar() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <Image
          src="/images/originals/ORIGINAL_LOGO_IMG.png"
          height={30}
          width={30}
          alt="taskorial logo"
        />
        <p>
          Taskorial
          <br />
          Created by Vedant Singhania
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Links</h6>
        <a className="link link-hover" href="/">
          About
        </a>
        <a className="link link-hover" href="/sitemap.xml">
          Sitemap
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Community</h6>
        <a
          className="link link-hover"
          href="https://github.com/raspberri05/taskorial"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className="link link-hover"
          href="https://github.com/sponsors/raspberri05"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sponsor
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact Us</h6>
        <a
          className="link link-hover"
          href="mailto:vedant.singhania@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@taskorial.com
        </a>
        <a
          className="link link-hover"
          href="mailto:vedant.singhania@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feedback Form
        </a>
      </nav>
    </footer>
  );
}
