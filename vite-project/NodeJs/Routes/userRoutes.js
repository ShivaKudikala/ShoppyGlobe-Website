import newUser from "../Controllers/newUser.js";
import postUser from "../Controllers/postUser.js";

// Function to define the routes for the user
function userRoutes(app) {
  app.post('/api/login', postUser);
  app.post('/api/register', newUser);
}

export default userRoutes;