// Route to destroy session
exports.logout = (req, res, next) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out.');
        }
        // Clear the cookie on the client side
        res.clearCookie('connect.sid');
        next();
    });
};
