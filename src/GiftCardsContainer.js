import React from "react";
import GiftCard from "./GiftCard";
import api from './api';

class GiftCardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCard: false,
      cardNumber: "",
      isValidCardNumber: true,
      securityCode: "",
      isValidSecurityCode: true,
      submittedCards: []
    };
  }

  clearForm = () => {
    this.setState(() => ({
      cardNumber: "",
      isValidCardNumber: true,
      securityCode: "",
      isValidSecurityCode: true,
    }))
  };

  validate = () => {
    const { cardNumber, securityCode } = this.state;
    return api.validateCard(cardNumber.replace(/\D/g,''), securityCode.replace(/\D/g,''));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.validate().then(res => {
      if (res.isValidCardNumber && res.isValidSecurityCode) {
        this.setState(prevState => ({
          cardNumber: "",
          isValidCardNumber: true,
          securityCode: "",
          isValidSecurityCode: true,
          submittedCards: [
            ...prevState.submittedCards,
            {
              cardNumber: prevState.cardNumber,
              discount: res.discount,
            }
          ]
        }));
      } else {
        this.setState(prevState => ({
          cardNumber: res.cardNumber,
          isValidCardNumber: res.isValidCardNumber,
          securityCode: res.securityCode,
          isValidSecurityCode: res.isValidSecurityCode,
        }));
      }
    });

  };


  render() {
    const {
      isCard,
      cardNumber,
      isValidCardNumber,
      securityCode,
      isValidSecurityCode,
      submittedCards
    } = this.state;
    return (
      <section className="container">
        <h1 className="header">Gift Cards</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="checkbox">
            <input
              className="checkbox"
              id="gift_checkbox"
              name="isCard"
              type="checkbox"
              checked={isCard}
              onChange={this.handleInputChange}
            />
            <label for="gift_checkbox">Do you have a gift card?</label>
          </div>
          {isCard && (
            <section>
              <h2 className="header header--secondary">
                Please enter the 19-digit number and code from your gift card
                below.
              </h2>
              {submittedCards.map((card, index) => (
                <GiftCard
                  key={`${card.cardNumber}_${index}`}
                  cardNumber={card.cardNumber}
                  discount={card.discount}
                />
              ))}
              <div>
                <input
                  className={`input ${isValidCardNumber ? '' : "error"}`}
                  name="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={this.handleInputChange}
                />
                <input
                  className={`input input--small ${isValidSecurityCode ? '' : "error"}`}
                  name="securityCode"
                  type="text"
                  value={securityCode}
                  onChange={this.handleInputChange}
                />
              </div>
              <button className="button" type="submit">Apply</button>
            </section>
          )}
        </form>
      </section>
    );
  }
}

export default GiftCardsContainer;
