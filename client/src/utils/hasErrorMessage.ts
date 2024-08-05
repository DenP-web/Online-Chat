export function hasErrorMessage(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string' && err.message !== null && 'message' in err
  )
}