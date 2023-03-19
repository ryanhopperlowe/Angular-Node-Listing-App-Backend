import { db } from "../database"

export const addViewToListingRoute = {
  method: 'POST',
  path: '/api/listings/{id}/add-view',
  handler: async (req, h) => {
    const { id } = req.params;

    await db.query(
      'UPDATE listings SET views=views+1 WHERE id=?',
      [id]
    );

    const { results: [listing] } = await db.query(
      'SELECT * FROM listings WHERE id=?',
      [id]
    );

    return listing;
  }
}