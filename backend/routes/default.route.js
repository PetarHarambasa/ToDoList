// ROUTES
import todo_route from "./todo.route.js";
import math_route from "./math.route.js";

// API START
const api_path = "/api/";
const todo_path = "todo/";
const math_path = "math/";

// URL
const todo = api_path+todo_path;
const math = api_path+math_path;

// EXPORT
export default function (app) {
    // RENDER API
    app.use(todo, todo_route);
    app.use(math, math_route)
}