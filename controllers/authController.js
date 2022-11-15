const catchAsync = require('../utils/catchAsync');
const randomString = require('../utils/randomString');

/**
 * Gets userId from cookie if cookie exists & stores it in req.userId
 * If cookie doesn't exist, creates new cookie with the value of, userId & sets req.userId to the userId that was made
 */
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  //we need cookie-parser to get cookies from the browser, but not to write cookies
  if (req.cookies.user) {
    //authenticate users send by cookies & not only via authorization header
    req.userId = req.cookies.user;
    return next(); //exit function
  }

  // maxAge: 360 days
  const cookieOptions = { expires: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000), httpOnly: true, secure: req.secure || req.headers['x-forwarded-proto'] === 'https' };
  res.cookie('user', randomString(15), cookieOptions);
  req.userId = req.cookies.user;

  return next();
});
