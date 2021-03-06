import database, { HistoryEntry } from "../index";
import DatabaseNotInitializedError from "../DatabaseNotInitializedError";

interface IHistory {
  getHistoryEntries: () => Promise<HistoryEntry[]>;
  addHistoryEntry: (entry: HistoryEntry) => Promise<string>;
}

const History: IHistory = {
  async getHistoryEntries() {
    if (!database.dao) {
      throw new DatabaseNotInitializedError();
    }
    const entries = await database.dao.getAll("history");
    return entries.reverse();
  },

  async addHistoryEntry(entry) {
    if (!database.dao) {
      throw new DatabaseNotInitializedError();
    }
    return database.dao.put("history", entry);
  },
};

export default History;
