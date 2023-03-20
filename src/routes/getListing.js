import Boom from "@hapi/boom";
import { db } from "../database";

export const getListingRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { results } = await db.query(
      'SELECT * FROM listings WHERE id=?',
      [id]
    );

    if (!results) throw Boom.notFound(`Listing does not exist with id ${listingId}`);
    return results[0];
  }
}