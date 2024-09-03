const crypto = require("crypto");

// Generate a 32-byte random string (256 bits)
const secret = crypto.randomBytes(32).toString("hex");

console.log(secret);
