const { sendResponse } = require("../utils/responseHandler");
const HTTP_STATUS = require("../constants/http_codes");
const AuthService = require("../service/authService");

class AuthController {
  async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const existingEmailInAuth = await AuthService.existingEmail(email);
      if (existingEmailInAuth) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "User with this email already registered!"
        );
      }
      const authenticated = await AuthService.signup(username, email, password);

      if (authenticated) {
        return sendResponse(
          res,
          HTTP_STATUS.CREATED,
          "Successfully signed up.",
          authenticated
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Failed to signed up"
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }
  async verifyEmail(req, res) {
    try {
      const { token,userId } = req.params;
      const result = await AuthService.verifyemail(token,userId);
      if (result) {
        return sendResponse(
          res,
          HTTP_STATUS.CREATED,
          "Successfully Verified!.",
          result
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Failed to Verified. Try Again."
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error",error
      );
    }
  }
}

module.exports = new AuthController();
