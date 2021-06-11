import pool from '../utils/pool';

export default class Dog {
  id;
  name;
  age;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.type = row.type;
  }

  static async insert({ name, age, type }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, age, type) VALUES ($1, $2, $3) RETURNING *',
      [name, age, type]
    );
    return new Dog(rows[0]);
  }
}
