const userRouter = require('./user');
const accountRouter = require('./account');
const adminRouter = require('./admin');
const roomRouter = require('./room');
const contactRouter = require('./contact');
const insertRouter = require('./insert');
const serviceRouter = require('./service');
const roomServiceRouter = require('./roomService');
const { notFound, errHandler } = require('../middlewares/errHandler');

const initRouter = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/account', accountRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/room', roomRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/insert', insertRouter);
  app.use('/api/service', serviceRouter);
  app.use('/api/room-service', roomServiceRouter);
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
