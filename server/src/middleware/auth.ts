import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;  // Make sure this matches your .env

if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET_KEY in environment variables');
}

// Middleware to authenticate JWT
type AuthenticatedRequest = Request & { user?: any };

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;  // ✅ Ensures this code path explicitly ends
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
      return;  // ✅ Ensures this code path explicitly ends
    }

    req.user = decoded;
    next();  // ✅ Only successful case hits `next()`
  });

  return;  // ✅ Added a final return just to keep TypeScript 100% happy
};

// Generate JWT Token
export const generateToken = (user: { id: string; username: string }) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};
