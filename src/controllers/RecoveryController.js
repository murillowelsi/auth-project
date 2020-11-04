import crypto from 'crypto';
import {addMinutes} from 'date-fns'
import User from '../models/User';

class RecoveryController {
  async store(req, res) {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({error:'User not found'})
    }

    const token = await crypto.randomBytes(8).toString('hex');
    const exp = addMinutes(new Date(), 5)

    user.token = token;
    user.expiration = exp;

    await user.save();

    return res.status(200).send();
  }
}

export default new RecoveryController();