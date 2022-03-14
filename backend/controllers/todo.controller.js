// import Todo from "../models/todo.model.js";
import ToDoService from "../service/todo.service.js";
import ToDo from "../models/todo.model.js"

export function get_todo(req, res) {
    res.send(ToDoService.getData());
}

export function add_todo(req, res) {
    const name = req.body.name;
    console.log(req.body.name)
    res.send(ToDoService.addData(name));
}

export function delete_todo(req, res) {
    const id = req.params.id;
    console.log(req.params.id)
    res.send(ToDoService.deleteData(id));
}

export function update_todo(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    console.log(req.params.id)
    console.log(req.body.name)
    res.send(ToDoService.updateData(id, name));
}

export function get(req, res) {
    const todo = new ToDo();
    todo.getAll().then(value => {
      return res.send(value);
    }).catch(error => {
      return res.send('Something went wrong' + error);
    })
  };
  
  export function create(req, res) {
    const todo = new ToDo();
    todo.createOne(req.body.name).then(value => {
      return res.send(req.body.name +' Added');
    }).catch(error => {
      return res.send('Something went wrong' + error);
    })
  };
  
  export function update(req, res){
    const todo = new ToDo();
    todo.updateById(req.params.id, req.body.checked).then(value => {
      return res.send('Updated ToDo with ID of ' + req.params.id + ' into ' + req.body.checked);
    }).catch(error => {
      return res.send('Something went wrong' + error);
    })
  };
  
  export function deleteOne(req, res){
    const todo = new ToDo();
    todo.remove(req.params.id).then(value => {
      return res.send('Delete ToDo with ID of ' + req.params.id);
    }).catch(error => {
      return res.send('Something went wrong' + error);
    })
  };