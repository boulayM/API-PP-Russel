function skipAuthIfTest(middleware) {
  return process.env.NODE_ENV === "test"
    ? (req, res, next) => next()
    : middleware;
}

module.exports = skipAuthIfTest