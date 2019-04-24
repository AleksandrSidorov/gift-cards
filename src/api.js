import { fetch } from 'whatwg-fetch';
const baseUrl = 'http://localhost:1234';

function validateCard(cardNumber, securityCode) {
  const data = JSON.stringify({ cardNumber, securityCode });
  return fetch(`${baseUrl}/validate/`, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: data
  }).then(res => res.json());
}

export default {
  validateCard,
};
