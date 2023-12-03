import {
  IconCoins,
  IconSend,
  IconChartBar,
  IconBell
} from "@tabler/icons-react";
import '../Styles/Header.css';
import Convert from "./Convert";


const Header = () => {


//   <div className='con text-center text-white'>
//   <h1>Xe Currency Converter</h1>
//   <p>Check live foreign currency exchange rates</p>
// </div>
  return (
    <>
      <header id='home'>
        <div className='header-image-box'>

        <div className='con'>
        <div className='header-text'>
          <h1>Xe Currency Converter</h1>
          <p>Check live foreign currency exchange rates</p>
        </div>
        <div className='convert-con'>

          <div className='currency-top'>
            <div className='currency-top-sections'><a href="$" className="currency-link"><IconCoins className="Currency-icon"/>Convert</a></div>
            <div className='currency-top-sections'><a href="$" className="currency-link"><IconSend className="Currency-icon"/>Send</a></div>
            <div className='currency-top-sections'><a href="$" className="currency-link"><IconChartBar className="Currency-icon"/>Charts</a></div>
            <div className='currency-top-sections'><a href="$" className="currency-link"><IconBell className="Currency-icon"/>Alerts</a></div>
          </div>

          <div className='currency-bot'>
            <Convert/>
          </div>

        </div>



        </div>
        
        </div>

      </header>
    </>
  );
};

export default Header; 
