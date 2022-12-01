class User {
  id?: number;
  phone: string = '';
  name: string = '';

  private constructor({ phone, name }: User) {
    return Object.assign(this, {
      phone,
      name
    });
  }

  static create({ phone, name }: User): User {
    const user = new User({ phone, name });
    return user;
  }
}

export { User };
