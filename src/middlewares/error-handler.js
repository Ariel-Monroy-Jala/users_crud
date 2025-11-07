export const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || 500
    ctx.body = {
      success: false,
      message: error.message || 'Internal Server Error'
    }
    ctx.app.emit('error', error, ctx)
  }
}
