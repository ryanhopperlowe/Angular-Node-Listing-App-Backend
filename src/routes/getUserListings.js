import { db } from "../database";
import { verifyIsAuthorized } from "../lib/auth-token";

export const getUserListingsRoute = {
  method: 'GET',
  path: '/api/users/{userId}/listings',
  handler: async (req, h) => {
    const { userId } = req.params;
    await verifyIsAuthorized(req, userId);

    const { results: listings } = await db.query(
      'SELECT * FROM listings WHERE user_id=?',
      [userId]
    );
    
    return listings;
  }
}