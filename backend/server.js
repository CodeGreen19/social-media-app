const app = require("./app");
const { connectDatabase } = require("./config/dataBase");
const cors = require("cors");

connectDatabase();

app.use(cors());

app.listen(process.env.PORT || 4001, () => {
  console.log(`server is working PORT: ${process.env.PORT}`);
});
