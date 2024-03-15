import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodenv: process.env.NODE_ENV,
}));
