import sqlite3 from "sqlite3"

const sql3 = sqlite3.verbose();
//bookStoreDB.run('PRAGMA foreign_keys = ON');

const bookStoreDB = new sql3.Database("./books.db", sql3.OPEN_READWRITE, (err) => {
    if(err) {
        console.error("Error opening database:", err.message)
    }else {
        console.log("Connected to the Book-DB SQLite database. ")
    }
});

bookStoreDB.run('PRAGMA foreign_keys = ON');


export default bookStoreDB;