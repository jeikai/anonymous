const Post = require("../model/postModel")

module.exports.addpost = async (req, res, next) => {
  try {
    let image = req.body.postImage
    let userName = req.body.userName
    const usernameCheck = await Post.findOne({ userName });

    if (image != "default.jpg") {
      let check = image.substring(2, 3)
      let array = image.split(check)
      image = array[array.length - 1]
    }
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    } else {
      const post = await Post.create({
        userName: req.body.userName,
        gender: req.body.gender,
        age: req.body.age,
        title: req.body.title,
        favorite: req.body.favorite,
        description: req.body.description,
        postImg: image
      });
      post.save()
      return res.json({ status: true, post });
    }
  } catch (e) {
    next(e)
  }
}

module.exports.getAllPosts = async (req, res, next) => {
  try {
    // $ne: tìm kiếm các giá trị không bằng giá trị ID đã cho
    const posts = await Post.find({ userName: { $ne: req.params.id } }).select([
      "postImg",
      "userName",
      "title",
      "favorite",
      "description",
      "gender",
      "age"
    ]);
    return res.json(posts);
  } catch (ex) {
    next(ex);
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    // $ne: tìm kiếm các giá trị không bằng giá trị ID đã cho
    const posts = await Post.find({ userName: req.params.name }).select([
      "postImg",
      "userName",
      "title",
      "favorite",
      "description",
      "gender",
      "age"
    ]);
    return res.json(posts);
  } catch (ex) {
    next(ex);
  }
};
module.exports.searchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userName: req.body.search });
    if (posts.length < 1) {
      console.log("Không thấy")
      return res.json({ msg: "Không tìm thấy người dùng", status: false });
    }
    console.log(posts)
    return res.json({ posts, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updatePosts = async (req, res, next) => {
  try {
    let post = {}
    post.title = req.body.title
    post.favorite = req.body.favorite
    post.description = req.body.description
    
    let name = req.params.name
    const data = await Post.updateOne( {userName: name}, {$set :{
      title: post.title,
      favorite: post.favorite,
      description: post.description
    }})
    console.log(data)
    return res.json({ status: true })
  } catch (ex) {
    next(ex);
  }
};