export default class UserDao {
  constructor(model) {
    this.model = model;
  }
  async register(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
