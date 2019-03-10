import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import * as SocketIO from 'socket.io';
import { InsertResult } from 'typeorm';
import { Label } from '../entities/label.entity';
import { SegmentService } from './segment/segment.service';

@WebSocketGateway({ origins: 'http://localhost:4200', namespace: 'labels' })
export class LabelsGateway {
  @WebSocketServer() io: SocketIO.Server;

  constructor(private labelsService: LabelsService,
              private segmentService: SegmentService) {
  }

  // region 'Project' Room join/leave
  @SubscribeMessage('joinProject')
  async joinProject(socket: SocketIO.Socket, data): Promise<true | false> {
    return await new Promise((resolve, reject) => {
      socket.join(data.id, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    }).then(() => true, () => false);
  }

  @SubscribeMessage('leaveProject')
  async leaveProject(socket: SocketIO.Socket, data): Promise<true | false> {
    return await new Promise((resolve, reject) => {
      socket.leave(data.id, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    }).then(() => true, () => false);
  }

  // endregion

  // region Labels
  @SubscribeMessage('getLabels')
  async getLabels(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.getLabels(room, [ 'id', 'name' ]);
  }

  @SubscribeMessage('addLabel')
  async addLabel(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.createLabel(room, data.aid)
      .then(async (value: InsertResult) => {
        const id = value.identifiers[0].id;
        const newLabel: Label = await this.labelsService.getLabel(id);
        socket.to(room).broadcast.emit('newLabels', newLabel);
        return newLabel;
      });
  }

  @SubscribeMessage('deleteLabel')
  async deleteLabel(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    return await this.labelsService.deleteLabel(data.id)
      .then(() => {
        socket.to(room).broadcast.emit('removedLabels', { id: data.id });
        return false;
      }, () => true);
  }

  @SubscribeMessage('editLabel')
  async edit(socket: SocketIO.Socket, data) {
    const room = Object.keys(socket.rooms)[1];
    const labelId = data.id;
    const changeName = data.change;

    return await this.labelsService.updateLabelName(labelId, changeName)
      .then(() => {
        socket.to(room).broadcast.emit('updatedLabels', { id: labelId, change: changeName });
        return false;
      }, () => {
        return true;
      });
  }
  // endregion

  // region Segments


  // region
}
