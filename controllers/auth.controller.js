const config = require("../config/auth.config");
const validateLoginInput = require('../middlewares/login');
const Validator = require('validator');
const isEmpty = require('is-empty');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2 (
  process.env.OAUTH2_ID,
  process.env.OAUTH2_CODE,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.token;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    password2: req.body.password2
  });

  if (Validator.isEmpty(req.body.username)) {
    errors.username = "Username field is required ! ";
  }
  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required !";
  } else if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid !";
  }
  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required !";
  }
  if (Validator.isEmpty(req.body.password2)) {
    errors.password2 = "Confirm password is required !";
  }
  if (!Validator.isLength(req.body.password, {
      min: 6,
      max: 40
    })) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!Validator.equals(req.body.password, req.body.password2)) {
    return res.status(400).send({
      message: "Password must match."
    });
  }

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    //  admin

    //
    else {
      // Role.findOne({
      //   name: "user"
      // }, (err, role) => {
      //   if (err) {
      //     res.status(500).send({
      //       message: err
      //     });
      //     return;
      //   }
        

      //   user.roles = [role._id];
      //   user.save(err => {
      //     if (err) {
      //       res.status(500).send({
      //         message: err
      //       });
      //       return;
      //     }

      //     res.send({
      //       message: "User was registered successfully!"
      //     });
      //   });
      // });

      const token = new Token ({ _userId: user.id, token: crypto.randomBytes(16).toString('hex')});
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message});
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL,
            clientId: process.env.OAUTH2_ID,
            clientSecret: process.env.OAUTH2_CODE,
            refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
            accessToken: accessToken
          },
          tls: {
              rejectUnauthorized: false
          }
          });
          const mailOptions = {
            from : process.env.ADMIN_EMAIL,
            to : user.email,
            subject: 'Account Verification for Mataviguette',
            text: `Hello, please verify your account by clicking the link: \n` + process.env.CLIENT_ORIGIN + '\/confirmation\/' + token.token
            };
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                  return res.status(500).send({ message: error.message });
              } else {
                  return res.status(200).send({ message: 'A verification email has been seent to ' + user.email + '.' });
              }
              });
      })
    
    }
  });
};

exports.confirmationPost = (req, res, next) => {
  Token.findOne({ token: req.body.token }, function(err, token) {
    if (err) {
      return console.log
    }
    if (!token) {
      return res.status(400).send({ type: 'not-verified', message: 'Your confirmation has expired'});
    }
    User.findOne({ _id: token._userId, email: req.body.email }, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'We are unable to find a user'});
      }
      if (user.isVerified) {
        return res.status(400).send({ type: 'already-verified', message: 'Your account has already been verified'});
      } else {
      user.isVerified = true;
      Role.findOne({name: "user"}, (err, role) => {
        if (err) {
          res.status(500).send({
            message: 'Error finding Role'
          });
          return;
        }
        user.roles = [role._id];
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err});
        }
        res.status(200).send({message: "Your account has been verified ! Please log in"});
      });
    });
  }
    });
  });
};

exports.resendTokenPost = (req, res, next) => {
  User.findOne({ email: req.body.email}, function(err, user) {
    if (req.body.email === undefined) { return res.status(400).send({ message: "Enter your email"}); }
    if (req.body.email.length === 0) { return res.status(400).send({ message: "Enter your email"}); }
    if (!user) return res.status(400).send({ message: "We are unable to find a user with that email"});
    if (user.isVerified) return res.status(400).send({ message: 'This account has already been verified'});
    const token = new Token ({ _userId: user.id, token: crypto.randomBytes(16).toString('hex')});
    token.save(function (err) {
      if (err) { return res.status(500).send({ message: err.message}); }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.ADMIN_EMAIL,
          clientId: process.env.OAUTH2_ID,
          clientSecret: process.env.OAUTH2_CODE,
          refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
          accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
        });
        const mailOptions = {
          from : process.env.ADMIN_EMAIL,
          to : user.email,
          subject: 'Account Verification for Mataviguette',
          text: `Hello, please verify your account by clicking the link: \n` + process.env.CLIENT_ORIGIN + '\/confirmation\/' + token.token
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.status(500).send({ message: error.message });
            } else {
                return res.status(200).send({ message: 'A verification email has been seent to ' + user.email + '.' });
            }
            });

    })
  })
}

