import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema/user.schema';

@Injectable()
export class UserService {
    private readonly logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Inject the User model
  ) {
    this.logger = new Logger(UserService.name);
  }

  /**
   * Finds a user by email securely.
   * @param email - User's email
   * @returns UserDocument if found, or null otherwise
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    this.logger.log(`Searching for user with email: ${email}`);
    // Use strict equality ($eq) to prevent query injection
    const user = await this.userModel.findOne({ email: { $eq: email } }).exec();
    if (user) {
      this.logger.log(`User found for email: ${email}`);
    } else {
      this.logger.warn(`No user found for email: ${email}`);
    }
    return user;
  }

  /**
   * Creates a new user securely.
   * @param user - Partial user data
   * @returns The created UserDocument
   */
  async create(user: Partial<User>): Promise<UserDocument> {
    this.logger.log(`Creating user with email: ${user.email}`);
    const createdUser = new this.userModel(user);
    const result = await createdUser.save();
    this.logger.log(`User successfully created with email: ${user.email}`);
    return result;
  }
}
