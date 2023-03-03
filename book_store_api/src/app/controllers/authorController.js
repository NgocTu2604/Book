const AuthorModel = require("../models/authorModel");
const AuthorController = {
  getAllAuthor: async (req, res) => {
    try {
      await AuthorModel.find().then((data) => {
        
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "getAllAuthor " + error });
    }
  },


  detail: async (req, res) => {
    try {
      await AuthorModel.findOne({ slug: req.params.slug }).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "detailAuthor " + error });
    }
  },


  create: async (req, res) => {
    try {
      const nameCheck = req.body.name.toLowerCase().split(" ").join("-");
      const checkAmount = await AuthorModel.count({ slug: nameCheck });
      if (checkAmount == 0) {
        const author = new AuthorModel(req.body);
        await author.save().then(() => {
          return res.status(200).json({ msg: "Create new author success!!!" });
        });
      } else {
        return res.status(403).json({ msg: "Ten da ton tai" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "createAuthor " + error });
    }
  },


  update: async (req, res) => {
    try {
      await AuthorModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        return res.status(200).json({ msg: "update sccess" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "updateAuthor " + error });
    }
  },

  
  delete: async (req, res) => {
    try {
      await AuthorModel.deleteOne({ _id: req.params.id }).then(() => {
        return res.status(200).json({ msg: "delete success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "deleteAuthor " + error });
    }
  },
};
module.exports = AuthorController;
