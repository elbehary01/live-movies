import jsonwebtoken from 'jsonwebtoken';
import { unauthorize } from '../handlers/responseHandler.js';
import userModel from '../models/userModel.js';

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return unauthorize(res);

  req.user = user;

  next();
};

export { auth, tokenDecode };
