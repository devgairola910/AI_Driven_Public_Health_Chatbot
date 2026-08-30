import handler from "../server.js";

export default async function apiHandler(request, response) {
  return handler(request, response);
}
