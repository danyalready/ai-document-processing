import { io } from "socket.io-client";
import { API_URL } from "./env";

function getSocketConfig() {
    if (API_URL.startsWith("http://") || API_URL.startsWith("https://")) {
        const url = new URL(API_URL);
        const pathPrefix = url.pathname === "/" ? "" : url.pathname;

        url.pathname = "";
        url.search = "";
        url.hash = "";

        return {
            url: url.toString().replace(/\/$/, ""),
            path: `${pathPrefix}/socket.io`,
        };
    }

    return {
        url: undefined,
        path: `${API_URL}/socket.io`,
    };
}

const socketConfig = getSocketConfig();

export const socket = io(socketConfig.url, {
    path: socketConfig.path,
});
