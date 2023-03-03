const PublisherModel = require("../models/publisherModel");
const PublisherController = {
  
  getAllPublisher: async (req, res) => {
    try {
      await PublisherModel.find().then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "getAllPublisher " + error });
    }
  },
  
  detail: async (req, res) => {
    try {
      await PublisherModel.findOne({ slug: req.params.slug }).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: "detailPublisher " + error });
    }
  },
  
  create: async (req, res) => {
    try {
      const nameCheck = req.body.name.toLowerCase().split(" ").join("-");
      const checkAmount = await PublisherModel.count({ slug: nameCheck });
      if (checkAmount == 0) {
        const publisher = new PublisherModel(req.body);
        await publisher.save().then(() => {
          return res
            .status(200)
            .json({ msg: "Create new publisher success!!!" });
        });
      } else {
        return res.status(403).json({ msg: "Ten da ton tai" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "createPublisher " + error });
    }
  },
  
  update: async (req, res) => {
    try {
      await PublisherModel.findByIdAndUpdate(req.params.id, req.body).then(
        () => {
          return res.status(200).json({ msg: "update sccess" });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: "updatePublisher " + error });
    }
  },
  
  delete: async (req, res) => {
    try {
      await PublisherModel.deleteOne({ _id: req.params.id }).then(() => {
        return res.status(200).json({ msg: "delete success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "deletePublisher " + error });
    }
  },
};
module.exports = PublisherController;
