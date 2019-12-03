import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../models/user.model";

function login(req, res, next) {
  User.findOne({ username: req.body.username })
    .select("_id password username name role")
    .exec()
    .then(user => {
      if (!user) {
        return res
          .status(500)
          .json({ message: "username or password does not match" });
      }

      return user
        .authenticate(req.body.password)
        .then(() => {
          const token = jwt.sign(
            {
              _id: user._id, // eslint-disable-line
              name: user.name,
              username: user.username,
              role: user.role
            },
            config.jwtSecret,
            { expiresIn: config.jwtExpires }
          );

          res.json({
            _id: user._id, // eslint-disable-line
            name: user.name,
            username: user.username,
            role: user.role,
            token
          });
        })
        .catch(() => {
          res.status(500).json({ message: "Username or password does not match" });
        });
    })
    .catch(next);
}

function signup(req, res, next) {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  user
    .save()
    .then(newUser => {
      res.json(newUser);
    })
    .catch(next);
}

export default {
  login,
  signup
};
