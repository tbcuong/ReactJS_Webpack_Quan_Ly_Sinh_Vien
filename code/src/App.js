import React from 'react';
import Table1 from './table1';

function App() {
  return (
    <div>
      <nav className="navbar">
            <div className="navbar-logo">FPT University Academic Portal</div>
            <ul className="navbar-menu">
                <li style={{ marginRight: "80px" }} ><a href="https://www.w3schools.com/css/css_display_visibility.asp">Home</a></li>
                <li style={{ marginRight: "80px" }}><a href="https://www.w3schools.com/css/css_display_visibility.asp">Class</a></li>
                <li style={{ marginRight: "80px" }}><a href="https://www.w3schools.com/css/css_display_visibility.asp">People</a></li>
                <li style={{ marginRight: "40px" }}><a href="https://www.w3schools.com/css/css_display_visibility.asp">Contact</a></li>
          
            </ul>
        </nav>
      <Table1/>
    </div>
  );
}

export default App;


