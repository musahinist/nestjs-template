import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatClient } from './entities/chat-client.entity';
import { ChatMessage } from './entities/chat-message.model';

@Injectable()
export class ChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClient[] = [];

  addMessage(message: string, clientId: string): ChatMessage {
    const client = this.clients.find((c) => c.id === clientId);
    const chatMessage: ChatMessage = { message: message, sender: client };
    this.allMessages.push(chatMessage);
    return chatMessage;
  }

  getMessages(): ChatMessage[] {
    return this.allMessages;
  }
  updateTyping(isTyping: boolean, id: string) {
    const chatClient = this.clients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== isTyping) {
      chatClient.typing = isTyping;
      return chatClient;
    }
  }
  addClient(id: string, nickname: string): ChatClient {
    let chatClient = this.clients.find(
      (c) => c.id === id && c.nickname === nickname,
    );
    if (chatClient) {
      return chatClient;
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname already used!');
    }
    chatClient = { id: id, nickname: nickname };
    this.clients.push(chatClient);
    return chatClient;
  }

  getClients(): ChatClient[] {
    return this.clients;
  }

  deleteClient(id: string): void {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
  /////////////////
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
