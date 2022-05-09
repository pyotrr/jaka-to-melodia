import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IDBPDatabase, openDB } from "idb";
import Loading from "../components/layout/Loading";

export type User = {
  id: string;
  name: string;
  profilePicUrl: string;
};

interface Database {
  users: {
    key: string;
    value: User;
  };
}

interface DatabaseContextState {
  database: IDBPDatabase<Database>;
}

const DatabaseContext: React.Context<DatabaseContextState> =
  createContext<DatabaseContextState>({} as DatabaseContextState);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [database, setDatabase] = useState<IDBPDatabase<Database> | null>(null);

  useEffect(() => {
    openDB<Database>("jtm", 1, {
      upgrade(database: IDBPDatabase<Database>) {
        database.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: false,
        });
      },
    }).then((database) => {
      setDatabase(database);
    });
  }, []);

  if (!database) return <Loading />;

  return (
    <DatabaseContext.Provider
      value={{
        database: database,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () =>
  useContext<DatabaseContextState>(DatabaseContext);
