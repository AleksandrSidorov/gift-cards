const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/validate', (req, res) => {
  let validateCardNumberRegex = /^\d{19}$/;
  let validateSecurityCodeRegex = /^\d{3}$/;

  console.log(req.body);
  res.status(200).jsonp({
    cardNumber: req.body.cardNumber.replace(/(.{4})/g,"$1 ").trim(),
    isValidCardNumber: validateCardNumberRegex.test(req.body.cardNumber),
    securityCode: req.body.securityCode,
    isValidSecurityCode: validateSecurityCodeRegex.test(req.body.securityCode),
    discount: Math.round(Math.random() * 100),
  });
});

server.use(router);
server.listen(1234, () => {
  console.log('JSON Server is running')
});