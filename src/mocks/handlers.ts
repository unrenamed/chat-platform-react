import usersHandlers from "./handlers/users";
import authHandlers from "./handlers/auth";

export default [...authHandlers, ...usersHandlers];
