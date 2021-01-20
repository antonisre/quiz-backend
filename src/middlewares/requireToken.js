const { validateToken } = require('../util/tokenHandler');
const responseHandler = require('../util/responseHandler');

const requireToken = async (req, res, next) => {
    const token = req.headers.token;

    try {
        const userData = validateToken(token);
        req.user = userData.data;
        next();
    } catch (err) {
        console.log(err);
        responseHandler.errorResponse(res, err)
    }
}

module.exports = requireToken;