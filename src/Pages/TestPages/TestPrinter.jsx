import React, { useState } from "react";
import qz from "qz-tray";

export const TestPrinter = () => {
  const [printerName, setPrinterName] = useState("");
  const [loading, setLoading] = useState(false);

  // CONNECT + DETECT
  const detectPrinter = async () => {
    try {
      setLoading(true);

      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }

      const printers = await qz.printers.find();

      console.log(printers);

      if (printers.length > 0) {
        setPrinterName(printers[0]);

        alert(
          `Printer Found:\n${printers.join(", ")}`
        );
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      alert("Printer not found");

      setLoading(false);
    }
  };

  // TEST PRINT
  const printTest = async () => {
    try {
      if (!printerName) {
        alert("Detect printer first");
        return;
      }

      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }

      const config =
        qz.configs.create(printerName);

      await qz.print(config, [
        {
          type: "raw",

          data: `
--------------------------------
          FOODIE POS
--------------------------------

Burger          x2

Chicken         x1

Total: ৳ 650

--------------------------------

Thank You ❤️

--------------------------------



`,
        },
      ]);

      alert("Printed successfully");
    } catch (err) {
      console.log(err);

      alert("Print failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div
        className="
        max-w-xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      "
      >
        <h1 className="text-3xl font-bold mb-6">
          🖨 Printer Test
        </h1>

        <div className="space-y-4">

          <button
            onClick={detectPrinter}
            className="
            w-full
            bg-orange-500
            text-white
            py-3
            rounded-xl
          "
          >
            {loading
              ? "Detecting..."
              : "Detect Printer"}
          </button>

          {printerName && (
            <div
              className="
              bg-green-100
              rounded-xl
              p-4
            "
            >
              Connected:

              <div className="font-bold mt-1">
                {printerName}
              </div>
            </div>
          )}

          <button
            onClick={printTest}
            className="
            w-full
            bg-green-500
            text-white
            py-3
            rounded-xl
          "
          >
            Print Test Receipt
          </button>

        </div>
      </div>

    </div>
  );
};