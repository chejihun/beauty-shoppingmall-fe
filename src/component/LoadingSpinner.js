import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingSpinner = () => {
  return (
    <div>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="2"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  )
}

export default LoadingSpinner