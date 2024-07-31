export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    // try {
      // return await this.dao.getAll();
    // } catch (error) {
      console.log('SE LANZA EL ERROR DESDE SERVICE');
      throw new Error('Error al ejecutar un servicio');
    // }

  }

  getById = async(id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async create(obj) {
    try {
      return await this.dao.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  };

  async update(id, obj) {
    try {
      return await this.dao.update(id, obj);
    } catch (error) {
      throw new Error(error);
    }
  };

  async delete(id) {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}