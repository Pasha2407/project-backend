const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const userModel = require("../models/schemas/user");

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { displayName, picture, email } = profile;
    const user = await userModel.findOne({ email });

    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 8);
    const dateOfBirth = new Date();
    const newUser = await userModel.create({
      email,
      password,
      name: displayName,
      avatarURL: picture,
      dateOfBirth,
      adult: true,
      signinCount: 0,
    });

    done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
