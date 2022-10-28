const app = require("./app");
require('dotenv').config();
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});