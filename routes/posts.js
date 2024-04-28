const express = require("express");
const postRouter = express.Router();
const { resSuccessWrite } = require("../module/resModule");
const Post = require("../model/PostModel");
const appError = require("../service/appError");
const handErrorAsync = require("../service/handErrorAsync");


postRouter.get(`/post`, handErrorAsync(async (req, res) => {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const data = await Post.find(q).populate({
      path: "user1",
      select: "name photo",
    }).sort(timeSort);
    resSuccessWrite(res, 200, data);

}));

postRouter.post("/post", handErrorAsync(async (req, res, next) => {
  if (req.body.content == undefined) {
    return next(appError(400, "你沒有填寫 content 資料"))
  }

  const newPost = await Post.create(req.body);
  resSuccessWrite(res, 200, newPost);
}));


module.exports = postRouter;
