'use strict';

const HttpCodes = {

    // Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,

    // Success

    OK: 200,
    CREATED: 201,

    // Redirection
    MOVED_PERMANENTLY: 301,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

const CustomErrors = {
    MISSING: 'is missing',
    NOT_FOUND: 'not found',
    INVALID: 'invalid',
    ALREADY_EXISTS: 'already exists',
};

/**
 * Response helper
 */
class Response {
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     */
    constructor(req, res) {
        this.res = res;
        this.statusCode = HttpCodes.INTERNAL_SERVER_ERROR;
        this.response = {
            'success': false
        };
    }

    /**
     * Set response data
     * @param {Object} data
     * @return {Response}
     */
    data(success, message, data) {
        this.response.success = success;
        this.response.data = data;
        this.response.message = message;
        return this;
    }

    Pagingdata(success, message, data,total,page) {
        this.response.success = success;
        this.response.message = message;
        this.response.data = data;
        this.response.total = total;
        this.response.totalPage = page;
        return this;
    }

    /**
     * Set error message
     * @param {String} field
     * @param {String} message
     * @return {Response}
     */
    error(message) {
        this.response.message = message;
        this.response.success = false;
        this.response.data = null;
        return this;
    }

    /**
     * Set response status code
     * @param {Integer} code
     * @return {Response}
     */
    status(code) {
        this.statusCode = code;
        return this;
    }

    send() {
        this.res.status(this.statusCode).send(this.response);
        return this;
    }

    get() {
        return this.response;
    }
}

exports.Response = Response;
exports.HttpCodes = HttpCodes;
exports.CustomErrors = CustomErrors;
