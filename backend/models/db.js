import sql from "mssql"
import config from "../config/db.config.js"

const connection = {
    user: config.USER,
    server: config.HOST,
    password: config.PASSWORD,
    database: config.DB,
    port: config.PORT,
    options: {
        trustServerCertificate: true
    }
}

async function connectDB() {
    const pool = new sql.ConnectionPool(connection);

    try{
        await pool.connect();
        console.log('Connected to database');
        return pool;
    }
   catch(err){
       console.log('Database connection failed!', err);
       return err;
   }
}

export default connectDB;