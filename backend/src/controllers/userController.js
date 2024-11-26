import userModel from '../models/userModel.js';
import jsonwebtoken from 'jsonwebtoken';
import {
  error,
  badRequest,
  ok,
  created,
  unauthorize,
  notfound,
} from '../handlers/responseHandler.js';

const signUp = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser) return badRequest(res, 'username already used');

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select('username password salt id displayName');

    if (!user) return badRequest(res, 'User not exist');

    if (!user.validPassword(password)) return badRequest(res, 'Wrong password');

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    user.password = undefined;
    user.salt = undefined;

    created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select('password id salt');

    if (!user) return unauthorize(res);

    if (!user.validPassword(password)) return badRequest(res, 'Wrong password');

    user.setPassword(newPassword);

    await user.save();

    ok(res);
  } catch {
    error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return notfound(res);

    ok(res, user);
  } catch {
    error(res);
  }
};

export { signUp, signIn, getInfo, updatePassword };
