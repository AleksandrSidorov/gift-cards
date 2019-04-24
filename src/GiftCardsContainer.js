import React from "react";
import GiftCard from "./GiftCard";

class GiftCardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCard: false,
      cardNumber: "",
      securityCode: "",
      submittedCards: []
    };
  }

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
    this.setState(prevState => ({
      submittedCards: [
        ...prevState.submittedCards,
        {
          cardNumber: prevState.cardNumber,
          discount: 20
        }
      ]
    }));
  };

  render() {
    return (
      <>
        <div>Gift</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Do you have a gift card?
            <input
              name="isCard"
              type="checkbox"
              checked={this.state.isCard}
              onChange={this.handleInputChange}
            />
          </label>
          {this.state.isCard && (
            <>
              <p>
                Please enter the 19-digit number and code from your gift card
                below.
              </p>
              {this.state.submittedCards.map(card => (
                <GiftCard
                  key={card.cardNumber}
                  cardNumber={card.cardNumber}
                  discount={card.discount}
                />
              ))}
              <input
                name="cardNumber"
                type="text"
                value={this.state.cardNumber}
                onChange={this.handleInputChange}
              />
              <input
                name="securityCode"
                type="number"
                value={this.state.securityCode}
                onChange={this.handleInputChange}
              />
              <button type="submit">Apply</button>
            </>
          )}
        </form>
      </>
    );
  }
}

export default GiftCardsContainer;
