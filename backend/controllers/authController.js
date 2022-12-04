const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//create the token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

//send the token
const createSendToken = (login, statusCode, req, res) => {
  const token = signToken(login.userId);

  res.cookie("jwtToken", token, {
    expires: new Date(
      Date.now() + 3600000 //1 hour
    ),
    httpOnly: true,
  });
  res.status(statusCode).json({
    status: "success",
    token,
    login,
  });
};
//authentication
exports.protect = catchAsync(async (req, res, next) => {

  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.cookies.jwtToken) {
    token = req.cookies.jwtToken;
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded)
  const currentUser = await User.findOne({userId:decoded.id});
  console.log("xxx",currentUser)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

// login user
exports.Login = catchAsync(async (req, res, next) => {
  const login=await User.findOne({userId:req.body.userId})
  if(login){
    createSendToken(login,200,req,res)
  }else{
    return next(new AppError("No user registered with this id", 400))
  }
})
