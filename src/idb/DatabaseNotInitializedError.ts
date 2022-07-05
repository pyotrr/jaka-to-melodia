class DatabaseNotInitializedError extends Error {
  constructor() {
    super("Database not initialized");
  }
}

export default DatabaseNotInitializedError;
