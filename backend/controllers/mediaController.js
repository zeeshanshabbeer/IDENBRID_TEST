const Media = require("../models/mediaModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.postData = catchAsync(async (req, res, next) => {
  const { img_url, caption } = req.body;
  const blog = await Media.findOne({ img_url });
  if (blog) {
    return next(new AppError("This image already store in database", 400));
  } else {
    const create = Media.create(req.body);
    if (create) {
      res.status(200).json({
        status: "success",
        message: "Created Successfully",
      });
    } else {
      return next(new AppError("Not created", 400));
    }
  }
});
exports.getData = catchAsync(async (req, res, next) => {
  const { userId, access_token } = req.user;
  let myHeaders = new Headers();
  myHeaders.append("Cookie", "csrftoken=em2tGNTcnV3ujmifQ1lNnN3BEJqDEZtz; ig_did=5C6C918F-8643-4BC2-A8A7-179F99280DCE; ig_nrcb=1; mid=Y4WjAwAEAAGL-BidQ6tay-f4r4X0");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`https://graph.instagram.com/${userId}/media?access_token=${access_token}&fields=media_url,caption`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      res.status(200).json({
        status: "success",
        message: result,
      });
    })
    .catch((error) => console.log("error", error));
});
