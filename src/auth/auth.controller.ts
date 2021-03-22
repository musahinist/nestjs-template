import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guard/local-auth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/login-auth.dto';
import { SignUpUserDto } from './dto/singup_user.dto';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/users/schema/user.schema';
import { Observable } from 'rxjs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() signUpUserDto: SignUpUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(signUpUserDto).pipe(
      map((data) => {
        res.setHeader('Auth-Token', data[0]);
        const { password, ...user } = data[1].toObject();
        return user;
      }),
    );
  }

  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: User })
  @Post('login')
  @HttpCode(200)
  login(
    @Body() logInUserDto: LogInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(logInUserDto).pipe(
      map((data) => {
        res.setHeader('Auth-Token', data[0]);
        const { password, ...user } = data[1].toObject();
        return user;
      }),
    );
  }
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
  // @Post('deneme')
  // deneme(
  //   @Body() signUpUserDto: SignUpUserDto,
  //   //  @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.authService.deneme(signUpUserDto);
  // }
}
