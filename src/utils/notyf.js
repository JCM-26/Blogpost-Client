import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 3200,
  position: { x: 'right', y: 'top' },
  dismissible: true,
  types: [
    { type: 'success', background: '#21463f' },
    { type: 'error', background: '#8c3b2e' },
  ],
})

// blogpostAPI error responses are expected to carry a `message` field
// (same shape the author's fitnessAPI uses). Fall back to a generic
// message for network errors or unexpected shapes.
export function notifyError(err, fallback = 'Something went wrong.') {
  const message = err?.response?.data?.message || fallback
  notyf.error(message)
}

export function notifySuccess(message) {
  notyf.success(message)
}

export default notyf
