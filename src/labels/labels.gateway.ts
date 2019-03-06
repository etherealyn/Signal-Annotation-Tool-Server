import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@WebSocketGateway({ origins: 'http://localhost:4200', namespace: 'labels'})
export class LabelsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() server;

  afterInit(server) {
    console.log('afterInit');
  }

  handleConnection(client, ...args: any[]) {
    console.log('connect', client.id);
  }

  @SubscribeMessage('add')
  async add(client, data) {
    console.log('add', data);
    return 'ack';
  }

  handleDisconnect(client) {
    console.log('disconnect', client.id);
  }

  // @SubscribeMessage('labels')
  // findAll(client, data): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'labels', data: item })));
  // }
  //
  // @SubscribeMessage('identity')
  // async identity(client, data: number): Promise<number> {
  //   return data;
  // }
}
