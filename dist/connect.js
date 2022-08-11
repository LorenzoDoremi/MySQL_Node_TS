import mysql from "mysql";
export function connect() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "community"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
    });
    return con;
}
//# sourceMappingURL=connect.js.map