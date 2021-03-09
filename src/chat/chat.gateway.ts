import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { WelcomeDto } from './dto/welcome.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('allMessages', this.chatService.getMessages());
    this.server.emit('clients', this.chatService.getClients());
  }

  handleDisconnect(client: Socket) {
    this.chatService.deleteClient(client.id);
    this.server.emit('clients', this.chatService.getClients());
  }

  @SubscribeMessage('message')
  handleChatEvent(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    const chatMessage = this.chatService.addMessage(message, client.id);
    this.server.emit('newMessage', chatMessage);
  }

  @SubscribeMessage('typing')
  handleTypingEvent(
    @MessageBody() isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const chatClient = this.chatService.updateTyping(isTyping, client.id);
    if (chatClient) {
      this.server.emit('clientTyping', chatClient);
    }
  }

  @SubscribeMessage('nickname')
  handleNickNameEvent(
    @MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): void {
    try {
      const chatClient = this.chatService.addClient(client.id, nickname);
      const welcome: WelcomeDto = {
        clients: this.chatService.getClients(),
        messages: this.chatService.getMessages(),
        client: chatClient,
      };
      client.emit('welcome', welcome);
      this.server.emit('clients', this.chatService.getClients());
    } catch (err) {
      client.error(err.message);
    }
  }
  ////////////////
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
