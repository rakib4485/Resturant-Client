import React, { useState } from "react";
import logo from "../assets/logo.svg"; // your logo

export const OrderModal = ({
  isModalOpen,
  selectedItem,
  setQuantity,
  closeModal,
  quantity,
}) => {
  const [confirming, setConfirming] = useState(false);

  if (!isModalOpen || !selectedItem) return null;

  const total = (selectedItem.price * quantity).toFixed(2);
  const orderDate = new Date().toLocaleString();

  const handlePlaceOrder = () => setConfirming(true);

  const handleConfirmPrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; }
            .header { display: flex; align-items: center; margin-bottom: 20px; }
            .header img { width: 60px; height: 60px; margin-right: 15px; }
            .header h2 { color: #FF6B00; margin: 0; }
            .line { border-bottom: 1px dashed #ccc; margin: 10px 0; }
            .item { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .total { font-weight: bold; font-size: 1.2rem; margin-top: 10px; color: #FF6B00; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.9rem; color: #555; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logo}" alt="Logo"/>
            <h2>Foodie Receipt</h2>
          </div>
          <p>Date: ${orderDate}</p>
          <div class="line"></div>

          <div class="item">
            <span>Item:</span>
            <span>${selectedItem.name}</span>
          </div>
          <div class="item">
            <span>Quantity:</span>
            <span>${quantity}</span>
          </div>
          <div class="item">
            <span>Price:</span>
            <span>$${selectedItem.price.toFixed(2)}</span>
          </div>
          <div class="line"></div>
          <div class="total">Total: $${total}</div>

          <div class="footer">
            Thank you for ordering!<br/>
            Visit us again at Foodie 🍽
          </div>
        </body>
      </html>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
    closeModal();
    setConfirming(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        {!confirming ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <p className="text-gray-600 mb-4">{selectedItem.description}</p>

            <p className="font-semibold mb-4">Price: ${selectedItem.price.toFixed(2)}</p>

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

            <p className="font-bold mb-4">Total: ${total}</p>

            <div className="flex gap-2">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
              >
                Place Order
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
            <p className="mb-4 font-semibold">Total: ${total}</p>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmPrint}
                className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
              >
                Confirm & Print
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
  );
};