// import React, { useEffect, useRef } from "react";

// export const PosReceipt = ({ order, onClose }) => {
//   const receiptRef = useRef();

//   useEffect(() => {
//     if (!order) return;

//     setTimeout(() => {
//       window.print();
//       onClose();
//     }, 300);

//   }, [order]);

//   if (!order) return null;

//   const total = (order.price * order.quantity).toFixed(2);
//   const date = new Date().toLocaleString();

//   return (
//     <div ref={receiptRef} className="receipt-container">

//       <div className="receipt">

//         <div className="center bold">FOODIE</div>
//         <div className="center">Dhaka, Bangladesh</div>

//         <div className="line"></div>

//         <div>Date: {date}</div>

//         <div className="line"></div>

//         <table>
//           <tbody>
//             <tr>
//               <td>{order.name}</td>
//               <td className="right">
//                 {order.quantity} x ${order.price.toFixed(2)}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="line"></div>

//         <table>
//           <tbody>
//             <tr className="bold">
//               <td>Total</td>
//               <td className="right">${total}</td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="line"></div>

//         <div className="center">
//           Thank You ❤️ <br/>
//           Visit Again
//         </div>

//       </div>

//       <style>{`

//         .receipt-container{
//           position:fixed;
//           left:0;
//           top:0;
//           background:white;
//         }

//         .receipt{
//           width:80mm;
//           font-family: monospace;
//           font-size:12px;
//           padding:10px;
//         }

//         .center{
//           text-align:center;
//         }

//         .right{
//           text-align:right;
//         }

//         .bold{
//           font-weight:bold;
//         }

//         .line{
//           border-top:1px dashed black;
//           margin:8px 0;
//         }

//         table{
//           width:100%;
//         }

//       `}</style>

//     </div>
//   );
// };

// import React, { useEffect } from "react";

// export const PosReceipt = ({ order, onClose }) => {

//   useEffect(() => {
//     setTimeout(() => {
//       window.print();
//       onClose();
//     }, 200);
//   }, []);

//   if (!order) return null;

//   const total = order.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   return (
//     <div style={{ width: "80mm", fontFamily: "monospace" }}>
//       <h2>🍽 Foodie POS</h2>
//       <p>Token: {order.token}</p>
//       <hr />
//       {order.cart.map(i => (
//         <div key={i.id}>
//           {i.name} x {i.quantity} - ${ (i.price*i.quantity).toFixed(2) }
//         </div>
//       ))}
//       <hr />
//       <strong>Total: ${total.toFixed(2)}</strong>
//     </div>
//   );
// };

import React from "react";
export const PosReceipt = ({ cartsItems }) => {
const handlePrint = () => {
  if (cartsItems.length === 0) return;

  const date = new Date().toLocaleString();

  const kitchenItems = cartsItems.map(item => `
    <div style="display:flex; justify-content:space-between;">
      <span>${item.name}</span>
      <span>x${item.quantity}</span>
    </div>
  `).join("");

  const customerItems = cartsItems.map(item => `
    <div style="display:flex; justify-content:space-between;">
      <span>${item.name} x${item.quantity}</span>
      <span>$${item.total}</span>
    </div>
  `).join("");

  const total = cartsItems
    .reduce((acc, item) => acc + parseFloat(item.total), 0)
    .toFixed(2);

  const printContent = `
    <html>
      <head>
        <style>
          body { width: 80mm; font-family: monospace; padding: 10px; }
          .center { text-align: center; }
          .line { border-top: 1px dashed #000; margin: 8px 0; }
          .bold { font-weight: bold; }
          .cut { margin: 20px 0; border-top: 2px dashed red; }
        </style>
      </head>
      <body>

        <div class="center">
          <h3>KITCHEN COPY</h3>
          <p>Token: 01</p>
          <p>${date}</p>
        </div>

        <div class="line"></div>
        ${kitchenItems}
        <div class="line"></div>

        <div class="center bold">Prepare Order 🍳</div>

        <div class="cut"></div>

        <div class="center">
          <h3>Foodie</h3>
          <p>Customer Copy</p>
          <p>Token: 01</p>
          <p>${date}</p>
        </div>

        <div class="line"></div>
        ${customerItems}
        <div class="line"></div>

        <div class="bold" style="display:flex; justify-content:space-between;">
          <span>Total</span>
          <span>$${total}</span>
        </div>

        <div class="line"></div>

        <div class="center">Thank You ❤️</div>

      </body>
    </html>
  `;

  const win = window.open("", "", "width=300,height=600");

  win.document.write(printContent);
  win.document.close();

  setTimeout(() => {
    win.print();
    win.close();
    setCartItems([]);
  }, 300);
};
};