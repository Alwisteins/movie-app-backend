const app = require("./api/index");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 88;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
