import bcrypt from "bcrypt";

const testpass=async()=>{
    const password="mypassword123";
    const hashed=await bcrypt.hash(password,10 )//10 is the salt roiund here -It controls how much computational work bcrypt does when generating the hash. Higher → more work → slower hashing.
    console.log(hashed)
    const result= await bcrypt.compare(password,hashed)
    console.log(result)

};
testpass();