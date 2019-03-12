export default function () {
  return {
    middlewareOrder: ['fileMiddleware', 'folderMiddleware']
  };
}