const ERROR_HANDLERS = { // Types of error in our Backend
  CastError: res => res.status(400).send({
    error: 'Invalid ID format'
  }),

  ValidationError: (res, message) => res.status(400).send({
    error: message.message
  }),

  JsonWebTokenError: (res) => res.status(401).json({
    error: 'Token is missing or invalid'
  }),

  ServerError: (res) => res.status(500).send({
    error: 'Error en el servidor'
  }),

  defaultError: (res, error) => {
    console.error(`Error no manejado: ${error.message}`)
    res.status(500).send({
      error: 'Error en el servidor'
    })
  }
}

module.exports = (error, request, res, next) => {
  console.error(error.name)
  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.error

  handler(res, error)
}
