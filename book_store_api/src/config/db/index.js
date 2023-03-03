const mongoose = require("mongoose");
const url = "mongodb+srv://Chuong:123@bookshop.nufh6zv.mongodb.net/bookshop?retryWrites=true&w=majority"
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect Failure");
  }
}
module.exports = { connect };
