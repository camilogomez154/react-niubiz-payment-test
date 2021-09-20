import { useEffect } from 'react';
import axios from 'axios'
import './App.css';

declare let payform: any;

const configuration = async () => {

  const { data } = await axios.get("https://xoack6yv49.execute-api.us-east-1.amazonaws.com/dev/clinic-360/appointment/payment/session/ce028aa4-00eb-4107-ade4-d16ec9761a97") 
  console.log(data)

  const config = {
    font: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap",
    sessionkey: data.session.tokens.sesionToken,
    purchasenumber: "00000000",
    merchantid: "602545705",
    channel: "MOBILE",
    language: "es",
    amount: "5.0",
  };

  payform.setConfiguration(config);
}

const initialize = async () => {

  await configuration();

  const styles: any = {
    style: {
      base: {
        iconColor: "#E4E5ED",
        color: "#131336",
        fontWeight: 400,
        fontFamily: "'Poppins'",
        fontSize: "14px",
        fontSmoothing: "antialiased",
        placeholder: {
          color: "#9194A7",
        },
        autofill: {
          color: "#9194A7",
        },
      },
      invalid: {
        color: "#131336",
        "::placeholder": {
          color: "#131336",
        },
      }
    }
  }

  const cardNumber = await payform.createElement(
    "card-number",
    styles,
    "payment-card-number",
    "Ingresa tu número de tarjeta"
  );

  const cardCVV = await payform.createElement(
    "card-cvc",
    styles,
    "payment-card-cvv",
    "CVV"
  );

  const cardExpire = await payform.createElement(
    "card-expiry",
    styles,
    "payment-card-expiry",
    "MM/AA"
  );

  console.log({ cardNumber, cardCVV, cardExpire })

}

const addScript = () => {
  const script = document.createElement("script");
  script.src = "https://pocpaymentserve.s3.amazonaws.com/payform.js";
  script.id = "auna-button-payment";
  script.type = "text/javascript";
  script.onload = () => initialize();
  document.body.appendChild(script);
}

function App() {

  useEffect(
    () => {
      addScript()
    },
    []
  )

  return (
    <div className="App">
      <div id="payment-card-number"></div>
      <div id="payment-card-cvv"></div>
      <div id="payment-card-expiry"></div>
    </div>
  );
}

export default App;
