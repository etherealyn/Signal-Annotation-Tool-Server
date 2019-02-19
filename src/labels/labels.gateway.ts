import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.sub';

@WebSocketGateway({ origins: 'http://localhost:4200' })
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

  @SubscribeMessage('deleteLabel')
  async deleteLabel(client, payload) {
    await this.labelsService.deleteLabel(payload.projectId, payload.index)
      .then(async () => {
        await this.broadcastLabels(payload.projectId);
      });
  }

  async broadcastLabels(projectId: string) {
    const labels: Label[] = await this.labelsService.getLabels(projectId);
    this.server.emit('getLabels', { projectId, labels });
  }
}
