import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SignUpUserDto } from './dto/singup_user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schema/user.schema';
import { LogInUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }
  hashPassword(password: string): Observable<string> {
    // const salt = await bcrypt.genSalt();
    return from(bcrypt.hash(password, 10));
  }

  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepo.findOne({ email });
    if (user && this.comparePasswords(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // deneme(signUpUserDto: SignUpUserDto): Observable<Object> {
  //   return this.usersRepo.create(signUpUserDto);
  // }
  signup(signUpUserDto: SignUpUserDto): Observable<Object> {
    // mail db de var mı kontrol et varsa mail kullanılıyor exeptionu döndür
    //mail kullanılmıyorsa passwordu hash et yeni userın passwordu ile değiştir ve kaydet
    // user için jwt token oluştur headerda token body de userı password olmadan bilgileriyle geri dön

    return this.mailExists(signUpUserDto.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.hashPassword(signUpUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              signUpUserDto.password = passwordHash;
              return from(this.usersRepo.create(signUpUserDto)).pipe(
                switchMap((savedUser: User) => {
                  return this.generateJwt(savedUser).pipe(
                    map((jwt: string) => {
                      return [jwt, savedUser];
                    }),
                  );
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LogInUserDto): Observable<Object> {
    // userı email ile bul yoksa exeption dödür
    //varsa gelen passwordu dbdeki haslı halıyle karşılaştır uymuyorsa exeption döder
    // okeyse token olulştur headerda token bodyde user password olmadan geri dön
    return from(this.usersRepo.findOne({ email: loginUserDto.email })).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.comparePasswords(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.generateJwt(user).pipe(
                  map((jwt: string) => {
                    return [jwt, user];
                  }),
                );
                //  const { password, ...result } = user;
                //  return [jwt, user];
              } else {
                throw new HttpException(
                  'Login was not Successfulll',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.usersRepo.findOne({ email })).pipe(
      map((user: User) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
