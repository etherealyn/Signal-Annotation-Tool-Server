import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import * as SocketIO from 'socket.io';
import { InsertResult } from 'typeorm';
import { Label } from '../entities/label.entity';


@WebSocketGateway({
  origins: 'http://localhost:4200',
  namespace: 'labels',
})
export class LabelsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: SocketIO.Server;

  constructor(private labelsService: LabelsService) {
  }

  handleConnection(client) {
  }

  handleDisconnect(client) {
  }

  @SubscribeMessage('join')
  async join(socket: SocketIO.Socket, data): Promise<true | false> {
    return await new Promise((resolve, reject) => {
      socket.join(data.id, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    }).then(() => true, () => false);
  }

  @SubscribeMessage('leave')
  async leave(socket: SocketIO.Socket, data): Promise<true | false> {
    return await new Promise((resolve, reject) => {
      socket.leave(data.id, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    }).then(() => true, () => false);
  }

  @SubscribeMessage('all')
  async all(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.getLabels(room, ['id', 'name']);
  }

  @SubscribeMessage('add')
  async add(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.createLabel(room, data.aid)
      .then(async (value: InsertResult) => {
        const id = value.identifiers[0].id;
        const newLabel: Label = await this.labelsService.getLabel(id);
        socket.to(room).broadcast.emit('new', newLabel);
        return newLabel;
      });
  }

  @SubscribeMessage('del')
  async del(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.deleteLabel(data.id)
      .then(() => {
        socket.to(room).broadcast.emit('rem', { id: data.id });
        return false;
      }, () => true);
  }
}
