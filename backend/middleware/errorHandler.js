// Standardized error handler matching PRD Section 52
const errorHandler = (err, req, res, next) => {
  console.error('[API Error]', err);

  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 422 : 500);
  const code = err.code || (statusCode === 422 ? 'VALIDATION_ERROR' : 'INTERNAL_SERVER_ERROR');
  const message = err.message || 'An unexpected server error occurred. Please try again.';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      fieldErrors: err.fieldErrors || null,
      requestId: req.headers['x-request-id'] || `req_${Date.now()}`
    }
  });
};

module.exports = errorHandler;
