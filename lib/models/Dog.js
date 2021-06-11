
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
}
