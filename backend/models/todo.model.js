import connectDB from "./db.js"

export default class ToDo{
    constructor(_id, _text, _boolean) {
        this.id = _id;
        this.text = _text;
        this.boolean = _boolean;
    }

    async getAll(result) {
        const DB = await connectDB();
        try {
          const result = await DB.request()
          .query('spSelectTask');
    
          return JSON.stringify(result.recordset);
        }
        catch(err) {
          console.log('Error querying database', err);
      
          return err;
        }
        finally {
          DB.close();
        }
      }
    
      async createOne(newToDo, result) {
        const DB = await connectDB();
        try {
          const result = await DB.request()
          .input('name', newToDo)
          .execute("spInsertTask")
    
          return JSON.stringify(result.recordset);
        }
        catch(err) {
          console.log('Error querying database', err);
    
          return err;
        }
        finally {
          DB.close();
        }
      }
    
       async updateById(id, checked, result) {
         const DB = await connectDB();
         try{
          const result = await DB.request()
          .input('id', id)
          .input('checked', checked)
          .execute('spUpdateTask')
    
          return JSON.stringify(result.recordset);
         }
         catch(err) {
          console.log('Error querying database', err);
    
          return err;
        }
        finally {
          DB.close();
        }
      }
    
      async remove(id, result){
        const DB = await connectDB();
        try{
         const result = await DB.request()
         .input('id', id)
         .execute('spDeleteTask')
    
         return JSON.stringify(result.recordset);
        }
        catch(err) {
         console.log('Error querying database', err);
    
         return err;
       }
       finally {
         DB.close();
       }
    }
}