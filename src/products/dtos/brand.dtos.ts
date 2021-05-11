import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty() // Decorardor que permite poner los campos como no requeridos
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty() // Decorardor que permite poner los campos como no requeridos
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
