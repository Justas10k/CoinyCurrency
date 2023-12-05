import { useState } from "react";
import {
  IconCoins,
  IconSend,
  IconChartBar,
  IconBell
} from "@tabler/icons-react";

import '../Styles/Header.css';
import Convert from "./HeaderSections/Convert";
import ComingSoon from './HeaderSections/ComingSoon'


const Header = () => {
  const [activeSection, setActiveSection] = useState('convert');

  const sectionComponents = {
    convert: <Convert />,
    send: <ComingSoon />,
    charts: <ComingSoon/>,
    alerts: <ComingSoon/>,
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <header id="home">
      <div className="con">
        <div className="header-text">
          <h2>Coiny Currency Converter</h2>
          <p>Check live foreign currency exchange rates</p>
        </div>
        <div className="header-section">
          <div className="header-section-top">
            {Object.keys(sectionComponents).map((section) => (

              <div
                key={section}
                className={`header-section-top-links ${
                  activeSection === section ? "active" : ""
                }`}
                onClick={() => handleSectionClick(section)}
              >
                <a
                  href="#"
                  className={`top-links-text-icon ${
                    activeSection === section ? "active" : ""
                  }`}
                >
                  {getIcon(section)}
                  <span>{section}</span>
                </a>
              </div>

            ))}
          </div>
          <div className="header-section-bot">
            {sectionComponents[activeSection]}
          </div>
        </div>
      </div>
  </header>
  );
};
const getIcon = (section) => {
  switch (section) {
    case 'convert':
      return <IconCoins className={`header-section-top-icon`  } />;
    case 'send':
      return <IconSend className={`header-section-top-icon` } />;
    case 'charts':
      return <IconChartBar className={`header-section-top-icon` } />;
    case 'alerts':
      return <IconBell className={`header-section-top-icon` }/>;
    default:
      return null;
  }
};
export default Header; 
