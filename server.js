const jwt = require('jsonwebtoken');

// Secret key for signing the token (keep it secure and private)
const SECRET_KEY = "ab5efd0e862237b0ecd49460a68629d116395705e255bd16668486ab33cc38db";

// 1. Encode (Sign) the Token without expiration
const data = { id: 'exmapleId', username: "exampleUser" }; // Data to encode
const token = jwt.sign(data, SECRET_KEY); // No 'expiresIn' option
console.log("Encoded Token (No Expiration):", token);

// 2. Decode (Verify) the Token
try {
  const decodedData = jwt.verify(token, SECRET_KEY); // Verify the token
  console.log("Decoded Data:", decodedData);
} catch (err) {
  console.error("Invalid or expired token");
}
