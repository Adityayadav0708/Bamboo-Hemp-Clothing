const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('../models');
const store = require('../services/storeService');

const JWT_SECRET = process.env.JWT_SECRET || 'bamboo_hemp_secure_jwt_dev_secret_2026';

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required to access this resource.' }
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = null;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(decoded.userId).select('-password');
      } catch (e) {
        // Fall through to store check
      }
    }

    if (!user) {
      user = store.getUserById(decoded.userId);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'User session is invalid or user was removed.' }
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { code: 'TOKEN_EXPIRED', message: 'Session has expired or token is invalid.' }
    });
  }
};

const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required.' }
      });
    }

    if (req.user.role === 'admin' || req.user.role === 'super_admin' || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'You do not have permission to perform this administrative action.' }
    });
  };
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      _id: decoded.userId,
      role: decoded.role,
      email: decoded.email
    };
  } catch (err) {
    // Ignore invalid token on optional auth
  }
  next();
};

module.exports = {
  requireAuth,
  optionalAuth,
  requireRole,
  JWT_SECRET
};
