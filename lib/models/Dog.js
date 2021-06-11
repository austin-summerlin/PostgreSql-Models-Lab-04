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

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id= $1', [id]);

    if (!rows[0]) return null;

    return new Dog(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM dogs');

    return rows.map(row => new Dog(row));
  }

  static async update() {

  }
}
