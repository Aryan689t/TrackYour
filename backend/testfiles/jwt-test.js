import jsonwebtoken from "jsonwebtoken";

const payload={
    userId:7
};

const token =jsonwebtoken.sign(
    payload,"my-super-secret-identity"
);

console.log(token);

const decoded = jsonwebtoken.verify(
    token,
    "my-super-secret-identity"
);

console.log(decoded);

//const decoded = jsonwebtoken.decode(token);

//console.log(decoded);