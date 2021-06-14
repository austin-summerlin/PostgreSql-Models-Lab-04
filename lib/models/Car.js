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
}

