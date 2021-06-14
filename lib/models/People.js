import pool from '../utils/pool';


export default class People {
  id;
  name;
  born;
  died;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.born = row.born;
    this.died = row.died;
  }

  static async insert({ name, born, died }) {
    const { rows } = await pool.query(
      'INSERT INTO people (name, born, died) VALUES($1, $2, $3) RETURNING *',
      [name, born, died]
    );
    return new People(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    if (!rows[0]) return null;
    return new People(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM people');
    return rows.map(row => new People(row));
  }
}


