import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventsCoreModule } from '@app/core';

@Module({
  imports: [EventsCoreModule],
  controllers: [EventosController],
})
export class EventosModule {}
