import { db } from "../database";
import { extractUser } from "../lib/auth-token";

export const updateListingRoute = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const {
      name = '',
      description = '',
      price = 0
    } = req.payload;

    const { userId } = await extractUser(req);

    await db.query(`
      UPDATE listings 
        SET name=?, description=?, price=?
        WHERE id=? AND user_id=?
    `, [name, description, price, id, userId]);

    const { results: [listing] } = await db.query(
      'SELECT * FROM listings WHERE id=? AND user_id=?',
      [id, userId]
    );

    return listing;
  }
}