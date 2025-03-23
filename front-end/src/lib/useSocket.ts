import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

export function useSocket(): React.MutableRefObject<Socket | null> {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return socketRef;
}
