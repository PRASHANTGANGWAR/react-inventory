import React from "react";

export default function Globalheader() {
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <a className="logo" href="/">
            Inventory <span>Mnagement</span>
          </a>
          <nav className="navbar">
            <ul className="primary-nav">
              <li>
                {/* <a href="/signup">Signup</a>{" "} */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
