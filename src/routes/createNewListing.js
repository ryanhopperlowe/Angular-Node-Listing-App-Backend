import { v4 as uuid } from 'uuid';
import { db } from '../database';
import { extractUser } from '../lib/auth-token';

export const createNewListingRoute = {
  method: 'POST',
  path: '/api/listings',
  handler: async (req, h) => {
    const id = uuid();
    const { userId } = await extractUser(req);

    const {
      name = '',
      description = '',
      price = 0
    } = req.payload;

    const views = 0;

    await db.query(`
      INSERT INTO listings (id, name, description, price, user_id, views)
        VALUES
          (?, ?, ?, ?, ?, ?)
    `, [id, name, description, price, userId, views]);

    return { id, name, description, price, views, user_id: userId };
  }
}