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
               email: "nzubennamani@gmail.com",
               firstName: "Nzubechukwu",
               lastName: "Nnamani",
               password: "123456",
               type: "client",
               isAdmin: false
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
        token: user.token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        type: "client",
        isAdmin: false
        };
        this.users.push(newUser);
        return newUser
    }
    /**
     * @param {uuid} id
     * @returns {object} user object
     */
    findAuser(id) {
        return this.users.find(user => user.id === id);
    }
    /**
     * @returns {object} returns all the users
     */
    findAllUser() {
        return this.users;
    }
    /**
     * @param {uuid} id
     * @param {object} user object instance
     * @returns {object} the updated user object instance
     */
    updateUser(id, user) {
        const someUser = this.findAuser(id);
        const found = this.users.indexOf(someUser);
        this.users[found].email = user['email'] || someUser.email;
        this.users[found].firstName = user['firstName'] || someUser.firstName;
        this.users[found].lastName = user['lastName'] || someUser.lastName;
        this.users[found].password = user['password'] || someUser.password;
        return this.users[found];
    }
    /**
     * @param {uuid} id
     * @returns {object} all users excluding the deleted user
     */
    deleteAuser(id) {
        const someUser = this.findAuser(id);
        const found = this.users.indexOf(someUser);
        this.users.splice(found, 1);
        return this.users;
    }
}