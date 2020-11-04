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

    const userExists = await User.findOne({email});

    if(!user) {
      return res.status(400).json({error:'Email already exists'})
    }

    const user = await User.create({
      name, email, password
    });

    return res.json({user:user.show()})
  }

  async update(req, res) {
    const {name, email, password} = req.body;

    const user = await User.findById(req.user);

    if(!user) {
      return res.status(404).json({error:'Only authenticated users can execute this action'})
    }

    if(email && (email != user.email)) {
      const userExists = await User.findOne({email});

      if(!user) {
        return res.status(400).json({error:'Email already exists'})
      }
    }

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = password;

    await user.save();

    return res.json({user:user.show()});
  }

  async delete(req, res) {
    const user = await User.findById(req.user);

    if(!user) {
      return res.status(404).json({error:'Only authenticated users can execute this action'})
    }

    user.deleted = true;

    await user.save();

    return res.status(204).send();
  }
}

export default new UserCOntroller();