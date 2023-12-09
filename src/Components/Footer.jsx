import { IconMailFilled, IconHome, IconPhone } from "@tabler/icons-react";
import "../Styles/Footer.css";

const footerLinks = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "Market",
    link: "#market",
  },
  {
    name: "Choose Us",
    link: "#chooseUs",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

function Footer() {
  const isOdd = footerLinks.length % 2 !== 0;

  return (
    <footer>
      <div className="con">
        <div className="row">
          <div className="col-md-4 d-flex flex-column align-items-start">
            <h3 className="footer-h3">Contact Us</h3>

            <a href="#" className="footer-contact">
              {" "}
              <IconMailFilled className="footer-icon" /> Coinycurrency@gmail.com
            </a>
            <a href="#" className="footer-contact">
              <IconHome className="footer-icon" /> 123 Street, Kaunas, Lithuania
            </a>
            <a href="#" className="footer-contact">
              <IconPhone className="footer-icon" />
              Phone: 866 666 666
            </a>
          </div>
          <div className={`col-md-4`}>
            <h3 className="footer-h3">Useful Links</h3>
            <div className="row">
              <div className="col-md-6">
                <ul>
                  {footerLinks
                    .slice(
                      0,
                      isOdd
                        ? footerLinks.length / 2 + 1
                        : footerLinks.length / 2,
                    )
                    .map((item, index) => (
                      <li key={index}>
                        <a className="footer-link" href={item.link}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col-md-6">
                <ul>
                  {footerLinks
                    .slice(
                      isOdd
                        ? footerLinks.length / 2 + 1
                        : footerLinks.length / 2,
                    )
                    .map((item, index) => (
                      <li key={index}>
                        <a className="footer-link" href={item.link}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3 className="footer-h3">Subscribe Newsletter</h3>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn bg-blue">
                  Subscribe
                </button>
              </div>
              <div className="social-icons-box">
                <p href="#" className="fa fa-facebook social-icon"></p>
                <p href="#" className="fa fa-twitter social-icon"></p>
                <p href="#" className="fa fa-instagram social-icon"></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
