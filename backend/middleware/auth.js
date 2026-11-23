const jwt = require('jsonwebtoken');
const store = require('../services/storeService');

const JWT_SECRET = process.env.JWT_SECRET || 'bamboo_hemp_secure_jwt_dev_secret_2026';

const requireAuth = (req, res, next) => {
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
    const user = store.getUserById(decoded.userId);
    if (!user || user.status === 'suspended') {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'User session is invalid or has been suspended.' }
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

    if (req.user.role === 'super_admin' || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'You do not have permission to perform this administrative action.' }
    });
  };
};

module.exports = {
  requireAuth,
  requireRole,
  JWT_SECRET
};
