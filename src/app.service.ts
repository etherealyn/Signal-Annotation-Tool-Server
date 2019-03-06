import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The SAT Backend is working!'; // fixme: add REST API documentation
  }
}
