import React from 'react'

type Props = {
  params: {
    productId: string
  }
}

export default function ProductPage({ params }: Props) {
  return (
    <div>Product {params.productId}</div>
  )
}
