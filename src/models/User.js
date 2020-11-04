import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_NUM = 8;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  token: String,
  expiration: String
}, {
  timestamps: true
});

// Gera hash da senha antes de salvar no banco de dados
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, SALT_NUM)
})

// Retorna um JSON com os dados do usuário (name, email, role)
UserSchema.methods.show = function () {
  return {
    _id: this.id,
    name: this.name,
    email: this.email,
    deleted: this.deleted
  }
}

export default model('User', UserSchema);