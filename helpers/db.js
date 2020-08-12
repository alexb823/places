import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('placesDb');

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => res(),
        (_, error) => rej(error)
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
        [title, imageUri, address, lat, lng],
        (_, result) => res(result),
        (_, error) => rej(error)
      );
    });
  });
  return promise;
};

export const dropTable = (tableName) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`,
        [],
        () => res(),
        (_, error) => rej(error)
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places;',
        [],
        (_, results) => res(results),
        (_, error) => rej(error)
      );
    });
  });
  return promise;
};
