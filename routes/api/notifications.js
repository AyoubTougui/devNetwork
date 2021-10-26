const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");
const Notification = require("../../models/Notification");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route POST api/notifications
// @desc create notification
// @access private
// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("type", "Type is required").not().isEmpty(),
//       check("user_from", "user_from ID is required").not().isEmpty(),
//       check("user_to", "user_to ID is required").not().isEmpty(),
//       check("post", "Post ID is required").not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const userFrom = await User.findById(req.body.user_from).select("-password");
//       const userTo = await User.findById(req.body.user_to).select("-password");
//       const post = await Post.findById(req.body.post);

//       if (!userFrom) {
//         return res.status(404).json({ msg: "user_from not found" });
//       }
//       if (!userTo) {
//         return res.status(404).json({ msg: "user_to not found" });
//       }
//       if (!post) {
//         return res.status(404).json({ msg: "Post not found" });
//       }
//       let message = "";
//       req.body.type === "like"
//         ? (message = `${userFrom.name} liked your post`)
//         : (message = `${userFrom.name} commented on your post`);

//       const newNotification = new Notification({
//         user_from: req.body.user_from,
//         user_to: req.body.user_to,
//         post: req.body.post,
//         message,
//       });

//       const notif = await newNotification.save();
//       res.json(notif);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("server error");
//     }
//   }
// );

// @route get api/notifications
// @desc get notifications by user
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const notif = await Notification.find({ user_to: req.user.id }).sort("-date");

    res.json(notif);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route delete api/notifications/:id
// @desc delete notifications
// @access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);

    // check notif
    if (!notif) {
      return res.status(404).json({ msg: "Notification not found" });
    }
    // check user
    if (notif.user_to.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await notif.remove();

    res.json("Notification removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
