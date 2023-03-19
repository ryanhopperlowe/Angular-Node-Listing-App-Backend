import Boom from "@hapi/boom";
import { fakeListings } from "./fake-data";

export const getListingRoute = {
  method: 'GET',
  path: '/api/listing/{id}',
  handler: (req, h) => {
    const listingId = req.params.id;
    const listing = fakeListings.find(({ id }) => id === listingId);
    if (!listing) throw Boom.notFound(`Listing does not exist with id ${listingId}`);
    return listing
  }
}