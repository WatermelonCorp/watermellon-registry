import * as React from "react"

function WatermelonButton({
  className = "",
  children = "Watermelon",
  ...props
}: React.ComponentProps<"button"> & {
  className?: string
}) {
  const baseStyles = "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  
  return (
    <button
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { WatermelonButton as Button }
