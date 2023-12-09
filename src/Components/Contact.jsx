import "../Styles/Contact.css";
import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";
const Contact = () => {
  return (
    <div id="contact">
      <div className="Contact-us con">
        <div className="Contact-us-container">
          <div className="Contact-us-container-form">
            <form
              className="Send-form"
              action="https://formsubmit.co/463816f670e58b02d689e7b3bfc14222"
              method="POST"
            >
              <h4 className="Send-text dark-blue">SEND US A MESSAGE</h4>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tom"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="I need help with..."
                required
              ></textarea>

              <button type="submit">SEND</button>
            </form>
          </div>
          <div className="Contact-us-container-info">
            <div className="Contact-us-container-info-box">
              <h4 className="Send-text dark-blue">CONTACT INFO</h4>
              <h4 className="color-green mt-5">Email Us At</h4>
              <a className="Contact-links color-blue" href="mailto:">
                Coinycurrency@gmail.com
              </a>
              <h4 className="color-green mt-5">Follow us</h4>
              <a href="#">
                <IconBrandTwitter className="icon color-blue" />
                <IconBrandDiscord className="icon color-blue m-1" />
                <IconBrandInstagram className="icon color-blue" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
