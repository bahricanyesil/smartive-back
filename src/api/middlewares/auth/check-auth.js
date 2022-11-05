import jwt from 'jsonwebtoken';
import pkg from 'mongoose';
import { jwtSecretKey } from '../../../config/index.js';
import { User } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';
const { Types } = pkg;
const { verify } = jwt;

export default async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json(errorHelper('00006', req));

  if (token.includes('Bearer'))
    token = req.header('Authorization').replace('Bearer ', '');

  try {
    req.user = verify(token, jwtSecretKey);
    if (!Types.ObjectId.isValid(req.user._id))
      return res.status(400).json(errorHelper('00007', req));

    const exists = await User.exists({ _id: req.user._id, isActivated: true })
      .catch((err) => {
        return res.status(500).json(errorHelper('00008', req, err.message));
      });

    if (!exists) return res.status(400).json(errorHelper('00009', req));

    next();
  } catch (err) {
    return res.status(401).json(errorHelper('00012', req, err.message));
  }
};
