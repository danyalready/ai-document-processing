import { io } from "socket.io-client";

console.log(process.env.NEXT_PUBLIC_API_URL);
export const socket = io(process.env.NEXT_PUBLIC_API_URL);
