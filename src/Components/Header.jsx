import { useState } from "react";
import {
  IconCoins,
  IconSend,
  IconChartBar,
  IconBell
} from "@tabler/icons-react";

import '../Styles/Header.css';
import Convert from "./Convert";


const Header = () => {
  const [activeSection, setActiveSection] = useState('convert');

  const sectionComponents = {
    convert: <Convert />,
    send: <Convert />,
    charts: <Convert/>,
    alerts: <Convert/>,
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <header id="home">
    <div className="header-image-box">
      <div className="con">
        <div className="header-text">
          <h2>Coiny Currency Converter</h2>
          <p>Check live foreign currency exchange rates</p>
        </div>
        <div className="convert-con">
          <div className="currency-top">
            {Object.keys(sectionComponents).map((section) => (

              <div
                key={section}
                className={`currency-top-sections ${
                  activeSection === section ? "active" : ""
                }`}
                onClick={() => handleSectionClick(section)}
              >
                <a
                  href="#"
                  className={`currency-link ${
                    activeSection === section ? "active" : ""
                  }`}
                >
                  {getIcon(section)}
                  <span>{section}</span>
                </a>
              </div>

            ))}
          </div>
          <div className="currency-bot">
            {sectionComponents[activeSection]}
          </div>
        </div>
      </div>
    </div>
  </header>
  );
};
const getIcon = (section) => {
  switch (section) {
    case 'convert':
      return <IconCoins className={`Currency-icon`  } />;
    case 'send':
      return <IconSend className={`Currency-icon` } />;
    case 'charts':
      return <IconChartBar className={`Currency-icon` } />;
    case 'alerts':
      return <IconBell className={`Currency-icon` }/>;
    default:
      return null;
  }
};
export default Header; 
