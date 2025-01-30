const jwt = require('jsonwebtoken');

// Secret key for signing the token (keep it secure and private)
const SECRET_KEY = "ab5efd0e862237b0ecd49460a68629d116395705e255bd16668486ab33cc38db";

// 1. Encode (Sign) the Token without expiration
const data = { id: 'exmapleId', username: "exampleUser" }; // Data to encode
const token = jwt.sign(data, SECRET_KEY); // No 'expiresIn' option
console.log("Encoded Token (No Expiration):", token);

// 2. Decode (Verify) the Token
try {
  const decodedData = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4bWFwbGVJZCIsInVzZXJuYW1lIjoiZXhhbXBsZVVzZXIiLCJpYXQiOjE3MzgwNjgzMjR9.4uApvwpxU7KrxBTtKFNiiZEopT8c2RJJcrk3EbsVCYs', SECRET_KEY); // Verify the token
  console.log("Decoded Data:", decodedData);
} catch (err) {
  console.error("Invalid or expired token");
}

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJtb3Rzd2lyaTAyM0BzdHVkZW50LndldGhpbmtjb2RlLmNvLnphIiwidG9rZW5JZCI6IjY3OGE1N2E5M2QyZjdkNTNlZjE4Y2Q1MSIsImlhdCI6MTczODA2ODE1N30.2F1OcKXJZIPKD06ZT3DSBV_dUVelr0LQl7mwDxUh81o'
