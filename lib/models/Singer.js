import pool from '../utils/pool.js';

export default class Singer {
  id;
  name;
  realname;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.realname = row.realname;
  }

  static async insert({ name, realname }) {
    const { rows } = await pool.query(
      'INSERT INTO singers (name, realname) VALUES ($1, $2) RETURNING *',
      [name, realname]
    );
    return new Singer(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM singers WHERE id = $1', [id]);
    if (!rows[0]) return null;
    return new Singer(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM singers');
    return rows.map(row => new Singer(row));
  }

  static async update(singer, id) {
    const { rows } = await pool.query(`
    UPDATE singers
    SET name = $1, realname = $2
    WHERE id = $3
    RETURNING *`, [singer.name, singer.realname, id]);
    return new Singer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM singers
    WHERE id = $1
    RETURNING *`, [id]);
    return new Singer(rows[0]);
  }


}



