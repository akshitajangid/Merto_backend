'use strict';

const ApiV1 = require('./api/v1');

module.exports = (app) => {
    // Load API Routes
    app.use('/v1', new ApiV1(app));
};
