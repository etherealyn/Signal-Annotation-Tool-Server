import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.entity';

@WebSocketGateway({ origins: 'http://localhost:4200', namespace: 'labels' })
export class LabelsGateway {
  @WebSocketServer() server;

  constructor(private labelsService: LabelsService) {
  }

  @SubscribeMessage('addLabel')
  async addLabel(client, payload) {
    const ack = await this.labelsService.createLabel(payload.authorId, payload.projectId);

    if (ack) {
      await this.broadcastLabels(payload.projectId);
    }
  }

  @SubscribeMessage('editLabel')
  async editLabel(client, payload) {
    await this.labelsService.editLabel(payload.projectId, payload.labelId, payload.name)
      .then(async () => {
        await this.broadcastLabels(payload.projectId);
      });
  }

  @SubscribeMessage('deleteLabel')
  async deleteLabel(client, payload) {
    await this.labelsService.deleteLabel(payload.projectId, payload.labelId)
      .then(async () => {
        await this.broadcastLabels(payload.projectId);
      });
  }

  @SubscribeMessage('getLabels')
  async getLabels(client, payload) {
    const labels: Label[] = await this.labelsService.getLabels(payload.projectId);
    client.emit(labels);
  }

  @SubscribeMessage('addRange')
  async addRange(client, payload) {
    await this.labelsService.addRange(payload.projectId, payload.labelId, payload.range);
  }

  @SubscribeMessage('removeRange')
  async removeRange(client, payload) {
    await this.labelsService.removeRange(payload.projectId, payload.labelId, payload.rangeId)
      .then((value => {
        console.log('removeRange', 'fulfilled', value);
      }), reason => {
        console.log('removeRange', 'rejected', reason);
      });
  }

  async broadcastLabels(projectId: string) {
    const labels: Label[] = await this.labelsService.getLabels(projectId);
    this.server.emit('getLabels', { projectId, labels });
  }
}
