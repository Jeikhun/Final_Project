import Comment from '../models/Comments.js';
import Post from '../models/Post.js';
import User from "../models/User.js";

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body;
        const user = await User.findById(req.userId);

        if (!comment)
            return res.json({message: 'Comment cannot be empty'})


        const newComment = new Comment({
            comment,
            username: user.username,
            author: req.userId
        })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id},
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({message: 'Can not create comment'})
    }
};

export const deleteComment = async (req, res) => {
    try {
        const user = await Comment.findByIdAndDelete(req.params.id)
        if (!user) return res.json({ message: 'Comment does not exist' })

        await Post.findByIdAndUpdate(req.objectId, {
            $pull: { comments: req.params.id },
        })
        res.json({ message: 'Post has been deleted' })
    } catch (err) {
        console.log(err)
    }
};
