import React from "react";

function GiftCard({ cardNumber, discount }) {
  return (
    <div className="card">
      <div>
        <div>Gift Card</div>
        <div className="card-number">{`**** **** **** ${cardNumber.slice(-4)}`}</div>
      </div>
      <div className="card-discount">{`-€${discount},00`}</div>
    </div>
  );
}

export default GiftCard;
