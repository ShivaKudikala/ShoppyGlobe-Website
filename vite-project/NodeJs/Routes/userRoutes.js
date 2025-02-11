import newUser from "../Controllers/newUser.js";
import postUser from "../Controllers/postUser.js";

// Function to define the routes for the user
function userRoutes(app) {
  app.post('/login', postUser);
  app.post('/register', newUser);
}

export default userRoutes;