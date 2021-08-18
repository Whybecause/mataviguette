const db = require('../models');
const Booking = db.booking
const Comment = db.comment
const User = db.user

const {
    normalizeErrors
  } = require("../helpers/mongoose");

exports.createComment = async (req, res, next) => {
    const comment = new Comment({
        text: req.body.text
    });
    const bookingId = req.params.id;
    const author = req.userId;

    comment.author = author;
    comment.booking = bookingId;

    if (req.body.text.length === 0) {
        return res.status(403).send({ message: 'Please enter your message'})
    }
    try {
        Booking.findOne({_id: bookingId})
        .populate('user')
        .populate('comment')
        .exec(async (err, foundBooking) => {
            if (err) {
                return res.status(422).send({
                  errors: normalizeErrors(err.errors)
                });
              }
            if (foundBooking.user.id !== req.userId) {
                return res.status(422).send({
                    message: "Vous n'êtes pas le locataire de ce séjour"
                  });
            }
            if (foundBooking.comment.length) {
                return res.status(422).send({
                    message: "Vous avez déjà posté un commentaire pour ce séjour"
                  });
            }
            const result = await comment.save();
            Booking.updateOne( {_id: bookingId}, {$push: {comment: comment} }, function() {});
            User.updateOne( { _id: author}, {$push: {comments: comment} }, function() {} );
            return res.status(201).json({
            message: 'Votre commentaire a été ajouté !',
            result: result
        });
        })
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
                message: error
            });
        }
    );
};

exports.updateComment = function (req, res) {
    const text = req.body;
    Comment.findOne({ _id: req.params.id})
    .exec (async (err, foundComment) => {
        if (err) { return res.status(422).send({ errors : err})}
        if (foundComment.author != req.userId) {
            return res.status(500).send({message: 'Vous n\'etes pas l\'auteur de ce commentaire'})
        } else {

            foundComment.set(text);
            foundComment.save(err => {
                if (err) {
                    return res.status(422).send({ message: err})
                }
                return res.status(200).send({message: "Votre commentaire a été modifié"})
            })
        }
        })
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id
    Comment.findOne({ _id: commentId})
    .then(async (comment) => {
        const result = await Comment.deleteOne({ _id: commentId})
        User.updateOne({ _id : comment.author}, {$pull: {comments: commentId} }, function() {} );
        Booking.updateOne({ _id : comment.booking}, { $pull: {comment: commentId} }, function() {});
        return res.status(200).json ({ message: 'Commentaire supprimé !'})
    })
    .catch(error => res.status(500).json({ message: error }));
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