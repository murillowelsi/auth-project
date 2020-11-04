import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

class AuthController {
  async store(req, res) {
    const {email, password} = req.body

    const user = await User.findOne({email});

    if(!user) {
      return res.status(401).json({error:'Credentials does not match.'})
    }

    if(user.deleted === true) {
      return res.status(401).json({error:'This account is disabled.'})
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      return res.status(401).json({error:'Credentials does not match.'})
    }

    const {secret, expiresIn} = jwtConfig;

    const token = jwt.sign({}, secret, {
      subject:String(user._id),
      expiresIn
    });

    return res.json({user:user.show(), token});
  }
}

export default new AuthController();