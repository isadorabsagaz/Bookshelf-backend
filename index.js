const app = require('./src/server/server.js');
const port = app.get("port");

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    //change to localhost: port (only)
    console.log(`http://localhost:${port}/api/users`);
});