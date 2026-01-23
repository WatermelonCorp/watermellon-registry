"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const InvoiceView = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-0231",
    companyName: "Acme Corp.",
    companyEmail: "hi@acmecorp.com",
    billedByName: "John Jacobs",
    billedByEmail: "hijacob@gmail.com",
    billedByAddress: "123 Maple Street, Springfield",
    billedToCompany: "Acme Corp.",
    billedToEmail: "hi@acmecorp.com",
    billedToAddress: "321 Apple Street, Autumfield",
    dateIssued: "Jul 28, 2025",
    dueDate: "Jul 31, 2025",
    items: [{ description: "Website Design", qty: 1, cost: 49.0, total: 49.0 }],
    currency: "USD",
  });

  interface InvoiceItem {
    description: string;
    qty: number;
    cost: number;
    total: number;
  }

  interface Invoice {
    invoiceNumber: string;
    companyName: string;
    companyEmail: string;
    billedByName: string;
    billedByEmail: string;
    billedByAddress: string;
    billedToCompany: string;
    billedToEmail: string;
    billedToAddress: string;
    dateIssued: string;
    dueDate: string;
    items: InvoiceItem[];
    currency: string;
  }

  const handleInputChange = (field: keyof Invoice, value: string): void => {
    setInvoice((prev: Invoice) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ): void => {
    const updatedItems = [...invoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "description" ? value : parseFloat(value) || 0,
    };
    // Auto-calculate total
    if (field === "qty" || field === "cost") {
      updatedItems[index].total =
        updatedItems[index].qty * updatedItems[index].cost;
    }
    setInvoice((prev: Invoice) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", qty: 1, cost: 0, total: 0 }],
    }));
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col h-full w-full px-2 py-4">
      <div className="flex gap-6 h-full w-full overflow-y-auto">
        {/* Left Side - Form */}
        <div className="flex-1 p-4 border-[1.5px] rounded-lg">
          <div className="space-y-6">
            {/* Header Section */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Invoice Number
              </h3>
              <Input
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  handleInputChange("invoiceNumber", e.target.value)
                }
                placeholder="INV-0001"
                className="h-10"
              />
            </div>

            {/* Company Details */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Company Details
              </h3>
              <div className="space-y-3 p-3 rounded-lg border">
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Company Name
                  </label>
                  <Input
                    value={invoice.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="Your Company"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Company Email
                  </label>
                  <Input
                    value={invoice.companyEmail}
                    onChange={(e) =>
                      handleInputChange("companyEmail", e.target.value)
                    }
                    placeholder="company@email.com"
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Billed By
              </h3>
              <div className="space-y-3  p-3 rounded-lg border">
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Name
                  </label>
                  <Input
                    value={invoice.billedByName}
                    onChange={(e) =>
                      handleInputChange("billedByName", e.target.value)
                    }
                    placeholder="Your Name"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Email
                  </label>
                  <Input
                    value={invoice.billedByEmail}
                    onChange={(e) =>
                      handleInputChange("billedByEmail", e.target.value)
                    }
                    placeholder="email@email.com"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Address
                  </label>
                  <Input
                    value={invoice.billedByAddress}
                    onChange={(e) =>
                      handleInputChange("billedByAddress", e.target.value)
                    }
                    placeholder="Street Address"
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Billed To */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Billed To
              </h3>
              <div className="space-y-3  p-3 rounded-lg border">
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Company
                  </label>
                  <Input
                    value={invoice.billedToCompany}
                    onChange={(e) =>
                      handleInputChange("billedToCompany", e.target.value)
                    }
                    placeholder="Client Company"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Email
                  </label>
                  <Input
                    value={invoice.billedToEmail}
                    onChange={(e) =>
                      handleInputChange("billedToEmail", e.target.value)
                    }
                    placeholder="client@email.com"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Address
                  </label>
                  <Input
                    value={invoice.billedToAddress}
                    onChange={(e) =>
                      handleInputChange("billedToAddress", e.target.value)
                    }
                    placeholder="Street Address"
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Dates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Date Issued
                  </label>
                  <Input
                    value={invoice.dateIssued}
                    onChange={(e) =>
                      handleInputChange("dateIssued", e.target.value)
                    }
                    placeholder="Date"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600 mb-1 block">
                    Due Date
                  </label>
                  <Input
                    value={invoice.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    placeholder="Date"
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold mb-3 text-neutral-600 tracking-tight">
                Invoice Items
              </h3>
              <div className="space-y-3">
                {invoice.items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      placeholder="Item description"
                      className="h-8 text-sm"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-neutral-600 mb-1 block">
                          Qty
                        </label>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(index, "qty", e.target.value)
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-600 mb-1 block">
                          Cost
                        </label>
                        <Input
                          type="number"
                          value={item.cost}
                          onChange={(e) =>
                            handleItemChange(index, "cost", e.target.value)
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-600 mb-1 block">
                          Total
                        </label>
                        <Input
                          type="number"
                          value={item.total.toFixed(2)}
                          readOnly
                          className="h-8 text-sm bg-neutral-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={addItem}
                  variant="outline"
                  className="w-full h-9 text-sm"
                >
                  + Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 p-1.5 max-h-[900px] bg-neutral-50 rounded-xl border-[1.5px] border-neutral-200/60">
          <div
            className="relative bg-white rounded-lg p-8 border-[1.5px] h-full flex flex-col justify-between "
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-[40px] h-[40px] rounded-bl-xl bg-neutral-200/50 border-l-[1.5px] border-b-[1.5px] border-neutral-200/60
  "
            ></div>
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-semibold text-neutral-900 mb-1 tracking-tight">
                  Invoice
                </h1>
                <div className="grid grid-cols-2 gap-8 my-4 font-semibold">
                  <span className="text-neutral-500 tracking-tight">
                    Invoice Number
                  </span>
                  <span className="text-sm font-bold text-neutral-900">
                    {invoice.invoiceNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm  font-semibold text-neutral-600 mb-3">
                    Billed by:
                  </h3>
                  <div className="text-sm">
                    <p className="font-semibold text-neutral-900">
                      {invoice.billedByName}
                    </p>
                    <p className="text-neutral-500">{invoice.billedByEmail}</p>
                    <p className="text-neutral-500">
                      {invoice.billedByAddress}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600 mb-3">
                    Billed to:
                  </h3>
                  <div className="text-sm">
                    <p className="font-semibold text-neutral-900">
                      {invoice.billedToCompany}
                    </p>
                    <p className="text-neutral-600">{invoice.billedToEmail}</p>
                    <p className="text-neutral-600">
                      {invoice.billedToAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600 mb-2">
                    Date Issued:
                  </h3>
                  <p className="text-neutral-900 font-medium text-sm">
                    {invoice.dateIssued}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-600 mb-2">
                    Due Date:
                  </h3>
                  <p className="text-neutral-900 font-medium text-sm">
                    {invoice.dueDate}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left text-sm font-semibold text-neutral-600 pb-2">
                        Item
                      </th>
                      <th className="text-center text-sm font-semibold text-neutral-600 pb-2">
                        QTY
                      </th>
                      <th className="text-right text-sm font-semibold text-neutral-600 pb-2">
                        Cost
                      </th>
                      <th className="text-right text-sm font-semibold text-neutral-600 pb-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-100">
                        <td className="py-3 text-sm text-neutral-500 font-medium">
                          {item.description}
                        </td>
                        <td className="py-3 text-sm text-center text-neutral-500 font-medium">
                          {item.qty}
                        </td>
                        <td className="py-3 text-sm text-right text-neutral-500 font-medium">
                          ${item.cost.toFixed(2)}
                        </td>
                        <td className="py-3 text-sm text-right text-neutral-500 font-medium">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end ">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b-2 border-neutral-200">
                  <span className="text-sm text-neutral-600">Subtotal</span>
                  <span className="text-sm text-neutral-900 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className=" font-semibold text-neutral-900">Total</span>
                  <span className=" font-semibold text-neutral-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
