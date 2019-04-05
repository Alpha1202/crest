import uuid from 'uuid';

export default class Admin {
    /**
     * class constructor
     * @param {object} admin
     */
    constructor() {
        this.admin = [
            {
               id: 1,
               email: "nzubennamani@gmail.com",
               firstName: "Nzubechukwu",
               lastName: "Nnamani",
               password: "123456",
               type: "staff",
               isAdmin: true
            },
        ];
    }
    /**
     * @param {object} new admin object
     * @returns {object} admin object
     */
    create(admin) {
        const newAdmin = {
        id: uuid.v4(),
        token: admin.token,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        password: admin.password,
        type: "staff",
        isAdmin: true
        };
        this.admin.push(newAdmin);
        return newAdmin
    }
    /**
     * @param {uuid} id
     * @returns {object} admin object
     */
    findAdmin(id) {
        return this.admin.find(anAdmin => anAdmin.id === id);
    }
    /**
     * @returns {object} returns all the admin
     */
    findAllAdmin() {
        return this.admin;
    }
    /**
     * @param {uuid} id
     * @param {object} admin object instance
     * @returns {object} the updated admin object instance
     */
    updateAdmin(id, admin) {
        const someAdmin = this.findAdmin(id);
        const found = this.admin.indexOf(someAdmin);
        this.admin[found].email = admin['email'] || someAdmin.email;
        this.admin[found].firstName = admin['firstName'] || someAdmin.firstName;
        this.admin[found].lastName = admin['lastName'] || someAdmin.lastName;
        this.admin[found].password = admin['password'] || someAdmin.password;
        return this.admin[found];
    }
    /**
     * @param {uuid} id
     * @returns {object} all admin excluding the deleted admin
     */
    deleteAdmin(id) {
        const someAdmin = this.findAdmin(id);
        const found = this.admin.indexOf(someAdmin);
        this.admin.splice(found, 1);
        return this.admin;
    }
}