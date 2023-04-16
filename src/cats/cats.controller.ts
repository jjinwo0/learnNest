import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all Cat';
  }

  @Get('/:id')
  getOneCat() {
    return 'one Cat';
  }

  @Post()
  createCat() {
    return 'create Cat';
  }

  @Put('/:id')
  updateCat() {
    return 'update Cat';
  }

  @Patch('/:id')
  updatePartialCat() {
    return 'update';
  }

  @Delete('/:id')
  deleteCat() {
    return 'delete Cat';
  }
}
