import { BASE_SOCET_URL } from "@/constants/ApiUrl";
import { io, Socket } from "socket.io-client";


let socket: Socket | null = null;

const createSocket = (customerId: string): Socket => {
  if (!socket) {
    socket = io(`${BASE_SOCET_URL}?userId=${customerId}`, {
      transports: ["websocket"],
    });
  }
  return socket;
};




const getSocket = (): Socket | null => {
  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { createSocket, getSocket, disconnectSocket };
