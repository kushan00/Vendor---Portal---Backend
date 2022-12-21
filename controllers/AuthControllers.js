const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");

const Admin = require("../models/adminModel.js");


var jwtSecret = "mysecrettoken";

const registerAdmin = async (req, res) => {

  const { 
        fullName, 
        email, 
        password,  
        mobileno,   
    } = req.body;


    
  try {
    // See if user exists
    let user = await Admin.findOne({ email });

    if (user) {
      apiResponse.AlreadyExists(res,"User already exists",{user : user?.fullName});
      return 0; 
    }


    user = new Admin({
        fullName, 
        email, 
        password,  
        mobileno, 
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      apiResponse.Success(res,"Register Success",{ token, userRole: user.userRole, user: user.fullName , userID : user.gym_id , _id:user?._id  })
    });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const authAdmin = async (req, res) => {
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) 
    {    
      apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
      return 0;      
    }
    apiResponse.Success(res,"Auth Success",{ user: user })
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const loginAdmin = async (req, res) => {

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await Admin.findOne({ email });

    if (!user) 
    {
      apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
      return 0; 
    }
  

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
    }

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
      if (err) throw err;
      apiResponse.Success(res,"Login Success",{ token, userRole: user.userRole , user: user.fullName , userID : user?.gym_id ? user?.gym_id : "" , _id:user?._id  })
    });
  } catch (err) {
    console.log(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};


const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, mobileno, email } = req.body;

  const filter = { _id: id };
  const update = { 
       fullName: fullName,
       mobileno:mobileno,
       email : email,    
      };

  try {
  
  let data = await Admin.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"Admin Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}



module.exports = {
  registerAdmin,
  authAdmin,
  loginAdmin,
  updateAdmin,
};
