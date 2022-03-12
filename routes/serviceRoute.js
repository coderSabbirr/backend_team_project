const express = require("express");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceDetails,
  createServiceReview,
  getServiceReviews,
  deleteReview,
  getAdminServices,
} = require("../controllers/serviceController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/services").get(getAllServices);

router
  .route("/admin/services")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminServices);

router
  .route("/admin/service/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createService);

router
  .route("/freelancer/service/new")
  .post(isAuthenticatedUser, authorizeRoles("freelancer"), createService);

router
  .route("/admin/service/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

router.route("/service/:id").get(getServiceDetails);

router.route("/review").put(isAuthenticatedUser, createServiceReview);

router
  .route("/reviews")
  .get(getServiceReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
