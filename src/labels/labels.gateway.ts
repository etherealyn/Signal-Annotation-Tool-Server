import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { LabelsService } from './labels.service';
import { ObjectID } from 'mongodb';
import { Label } from '../entities/label.entity';
import { Server, Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @WebSocketGateway({ origins: '*localhost:*', namespace: 'labels' })
@WebSocketGateway()
export class LabelsGateway {
  @WebSocketServer() server;

  @SubscribeMessage('events')
  findAll(client, data): Observable<WsResponse<number>> {
    console.log('events');
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client, data: number): Promise<number> {
    return data;
  }
}
