import uuid from 'uuid';

export default class User {
  /**
     * class constructor
     * @param {object} user
     */
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'nzubennamani@gmail.com',
        firstName: 'Nzubechukwu',
        lastName: 'Nnamani',
        password: '123456',
        type: 'client',
        isAdmin: false,
      },
      {
        id: 20,
        email: 'nnamani@gmail.com',
        firstName: 'Nzubechukwu',
        lastName: 'Nnamani',
        password: '654321',
        type: 'staff',
        isAdmin: true,
      },
      {
        id: 43,
        email: 'zuby@gmail.com',
        firstName: 'Nzubechukwu',
        lastName: 'Nnamani',
        password: '213456',
        type: 'client',
        isAdmin: false,
      },
      {
        id: 20,
        email: 'alpha@gmail.com',
        firstName: 'Nzubechukwu',
        lastName: 'Nnamani',
        password: '543216',
        type: 'staff',
        isAdmin: true,
      },
    ];
  }

  /**
     * @param {object} new user object
     * @returns {object} user object
     */
  create(user) {
    const newUser = {
      id: uuid.v4(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      type: user.type,
      isAdmin: user.isAdmin,
    };

    const saveUser = this.users.push(newUser);
    if (saveUser) {
      return {
        newUser,
        saved: true,
      };
    }
    return { saved: false };
  }

  /**
     * @param {uuid} id
     * @returns {object} user object
     */
  findAuser(email) {
    return this.users.find(user => user.email === email);
  }

  /**
     * @returns {object} returns all the users
     */
  findAllUser() {
    return this.users;
  }
}
