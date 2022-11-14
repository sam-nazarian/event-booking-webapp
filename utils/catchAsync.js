/**
 * Used to catch any erros in async code (removes need for try/catch), then sends those errors to the global error handing middleware
 * @param {Function} fn Take param fn, and returns a fn
 * @returns the result of 'catchAsync' will be the returned anonymous function
 */
module.exports = catchAsync = (fn) => {
  //If we return a function, then Express will call that function with req, res and next. We in turn can pass those variables to fn(req, res, next).
  return (req, res, next) => {
    //has access to fn function because of closures
    //calling fn, if rejected promise, we go catch
    fn(req, res, next).catch((err) => next(err)); //sends error to global handing middleware
  };
};
