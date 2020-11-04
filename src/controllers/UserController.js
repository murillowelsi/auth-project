import User from '../models/User'

class UserCOntroller {
  async store(req, res) {
    const {name, email, password} = req.body;

    const user = await User.create({
      name, email, password
    });

    return res.json({user:user.show()})
  }
}

export default new UserCOntroller();