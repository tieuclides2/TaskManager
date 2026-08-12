const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00ADB5] text-white'
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]'
    }

    if (variant === 'secondary') {
      return 'text-[#35383E] bg-[#EEEEEE]'
    }
  }

  const getSizeClasses = () => {
    if (size === 'small') {
      return 'py-1 text-xs'
    }

    if (size === 'large') {
      return 'py-2 text-sm'
    }
  }
  return (
    <button
      className={`flex justify-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
