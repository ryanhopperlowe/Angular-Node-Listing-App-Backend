import { db } from "../database"
import { fakeListings } from "./fake-data"

export const getAllListingsRoute = {
  method: 'GET',
  path: '/api/listings',
  handler: async (req, h) => {
    const { results } = await db.query(
      'SELECT * from listings'
    );

    return results;
  }
}