module.exports = {
    accessToken: {
        algorithm: 'HS256',
        secret: process.env.JWT_SECRET || 'emergence-secret-key',
        expiresIn: 86400 // in seconds - 24h
    }
};
