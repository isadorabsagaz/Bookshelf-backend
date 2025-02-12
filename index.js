const app = require('./src/server.js');
const port = app.get("port");

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`http://localhost:${port}`);
});