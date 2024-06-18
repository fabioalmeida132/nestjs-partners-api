import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { CriarEventosRequest } from './request/criar-eventos.request';
import { AtualizarEventoRequest } from './request/atualizar-evento.request';
import type { ReservarLugarRequest } from './request/reservar-lugar.request';
import { TicketKind } from '@prisma/client';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() criarEventoRequest: CriarEventosRequest) {
    return this.eventsService.create({
      name: criarEventoRequest.nome,
      date: criarEventoRequest.data,
      description: criarEventoRequest.descricao,
      price: criarEventoRequest.preco,
    });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarEventoRequest: AtualizarEventoRequest,
  ) {
    return this.eventsService.update(id, {
      name: atualizarEventoRequest.nome,
      date: atualizarEventoRequest.data,
      description: atualizarEventoRequest.descricao,
      price: atualizarEventoRequest.preco,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserva')
  reserveSpot(
    @Param('id') eventoId: string,
    @Body() request: ReservarLugarRequest,
  ) {
    return this.eventsService.reserveSpot({
      eventId: eventoId,
      spots: request.lugares,
      email: request.email,
      ticket_kind:
        request.tipo_ingresso === 'inteira' ? TicketKind.full : TicketKind.half,
    });
  }
}
