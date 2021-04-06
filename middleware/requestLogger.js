const showInfoBeautiful = require('../utils/showInfoBeautiful.js')
module.exports = function requestLogger(req, res, next) {
    const {
        url
    } = req;
    showInfoBeautiful("request:" + url);
    next();
}