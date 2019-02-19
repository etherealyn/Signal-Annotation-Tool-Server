import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';

@WebSocketGateway({ origins: 'http://localhost:4200'})
export class LabelsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('addLabel')
  async addLabel(client, payload) {
    console.log('addLabel', JSON.stringify(payload));
    
  }

  @SubscribeMessage('editLabel')
  async editLabel(client, payload) {
    console.log('editLabel', JSON.stringify(payload));
  }

  @SubscribeMessage('deleteLabel')
  async deleteLabel(client, payload) {
    console.log('deleteLabel', JSON.stringify(payload));
  }
}
