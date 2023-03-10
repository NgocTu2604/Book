const TypeModel = require("../models/typeModel");
const TypeController = {
  
  getAllType: async (req, res) => {
    try {
      await TypeModel.find().then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "getAllType " + error });
    }
  },
  
  detail: async (req, res) => {
    try {
      await TypeModel.findOne({ slug: req.params.slug }).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "detailType " + error });
    }
  },
  
  create: async (req, res) => {
    try {
      const nameCheck = req.body.name.toLowerCase().split(" ").join("-");
      const checkAmount = await TypeModel.count({ slug: nameCheck });
      if (checkAmount == 0) {
        const type = new TypeModel(req.body);
        await type.save().then(() => {
          return res.status(200).json({ msg: "Create new type success!!!" });
        });
      } else {
        return res.status(403).json({ msg: "Ten da ton tai" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "createType " + error });
    }
  },
  
  update: async (req, res) => {
    try {
      await TypeModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        return res.status(200).json({ msg: "update sccess" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "updateType " + error });
    }
  },
  
  delete: async (req, res) => {
    try {
      await TypeModel.deleteOne({ _id: req.params.id }).then(() => {
        return res.status(200).json({ msg: "delete success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "deleteType " + error });
    }
  },
};
module.exports = TypeController;
