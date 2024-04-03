'use client';

import React from 'react'
import { useGetOrder, useRemoveFromOrder } from './use-order';
import ClearDialog from '../clearDialog/ClearDialog';
import { Button } from '@/components/ui/button';


export default function OrderList() {
  const { orders, isLoading, isError } = useGetOrder();
  const { mutate: removeFromOrder } = useRemoveFromOrder();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while loading orders.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {orders && orders.map((orderItem) => (
        <div key={orderItem.id} className="border border-gray-300 rounded p-4 mb-4">
          <p className="font-bold">Order ID: {orderItem.id}</p>
          <p>User ID: {orderItem.userId}</p>
          <p>Date: {new Date(orderItem.createdAt).toLocaleDateString()} {new Date(orderItem.createdAt).toLocaleTimeString()}</p>
          <p>Total price: {orderItem.total} $</p>
          <p>Address: {orderItem.address}</p>
          <div>
            <ClearDialog
                dialogDescription="order list"
                onClear={() => {
                  removeFromOrder({orderId: orderItem.id});
                }}
              ><Button 
                  size={'default'} 
                  variant={'destructive'} 
                  >Clear order</Button>
              </ClearDialog>
          </div>
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