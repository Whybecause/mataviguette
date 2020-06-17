const db = require('../models');
const Comment = db.comment
const User = db.user


exports.createComment = async (req, res, next) => {
    const comment = new Comment({
        text: req.body.text
    });
    const author = req.userId;
    comment.author = author;
    if (req.body.text.length === 0) {
        return res.status(403).send({ message: 'Please enter your message'})
    }
    try {
        const result = await comment.save();
        User.updateOne( { _id: author}, {$push: {comments: comment} }, function() {} );
        return res.status(201).json({
            message: 'Votre commentaire a été ajouté !',
            result: result
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

exports.getComment = (req, res, next) => {
    Comment.findOne({
        _id: req.params.id
    }).then(
        (comment) => {
            res.status(200).json(comment);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.updateComment = function (req, res) {
    Comment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        function (err) {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }
            res.send('Commentaire modifié !');
        })
};

// exports.deleteComment = function (req, res) {
//     Comment.deleteOne({
//         _id: req.params.id
//     }).then(
//         (comment) => {
//             res.status(200).json("commentaire supprimé");
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// };

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id
    Comment.findOne({ _id: commentId})
    .then(async (comment) => {
        const result = await Comment.deleteOne({ _id: commentId})
        User.updateOne({ _id : comment.author}, {$pull: {comments: commentId} }, function() {} );
        return res.status(200).json ({ message: 'Commentaire supprimé !'})
    })
    .catch(error => res.status(500).json({ error }));
}


exports.getAllComments = function (req, res) {
    Comment.find()
        .populate('author', 'username')
        .sort({
            "createdAt": -1
        })
        .then(
            (comments) => {
                res.status(200).json(comments);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};