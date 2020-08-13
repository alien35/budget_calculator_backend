type ErrorResponseType = {
  error: string
}

type SuccessResponseType<T> = {
  success: true,
  data: T
}

function ErrorResponse(message: string): ErrorResponseType {
  return { error: message }
}

// By using a generic type, we can define the type
// in each instance
function SuccessResponse<T>(message: T): SuccessResponseType<T> {
  return { success: true, data: message }
}

export default {
  ErrorResponse,
  SuccessResponse
}
