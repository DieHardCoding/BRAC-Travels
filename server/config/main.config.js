module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGOURL,
  jwtSecret: process.env.JWTSECRET || 'placeholder',
  refreshSecret: process.env.REFRESHSECRET || 'refreshholder',
  tokenLife: process.env.TOKENLIFE || 300,
  refreshLife: process.env.REFRESHLIFE || 86400,
  permissionLevel: {
    NORMAL_USER: 1,
    ADMIN: 2047
  }
}