import pkg from 'jsonwebtoken';
import { jwtSecretKey } from '../../config/index.js';
const { sign } = pkg;

export function signAccessToken(userId) {
  const accessToken = sign(
    { _id: userId },
    jwtSecretKey,
    {
      expiresIn: '1d',
    }
  );
  return accessToken;
}
