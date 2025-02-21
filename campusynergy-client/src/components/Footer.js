import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <p>
        &copy; {new Date().getFullYear()} CampuSynergy | All rights reserved.
      </p>
      <div>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black mx-2"
        >
          Twitter
        </a>{" "}
        |
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black mx-2"
        >
          Facebook
        </a>{" "}
        |
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black mx-2"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
