import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";

const BOT_TOKEN = "7060301731:AAFUiEIF-Hs_s5zEwb_kulUMJGkpLLC2dxw";
const CHAT_ID = "-1002035416931";

const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [done, setDone] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2mu5xtl",
        "template_m5udu2c",
        form.current,
        "VLwg1ltOWvnCYAiK_"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleOrder = (e) => {
    e.preventDefault();
    let text = "Buyurtma %0A%0A";
    text += `ФИО: ${name} %0A`;
    text += `Telefon raqami: ${email} %0A`;
    text += `Email: ${message} %0A`;

    let url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;
    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();
    setName("");
    setMessage("");
    setEmail("");
  };

  return (
    <div className="contact-form" id="contact">
      {/* left side */}
      <div className="w-left">
        <div className="awesome">
          {/* darkMode */}
          <span style={{ color: darkMode ? 'white' : '' }}>Get in Touch</span>
          <span>Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form ref={form} onSubmit={(e) => { sendEmail(e); handleOrder(e); }}>
          <input
            className="user"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
          <input
            className="user"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <textarea
            className="user"
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Message"
          />
          <input type="submit" value="Send" className="button" />
          <span>{done && "Thanks for Contacting me"}</span>
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
