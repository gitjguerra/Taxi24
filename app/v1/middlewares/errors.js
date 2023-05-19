const error = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res, next);
  } catch (err) {
    return res.status(500).json({
      message: "Ha ocurrido un error al intentar acceder a la base de datos",
    });
  }
};

export default error;
