import { DBSchema, IDBPDatabase, openDB } from "idb";
import DatabaseNotInitializedError from "./DatabaseNotInitializedError";

export type User = {
  id: string;
  name: string;
  profilePicUrl: string;
  country: string;
};

export type HistoryEntry = {
  playlistId: string;
  name: string;
  score: number;
  date: number;
  thumbnailUrl: string;
};

interface ObjectStores {
  users: {
    key: string;
    value: User;
  };
  history: {
    key: string;
    value: HistoryEntry;
  };
}

interface DatabaseSchema extends DBSchema, ObjectStores {}

class Database {
  dao: IDBPDatabase<DatabaseSchema> | null = null;

  constructor() {
    openDB<DatabaseSchema>("jtm", 1, {
      upgrade(database) {
        database.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: false,
        });
        database.createObjectStore("history", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    }).then((database) => {
      this.dao = database;
    });
  }

  async clearObjectStore(objectStoreName: keyof ObjectStores) {
    if (!this.dao) {
      throw new DatabaseNotInitializedError();
    }

    await this.dao.clear(objectStoreName);
  }
}

export default new Database();
