import User from '../models/User'

class UserCOntroller {
  async show(req, res) {
    const user = await User.findById(req.user);

    if(!user){
      return res.status(404).json({error:'Only authenticated users can execute this action'})
    }

    return res.json({user:user.show()});
  }

  async store(req, res) {
    const {name, email, password} = req.body;

    const user = await User.create({
      name, email, password
    });

    return res.json({user:user.show()})
  }
}

export default new UserCOntroller();