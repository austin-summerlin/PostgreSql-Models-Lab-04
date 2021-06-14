import pool from '../utils/pool';

export default class Birthstone {
  id;
  name;
  zodiac;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.zodiac = row.zodiac;
    this.color = row.color;
  }

  static async insert({ name, zodiac, color }) {
    const { rows } = await pool.query(
      'INSERT INTO birthstones (name, zodiac, color) VALUES ($1, $2, $3) RETURNING *',
      [name, zodiac, color]
    );
    return new Birthstone(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM birthstones WHERE id= $1', [id]);

    if (!rows[0]) return null;

    return new Birthstone(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM birthstones');

    return rows.map(row => new Birthstone(row));
  }

  static async update(birthstone, id) {
    const { rows } = await pool.query(`
      UPDATE birthstones
      SET name = $1, zodiac = $2, color = $3
      WHERE id = $4
      RETURNING *`, [birthstone.name, birthstone.zodiac, birthstone.color, id]);
    return new Birthstone(rows[0]);

  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM birthstones
      WHERE        id = $1
      RETURNING     *`, [id]);
    return new Birthstone(rows[0]);

  }
}
