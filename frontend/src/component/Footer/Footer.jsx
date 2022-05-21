import React from "react";
import "./Footer.css";

export const Footer = () => {
  var today = new Date();
  var year = today.getFullYear();

  return (
    <div className="Footer__Main">
      Songboook.com by{" "}
      <a
        href="http://www.clementvanstaen.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Clément van Staen
      </a>
      , {year}
    </div>
  );
};
