import { db } from "../database";
import { extractUser } from "../lib/auth-token";

export const deleteListingRoute = {
  method: 'DELETE',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { userId } = await extractUser(req);
    await db.query(
      'DELETE FROM listings WHERE id=? AND user_id=?',
      [id, userId]
    );

    return { message: 'Success' };
  }
}