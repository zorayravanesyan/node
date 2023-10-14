const isAdmin = (req, res, next) => {
    if (req.identity.is_admin) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Only admins allowed.' });
    }
};

module.exports = isAdmin;