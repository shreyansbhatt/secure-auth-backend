import { UserSchema } from './user.schema';

describe('UserSchema', () => {
  it('should be defined', () => {
    expect(UserSchema).toBeDefined(); // Check if the schema is defined
  });

  it('should have required properties', () => {
    const schemaPaths = Object.keys(UserSchema.paths);
    expect(schemaPaths).toContain('email');
    expect(schemaPaths).toContain('name');
    expect(schemaPaths).toContain('password');
  });
});
