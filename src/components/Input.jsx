import { forwardRef } from 'react'
import InputLabel from './InputLabel'
import InputErrorMessage from './InputErrorMessage'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <input
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
