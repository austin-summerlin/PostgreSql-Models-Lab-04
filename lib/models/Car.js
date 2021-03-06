import pool from '../utils/pool';

export default class Car {
  id;
  car;
  color;
  year;

  constructor(row) {
    this.id = row.id;
    this.car = row.car;
    this.color = row.color;
    this.year = row.year;
  }

  static async insert({ car, color, year }) {
    const { rows } = await pool.query(
      'INSERT INTO cars (car, color, year) VALUES ($1, $2, $3) RETURNING *',
      [car, color, year]
    );
    return new Car(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id= $1', [id]);

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM cars');

    return rows.map(row => new Car(row));
  }

  static async update(car, id) {
    const { rows } = await pool.query(`
      UPDATE cars
      SET car = $1, color = $2, year = $3
      WHERE id = $4
      RETURNING *`, [car.car, car.color, car.year, id]);
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM cars
      WHERE        id = $1
      RETURNING     *`, [id]);
    return new Car(rows[0]);

  }


}

