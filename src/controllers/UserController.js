import User from '../models/User'

class UserCOntroller {
  async store(req, res) {
    const {name, email, pasword} = req.body;

    const user = await User.create({
      name, email, pasword
    });

    return res.json({user:user.show()})
  }
}

export default new UserCOntroller();