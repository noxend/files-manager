const knex = require('../../knex');

module.exports = (tablename, Transform) => class CreateModel {
  constructor(fields) {
    this.fields = fields;
    this.transformedFields = new Transform(fields).getFields();
  }

  async save () {
    const result = await knex(tablename).insert(this.transformedFields);
    return result;
  };

  static customMethods() {
    return Transform;
  }

  static async update(key, value) {
    const result = await knex(tablename)
      .where(key)
      .update(value);
    return result;
  }

  static async getIdByKey(key, value) {
    const result = await knex(tablename).select('id').where(key, '=', value);
    return result[0].id;
  }

  static async selectFieldByKey(field, key, value) {
    const result = await knex(tablename).select(field).where(key, '=', value).first();
    return result;
  }

  static async selectByKey(key, value) {
    const result = await knex(tablename).where(key, '=', value).first();
    return result;
  }

  static async selectAllByKey(key, value) {
    const result = await knex(tablename).where(key, '=', value);
    return result;
  }

  static async selectAll() {
    const result = await knex(tablename);
    return result;
  }

  static async updateByKey(key, value, fields) {
    const result = await knex(tablename).where(key, '=', value).update(fields);
    return result;
  }

  static async deleteByKey(key, value) {
    const result = await knex(tablename).where(key, '=', value).del();
    return result;
  }

  static async rowsCount() {
    const result = await knex(tablename).count('id as count');
    return result;
  }
};
