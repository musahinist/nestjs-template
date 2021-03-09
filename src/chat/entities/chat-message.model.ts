import { ChatClient } from './chat-client.entity';

export interface ChatMessage {
  message: string;
  sender: ChatClient;
}
