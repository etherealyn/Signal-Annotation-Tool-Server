import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.sub';

@WebSocketGateway({ origins: 'http://localhost:4200', namespace: 'labels' })
export class LabelsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
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
    await this.labelsService.editLabel(payload.projectId, payload.index, payload.name)
      .then(async () => {
        await this.broadcastLabels(payload.projectId);
      });
  }

  @SubscribeMessage('deleteLabel')
  async deleteLabel(client, payload) {
    await this.labelsService.deleteLabel(payload.projectId, payload.index)
      .then(async () => {
        await this.broadcastLabels(payload.projectId);
      });
  }

  @SubscribeMessage('getLabels')
  async getLabels(client, payload) {
    const labels: Label[] = await this.labelsService.getLabels(payload.projectId);
    client.emit(labels);
  }

  async broadcastLabels(projectId: string) {
    const labels: Label[] = await this.labelsService.getLabels(projectId);
    this.server.emit('getLabels', { projectId, labels });
  }

  handleConnection(client, args: any[]): any {
    console.log(`${client.id} connected`);
  }

  handleDisconnect(client): any {
    console.log(`${client.id} disconnected`);
  }

  afterInit(server): any {
    // console.log(server);
  }
}
