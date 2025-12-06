
/**
 * Represents a user in the chat application.
 */
export interface User {
  id: string;
  nickname: string;
  email: string;
}

/**
 * Represents a single message in the chat.
 */
export interface Message {
  id: string;
  text: string;
  timestamp: number;
  user: User;
}
