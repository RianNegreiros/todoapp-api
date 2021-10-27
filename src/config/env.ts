export default {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'a4c888b5c978c6ea70b14a5d3c414eb7',
  refresh_secret_token: "399e600ff5d1f1acea6d0897ef4b0b42",
  expires_In_token: "15m"
}