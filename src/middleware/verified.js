const isVerified = (req, res, next) => {
    if (req.identity.is_verified) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Only verified users allowed.' });
    }
};

module.exports = isVerified;
