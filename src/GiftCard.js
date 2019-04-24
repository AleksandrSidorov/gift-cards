import React from "react";

function GiftCard({ cardNumber, discount }) {
  return (
    <div>
      <p>Gift Card</p>
      <p>{cardNumber}</p>
      <p>{discount}</p>
    </div>
  );
}

export default GiftCard;
