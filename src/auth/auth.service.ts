import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'; // For secure password hashing

@Injectable()
export class AuthService {
    private readonly logger: Logger;
  constructor(
    private readonly userService: UserService, // Inject UserService to manage user data
    private readonly jwtService: JwtService,   // Inject JwtService for token generation
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * Validates user credentials securely.
   * @param email - User's email address
   * @param pass - User's plain-text password
   * @returns User data excluding the password if validation is successful
   */
  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Attempting to validate user with email: ${email}`);
    // Retrieve user by email using a secure query
    const user = await this.userService.findByEmail(email);

    // If user exists and password matches, return user details without the password
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // Exclude password from returned data
      return result;
    }

    // Throw an exception if credentials are invalid
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Generates a JWT token for the authenticated user.
   * @param user - User data
   * @returns JWT token
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user._id }; // Token payload
    this.logger.log(`Generating JWT token for user: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT token
    };
  }

  /**
   * Registers a new user securely.
   * @param userDto - User registration data
   * @returns Created user data
   */
  async register(userDto: any) {
    this.logger.log(`Registering new user with email: ${userDto.email}`);
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(userDto.password, 12); // 12 rounds of hashing
    return this.userService.create({ ...userDto, password: hashedPassword });
  }
}
