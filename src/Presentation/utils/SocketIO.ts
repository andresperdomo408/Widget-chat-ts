import io from "socket.io-client";
import { SOCKET_IO } from "../constants/SocketIO";

const socket = io(`${SOCKET_IO}`);
export default socket;
