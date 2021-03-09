import { ChatClient } from '../entities/chat-client.entity';
import { ChatMessage } from '../entities/chat-message.model';

export interface WelcomeDto {
  client: ChatClient;
  clients: ChatClient[];
  messages: ChatMessage[];
}
