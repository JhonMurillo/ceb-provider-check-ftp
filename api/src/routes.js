const express = require('express');
const router = express.Router();

module.exports = () => {
  //index
  const indexRouter = express.Router();
  /* istanbul ignore next */
  indexRouter.get('/', function (req, res) {
    console.log("testng")
    res.status(200).json({ response: 'API is working properly.' });
  });

  // ftp
  const ftpRouter = express.Router();
  const ftpController = require('./controllers/ftp');
  ftpRouter.get(
    '/', ftpController.getServices
  );

  router.use('/', indexRouter);
  router.use('/ftp', ftpRouter);
  return router;
};