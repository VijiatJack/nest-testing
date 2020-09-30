import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@ApiBearerAuth()
@ApiTags('cats')
@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Found records' })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found record', type: Cat })
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(+id);
  }
}