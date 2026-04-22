import React, { useState } from "react";
import { PosReceipt } from "./PosReceipt";

export const OrderModal = ({
  isModalOpen,
  selectedItem,
  setQuantity,
  closeModal,
  quantity,
  setCartOpen,
  cartItems,
  setCartItems,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);

  if (!isModalOpen || !selectedItem) return null;

  const total = (selectedItem.price * quantity).toFixed(2);

  const handlePlaceOrder = () => {
    handleConfirm();
  };

  // console.log("Selected Item:", selectedItem);

  const handleConfirm = () => {
    setPrintOrder({
      productId: selectedItem._id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: quantity,
    });

    setConfirming(false);
    setCartOpen(true);
    setCartItems([
      ...cartItems,
      {
        productId: selectedItem._id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: quantity,
        total: total,
      },
    ]);
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-xl w-80">
          {!confirming ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>

              <p className="text-gray-600 mb-4">{selectedItem.description}</p>

              <p className="font-semibold mb-4">
                Price: ৳ {selectedItem.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="text-lg">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <p className="font-bold mb-4">Total: ৳ {total}</p>

              <div className="flex gap-2">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                >
                  Add to Cart
                </button>

                <button
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded w-full hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

              <p className="mb-2">Item: {selectedItem.name}</p>

              <p className="mb-2">Quantity: {quantity}</p>

              <p className="mb-4 font-semibold">Total: ৳ {total}</p>

              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
                >
                  Confirm Order
                </button>

                <button
                  onClick={() => setConfirming(false)}
                  className="bg-gray-300 px-4 py-2 rounded w-full hover:bg-gray-400"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* {printOrder && (
        <PosReceipt order={printOrder} onClose={() => setPrintOrder(null)} />
      )} */}
    </>
  );
};
