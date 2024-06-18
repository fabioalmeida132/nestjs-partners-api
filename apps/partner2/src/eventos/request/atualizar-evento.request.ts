import { PartialType } from '@nestjs/mapped-types';
import { CriarEventosRequest } from './criar-eventos.request';

export class AtualizarEventoRequest extends PartialType(CriarEventosRequest) {}
