const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected to mongoDB`))
    .catch((err) => console.log(err));
};
