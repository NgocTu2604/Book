const BookModel = require("../models/bookModel");
const TypeModel = require("../models/typeModel");
const AuthorModel = require("../models/authorModel");
const PublisherModel = require("../models/publisherModel");

const APIfeatures = require("../lib/APIfeatures");

const BookController = {


  getAllBook: async (req, res) => {
    try {
      if (req.query.type) {
        req.query.type = await TypeModel.findOne({ slug: req.query.type }).then(
          (data) => data._id
        );
      }
      if (req.query.author) {
        req.query.author = await AuthorModel.findOne({
          slug: req.query.author,
        }).then((data) => data._id);
      }
      const features = new APIfeatures(
        BookModel.find().populate("idType idAuthor idPublisher"),
        req.query
      )
        .paginating()
        .typing()
        .authoring()
        .searching();
      const books = await features.query.then((data) => data);
      return res.status(200).json(books);
    } catch (err) {
      return res.status(500).json({ msg: "getAllBook: " + err.message });
    }
  },


  findByName: async (req, res) => {
    try {
      await BookModel.find({
        slug: { $regex: ".*" + req.query.name + ".*" },
      })
        .populate("idType idAuthor idPublisher")
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(500).json({ msg: "findByName: " + err.message });
    }
  },


  detail: async (req, res) => {
    try {
      await BookModel.findOne({ slug: req.params.slug })
        .populate("idType idAuthor idPublisher")
        .then((data) => {
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(500).json({ msg: "bookdetail: " + err.message });
    }
  },


  create: async (req, res) => {
    try {
      const nameCheck = req.body.name.toLowerCase().split(" ").join("-");
      const bookCheck = await BookModel.count({ slug: nameCheck });
      if (bookCheck == 0) {
        const book = new BookModel(req.body);
        book.qty = 0;
        await book.save().then(() => {
          return res.status(200).json({ msg: "Create new book success!!!" });
        });
      } else {
        return res.status(403).json({ msg: "Ten da ton tai" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "createBook: " + error.message });
    }
  },


  update: async (req, res) => {
    try {
      await BookModel.updateOne({ _id: req.params.id }, req.body).then(() => {
        return res.status(200).json({ msg: "Update book success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "updateBook" + error.message });
    }
  },


  delete: async (req, res) => {
    try {
      await BookModel.deleteOne({ _id: req.params.id }).then(() => {
        return res.status(200).json({ msg: "Delete book success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "deleteBook" + err.message });
    }
  },

  
  addAmount: async (req, res) => {
    try {
      await BookModel.findById(req.body.id).then((data) => {
        data.qty += req.body.amount;
        data.save();
        return res.status(200).json({ msg: "Them sl thanh cong" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "addAmount: " + err });
    }
  },
  //8. check số lượng: kiểm tra sl trong giỏ của khách vs db
  checkAmount: async (req, res) => {
    try {
      const id = req.params.id;
      const amount = req.query.amount;
      await BookModel.findById(id).then((data) => {
        if (amount > data.qty) {
          return res.status(403).json({ msg: "So luong khong du" });
        } else {
          return res.status(200).json({ msg: "Them thanh cong" });
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: "checkAmount: " + error });
    }
  },
};
module.exports = BookController;
