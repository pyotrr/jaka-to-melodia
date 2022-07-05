import database, { User } from "../index";
import DatabaseNotInitializedError from "../DatabaseNotInitializedError";

interface IUsers {
  getUser: () => Promise<User>;
  addUser: (user: User) => Promise<string>;
}

const Users: IUsers = {
  async getUser() {
    if (!database.dao) {
      throw new DatabaseNotInitializedError();
    }
    const allUsers = await database.dao.getAll("users");
    return allUsers[0];
  },

  async addUser(user) {
    if (!database.dao) {
      throw new DatabaseNotInitializedError();
    }
    return database.dao.put("users", user);
  },
};

export default Users;
