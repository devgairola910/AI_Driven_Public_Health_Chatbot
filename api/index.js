import handler from "../server.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function apiHandler(request, response) {
  return handler(request, response);
}
