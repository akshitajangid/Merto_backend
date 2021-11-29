var jwt = require('jsonwebtoken');
const appConst = require('../common/appConstants')

module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userID
            }
            jwt.sign(payload, appConst.SECRETKEY, { expiresIn: '24h' }, (err, token) => {
                if (err) {
                    resolve({ success: false, error: err })
                } else {
                    resolve({ success: true, token: token })
                }
            })
        })
    },
    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userID
            }
            jwt.sign(payload, appConst.SECRETREFRESHKEY, { expiresIn: '1y' }, (err, token) => {
                if (err) {
                    resolve({ success: false, error: err })
                } else {
                    resolve({ success: true, token: token })
                }
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, appConst.SECRETKEY, function (err, decoded) {
                if (err) {
                    resolve({ success: false, error: err })
                } else {
                    resolve({ success: true, userId: decoded.id })
                }
            });
        })
    }
}