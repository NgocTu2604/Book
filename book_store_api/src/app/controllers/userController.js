const UserModel = require("../models/userModel");
const UserController = {
  
  register: async (req, res) => {
    try {
      const { name, email, username, password } =
        req.body;
      const count = await UserModel.count({ username: username });
      if (count == 0) {
        const user = new UserModel(req.body);
        user.role = 1;
        user.save();
        return res.status(200).json({ msg: "Register success" });
      } else {
        return res.status(400).json({ msg: "Username is already exists!!!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "register " + error });
    }
  },
  
  loginCustomer: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({
        username: username,
        password: password,
      });
      if (user && user.role == 1) {
        return res.status(200).json({id:user._id, name: user.name});
      } else {
        return res.status(400).json({ msg: "Login failed!!!!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "loginCustomer " + error });
    }
  },
  
  loginAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({
        username: username,
        password: password,
      });
      if (user && user.role == 0) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ msg: "Login failed!!!!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "loginAdmin " + error });
    }
  },
  
  profile: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).then((data) => data);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: "profile " + error });
    }
  },
  
  updateProfile: async (req, res) => {
    try {
      await UserModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        return res.status(200).json({ msg: "Update profile success!!" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "updateProfile " + error });
    }
  },
  
  getAllUser: async (req, res) => {
    try {
      const users = await UserModel.find().then((data) => data);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ msg: "getAllUser " + error });
    }
  },
  
  updateRole: async (req, res) => {
    try {
      const id = req.params.id;
      const role = req.body.role;
      console.log(id + "-" + role);
      await UserModel.findById(id).then((data) => {
        data.role = role;
        data.save();
        return res.status(200).json({ msg: "Update role success" });
      });
    } catch (error) {
      return res.status(500).json({ msg: "updateRole " + error });
    }
  },

  deleteUser: async (req, res) =>{
    try {
        const id = req.params.id;
        await UserModel.deleteOne({_id:id})
            .then(()=>{
                return res.status(200).json({msg: "delete success"});
            })
    } catch (error) {
         return res.status(500).json({ msg: "error Delete " + error });
    }
  }

};
module.exports = UserController;
