function Header() {
    return (
      <header className="header">
        <div className="header-container">
          <h1 className="logo">My Blog</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;