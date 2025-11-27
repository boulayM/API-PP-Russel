/**
 * Middleware permettant de sécuriser l’accès à la documentation Swagger.
 * 
 * - En développement : Swagger est toujours accessible
 * - En production : Swagger est accessible uniquement aux administrateurs
 */

module.exports = function allowSwagger(req, res, next) {
  const isDev = process.env.NODE_ENV !== "production";

  // Mode développement → toujours accessible
  if (isDev) return next();

  // Production → accès réservé aux admins
  if (req.session?.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    error: "Accès refusé. Documentation disponible uniquement pour les administrateurs."
  });
};
