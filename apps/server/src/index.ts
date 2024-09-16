import './__importConfig';
import 'express-async-errors';

import { server } from './server';
import { EUserRole, prismaClient } from '@repo/db';

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`server running on ${port}`);
});

// ========================
// extends typings
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: EUserRole;
        email: string;
        username: string;
      };
    }
  }
}
