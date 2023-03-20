const angularRoutePaths = [
  '/',
  '/listings',
  '/contact/{id}',
  '/edit-listing/{id}',
  '/new-listing/{id}',
  '/my-listings',
  '/listings/{id}'
];

export const filesRoutes = angularRoutePaths.map((path) => ({
  method: 'GET',
  path,
  handler: (req, h) => {
    return h.file('dist/buy-and-sell/index.html');
  }
}));

export const staticFilesRoute = {
  method: 'GET',
  path: '/{params*}',
  handler: {
    directory: {
      path: 'dist/buy-and-sell'
    }
  }
}