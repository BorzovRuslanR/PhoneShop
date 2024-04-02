'use client';

import React from 'react'
import { useGetOrder } from './use-order';


export default function OrderList() {
  const { order, isLoading, isError } = useGetOrder(); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while loading orders.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {order && order.map((orderItem) => (
        <div key={orderItem.id} className="border border-gray-300 rounded p-4 mb-4">
          <p className="font-bold">Order ID: {orderItem.id}</p>
          <p>User ID: {orderItem.userId}</p>
          <p>Total price: {orderItem.total} $</p>
          <p>Address: {orderItem.address}</p>
          <h2 className="text-lg font-bold mt-4 mb-2">Items:</h2>
          {orderItem.items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded p-2 mb-2">
              <p className="font-bold">Item ID: {item.id}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price} $</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}