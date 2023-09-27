import axios from "axios";
import { SOCKET_IO } from "../../../../Presentation/constants/SocketIO";

const ApiMainBackend = axios.create({
  baseURL: SOCKET_IO,
  headers: {
    "Content-type": "application/json",
  },
});

export default ApiMainBackend;
