export default class ToDoService {
   static arr = [{"id" : 1, "name": "WorkOut", "checked": true}]

   static getData() {
        return this.arr;
    }

    static addData(name) {
        this.arr.push({"id" : 2, "name": name, "checked": false})
        return this.arr;
    }

    static deleteData(id) {
        this.arr = this.arr.filter((element) => element.id != id);
        return this.arr;
    }

    static updateData(id, name) {
        const todo = this.arr.find((element) => element.id == id);
        console.log(todo)
        todo.name = name;
        console.log(todo)
        return this.arr;
    }
}