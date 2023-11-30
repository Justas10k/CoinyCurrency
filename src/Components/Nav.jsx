import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import logo from '../img/white logo.png'
import { useState, useEffect } from "react";
import "../Styles/Nav.css";

const Nav = () => {

  const navlinks = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  //toggle button
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <nav className={`${scrolled ? "scrolled" : ""}`}>
          <a href="/"><img className="logo" src={logo} /></a>
        
          <ul className="d-none d-lg-flex">
            {navlinks.map((item) => (
              <li key={item.name}>
                <a className='link' href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>

          <span className="nav-icons">
            <IconBrandTwitter className="icon nav-icon" />
            <IconBrandDiscord className="icon nav-icon" />
            <div className="d-md-block d-lg-none">
              <IconMenu2
                className={`icon nav-icon ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
              />
            </div>
          </span>

      </nav>
      <div className="d-lg-none">
        <div className={`mobile-nav ${isOpen ? "active" : ""}`}>
          <div className="slide-links">
            
            <IconX
              className={`icon nav-icon X-icon ${isOpen ? "open" : ""}`}
              width={30}
              height={30}
              onClick={toggleMenu}
            />

            <ul>
              {navlinks.map((item) => (
              <li key={item.name}>
                <a className='togglelink' href={item.link}>{item.name}</a>
              </li>
            ))}
            </ul>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
