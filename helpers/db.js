import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('placesDb');

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
        [],
        () => res(),
        (_, error) => rej(error)
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, latitude, longitude) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?);',
        [title, imageUri, address, latitude, longitude],
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