exports.signin = (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
      email: req.body.email
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      if(!user.isVerified) {
        return res.status(401).send({ type: 'not-verified', message: 'Your account has not been verified' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id: user.id
      }, config.SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.changePassword = async (req, res) => {
    //for the front form, need ton enter Oldpass, password, confirmNewPass
  const userId = req.userId;
  const oldPass = req.body.oldPass
  const confirmNewPass = req.body.confirmNewPass;

  bcrypt.hash(req.body.password, 8, async (err, hash) => {
    if (err) {
      return res.status(400).send({message: 'You must provide new password'});
    }
    const newpass = {
      password: hash
    }
    const result = await User.findByIdAndUpdate(
      userId, {
        $set: newpass
      },
      function (err, user) {
        var passwordIsValid = bcrypt.compareSync(
          oldPass,
          user.password
        );
        if (err) return res.status(400).send({message: 'Error in update'})
        if (oldPass === undefined) {
          return res.status(400).send({message: 'You must provide current password'})
        }
        if (oldPass.length === 0) {
          return res.status(400).status(400).send({message: 'You must enter current password'})
        }
        if (req.body.password.length === 0) {
          return res.status(400).send({message: 'You must enter new password'})
        }
        if (!Validator.isLength(req.body.password, {
          min: 6,
          max: 40
        })) {
        return res.status(400).send({message:"Password must be at least 6 characters."});
        }
        if (!Validator.equals(req.body.password, req.body.confirmNewPass)) {
          return res.status(400).send({
            message: "Password must match."
          });
        }
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "This is not your current password!"
          });
        } else {
          return res.status(200).send({
            message: 'Password Updated ! '
          })
        }
      }
    )
  })
}

exports.isValidToken = async (req, res) => {
  try {
  const isValid = await true;
  return res.send(isValid);
  }
  catch(e) {
    console.log(e);
  }
}

exports.sendEmailResetPassword = (req, res) => {
  User.findOne({ email : req.body.email}, function (err, user) {
    if (req.body.email === undefined) {
      return res.status(400).send({message: "Email field is required"})
    }
    if (req.body.email.length === 0 ) {
      return res.status(400).send({message: "Email field is required"})
    }
    if(!user) {
      return res.status(400).send({message: "We are not able to find a user with that email"})
    }
    else {
      const token = new Token ({ _userId: user.id, token: crypto.randomBytes(16).toString('hex')});
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message});
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL,
            clientId: process.env.OAUTH2_ID,
            clientSecret: process.env.OAUTH2_CODE,
            refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
            accessToken: accessToken
          },
          tls: {
              rejectUnauthorized: false
          }
          });
        const mailOptions = {
          from : process.env.ADMIN_EMAIL,
          to : user.email,
          subject: 'Password Reset for Mataviguette',
          text: `Hello, please change your password by clicking the link: \n` + process.env.CLIENT_ORIGIN + '\/reset\/' + token.token
          };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
              return res.status(500).send({ message: error.message });
          } else {
              return res.status(200).send({ message: 'Please change your password by clicking the link sent to ' + user.email + '.' });
          }
        });
      })
    }
  })
}

exports.resetPassword = (req, res) => {
  Token.findOne({ token: req.body.token }, function(err, token) {
    if (err) {
      return res.status(400).send(err);
    }
    if (!token) {
      return res.status(400).send({message: 'Your request for changing password has expired'})
    }

    bcrypt.hash(req.body.password, 8, async(err, hash) => {
      if (err) {
        return res.status(400).send({message: 'Provide new password'});
      }
      const newpass = {
        password: hash
      }
      User.findOne({ _id: token._userId, email: req.body.email} , async (err, user) => {
        if (err) { return res.status(400).send({message: 'Something went wrong'}); }
        if (!user) {
          return res.status(400).send({ message: 'We are unable to find a user with that email'});
        }
        else {
          const result = await User.updateOne({ _id : user.id}, {$set: newpass}, function(err, upUser) {
            if (err) {
              return res.status(400).send({message: 'Provide new password'});
            }
            if (!Validator.isLength(req.body.password, {
              min: 6,
              max: 40
            })) {
            return res.status(400).send({message:"Password must be at least 6 characters."});
            }
            if (!Validator.equals(req.body.password, req.body.password2)) {
              return res.status(400).send({ message : 'Password must match'});
            }
            else {
              return res.status(200).send({ message: 'Password Updated ! '});
            }
          });
        }
      });
    });
  });
}

