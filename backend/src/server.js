import app from "./app.js";

const PORT=5000;

app.listen(PORT,////"Start listening for incoming HTTP requests on port 5000."
    ()=>{//once the server runs execute this fxn
    console.log(`http://localhost:${PORT}`);
});