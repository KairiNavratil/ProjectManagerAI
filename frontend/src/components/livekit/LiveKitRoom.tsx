import { useEffect, useRef, useState } from 'react';
import { Room, RoomEvent, RemoteParticipant, DataPacket_Kind, RoomOptions } from 'livekit-client';

interface CursorData {
  x: number;
  y: number;
  userId: string;
  userName: string;
  timestamp: number;
}

interface LiveKitRoomProps {
  roomName: string;
  userName: string;
  serverUrl?: string;
  token?: string;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const LiveKitRoom = ({ 
  roomName, 
  userName, 
  serverUrl = 'wss://your-livekit-server.com',
  token 
}: LiveKitRoomProps) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<Map<string, CursorData>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userColor = colors[Math.abs(userName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];

  useEffect(() => {
    const connectToRoom = async () => {
      try {
        const newRoom = new Room();
        
        // Set up event listeners
        newRoom.on(RoomEvent.Connected, () => {
          console.log('Connected to room');
          setIsConnected(true);
          setError(null);
        });

        newRoom.on(RoomEvent.Disconnected, () => {
          console.log('Disconnected from room');
          setIsConnected(false);
        });

        newRoom.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
          console.log('Participant connected:', participant.identity);
        });

        newRoom.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
          console.log('Participant disconnected:', participant.identity);
          setParticipants(prev => {
            const newMap = new Map(prev);
            newMap.delete(participant.identity);
            return newMap;
          });
        });

        newRoom.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
          if (participant && participant.identity !== userName) {
            try {
              const data: CursorData = JSON.parse(new TextDecoder().decode(payload));
              setParticipants(prev => {
                const newMap = new Map(prev);
                newMap.set(participant.identity, {
                  ...data,
                  userName: participant.identity
                });
                return newMap;
              });
            } catch (e) {
              console.error('Failed to parse cursor data:', e);
            }
          }
        });

        // For demo purposes, we'll simulate a connection
        // In production, you'd use: await newRoom.connect(serverUrl, token);
        
        // Simulate connection
        setTimeout(() => {
          setIsConnected(true);
          setRoom(newRoom);
          
          // No mock participants - only real users will show cursors
        }, 1000);

        setRoom(newRoom);

        // Add document mouse move listener
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          newRoom.disconnect();
        };
      } catch (err) {
        console.error('Failed to connect to room:', err);
        setError('Failed to connect to LiveKit room');
      }
    };

    connectToRoom();
  }, [roomName, userName, serverUrl, token]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!room || !isConnected) return;

    const x = e.clientX;
    const y = e.clientY;

    const cursorData: CursorData = {
      x,
      y,
      userId: userName,
      userName,
      timestamp: Date.now()
    };

    // Send cursor position to other participants
    try {
      room.localParticipant.publishData(
        new TextEncoder().encode(JSON.stringify(cursorData)),
        DataPacket_Kind.RELIABLE
      );
    } catch (e) {
      console.error('Failed to send cursor data:', e);
    }
  };

  const getParticipantColor = (userId: string) => {
    return colors[Math.abs(userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    >
      {/* Live Cursors */}
      {Array.from(participants.entries()).map(([userId, cursor]) => (
        <div
          key={userId}
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-2px, -2px)'
          }}
        >
          {/* Cursor */}
          <div
            className="w-4 h-4 relative"
            style={{ color: getParticipantColor(userId) }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="drop-shadow-lg"
            >
              <path d="M2 2L14 8L8 10L6 14L2 2Z" />
            </svg>
          </div>
          
          {/* User Label */}
          <div
            className="absolute top-5 left-1 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap"
            style={{ backgroundColor: getParticipantColor(userId) }}
          >
            {cursor.userName}
          </div>
        </div>
      ))}

      {/* Connection Status */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {isConnected ? '🟢 Ready' : '🔴 Connecting...'}
        </div>
      </div>

      {/* User Info */}
      <div className="fixed top-4 left-4 z-50">
        <div 
          className="px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: userColor }}
        >
          👤 {userName}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed top-16 right-4 z-50">
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
            ⚠️ {error}
          </div>
        </div>
      )}

      {/* Participants Count */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
          👥 {participants.size + 1} online
        </div>
      </div>
    </div>
  );
};