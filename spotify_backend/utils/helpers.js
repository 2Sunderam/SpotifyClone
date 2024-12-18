const jwt = require("jsonwebtoken");
exports= {};

exports.getToken = async () => {
    const token = jwt.sign({identifier: User._id},
        "thisKeyissupposedtobeSecret"
    );
    return token;
};

module.exports = exports;