import React from "react";

import "./homepage.css";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="navbar">
        <div className="container">
          <a className="logo" href="">
            inventory <span>Management</span>
          </a>
          <nav className="navbar">

          </nav>
        </div>
      </div>
      <section className="hero">
        <div className="container">
          <div className="left-col">
            <p className="subHead">Manage OLGC vaulted for clients!</p>
            <h1>OLGC Vault Management </h1>

            <div className="hero-cca">
              <a href="/login" className="primary-cta">
                Take me to login
              </a><br></br>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <h4>© Copyright OLegacy</h4>
        </div>
      </footer>
    </div>
  );
}
