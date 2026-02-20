"use client";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { initialInvoice } from "./data";

export const InvoiceView = () => {
  const [view, setView] = useState("form");
  const [invoice, setInvoice] = useState(initialInvoice);

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
    <div className="flex flex-col lg:h-[calc(100vh-4rem)] w-full px-2 py-4 lg:overflow-hidden">
      {/* View Switcher for Mobile/Tablet */}
      <div className="lg:hidden mb-4">
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-full h-10 bg-background dark:bg-card shadow-none font-medium border-border">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="form">Edit Invoice Form</SelectItem>
            <SelectItem value="preview">Live Invoice Preview</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full w-full lg:overflow-hidden">
        {/* Left Side - Form */}
        <div
          className={cn(
            "lg:flex-1 p-4 border-[1.5px] rounded-lg lg:overflow-y-auto scrollbar-hide bg-card border-border",
            view !== "form" && "hidden lg:block"
          )}
        >
          <div className="space-y-6">
            {/* Header Section */}
            <div>
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
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
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
                Company Details
              </h3>
              <div className="space-y-3 p-3 rounded-xl border border-border bg-background/30 px-4 py-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
                Billed By
              </h3>
              <div className="space-y-3 p-3 rounded-xl border border-border bg-background/30 px-4 py-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
                Billed To
              </h3>
              <div className="space-y-3 p-3 rounded-xl border border-border bg-background/30 px-4 py-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
                Dates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/30 rounded-xl border border-border p-3">
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
                <div className="bg-background/30 rounded-xl border border-border p-3">
                  <label className="text-xs text-muted-foreground mb-1 block font-medium">
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
              <h3 className="font-semibold mb-3 text-foreground/90 tracking-tight">
                Invoice Items
              </h3>
              <div className="space-y-3">
                {invoice.items.map((item, index) => (
                  <div key={index} className="border border-border bg-background/30 rounded-xl p-4 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground block font-medium">Description</label>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        placeholder="Item description"
                        className="h-9 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block font-medium">
                          Qty
                        </label>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(index, "qty", e.target.value)
                          }
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block font-medium">
                          Cost
                        </label>
                        <Input
                          type="number"
                          value={item.cost}
                          onChange={(e) =>
                            handleItemChange(index, "cost", e.target.value)
                          }
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block font-medium">
                          Total
                        </label>
                        <Input
                          type="number"
                          value={item.total.toFixed(2)}
                          readOnly
                          className="h-9 text-sm bg-muted/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={addItem}
                  variant="outline"
                  className="w-full h-10 text-sm rounded-xl border-dashed border-[1.5px] border-border bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  + Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div
          className={cn(
            "lg:flex-1 h-fit lg:h-full bg-muted/50 dark:bg-neutral-950/40 rounded-xl border-[1.5px] border-border lg:overflow-hidden",
            view !== "preview" && "hidden lg:block"
          )}
        >
          <div className="w-full lg:h-full flex lg:items-center justify-center p-4 sm:p-8 lg:p-10 overflow-y-auto lg:overflow-hidden custom-scrollbar">
            <div
              className="relative bg-white dark:bg-neutral-900 rounded-lg p-6 lg:p-10 border-[1.5px] border-border w-full lg:max-w-4xl h-fit lg:h-full shadow-2xl shadow-neutral-200/50 dark:shadow-neutral-950/50 flex flex-col justify-between lg:origin-center lg:scale-[0.95] 2xl:scale-100 transform transition-transform duration-300"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-[40px] h-[40px] rounded-bl-xl bg-neutral-50 dark:bg-neutral-800 border-border border-l-[1.5px] border-b-[1.5px]"
              ></div>
              <div>
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl lg:text-4xl font-semibold text-foreground mb-1 tracking-tight">
                    Invoice
                  </h1>
                  <div className="grid grid-cols-2 gap-4 sm:gap-8 my-4 font-semibold">
                    <span className="text-muted-foreground tracking-tight text-xs lg:text-sm">
                      Invoice Number
                    </span>
                    <span className="text-xs lg:text-sm font-bold text-foreground">
                      {invoice.invoiceNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xs lg:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                      Billed by:
                    </h3>
                    <div className="text-[10px] lg:text-sm leading-relaxed">
                      <p className="font-semibold text-foreground">
                        {invoice.billedByName}
                      </p>
                      <p className="text-muted-foreground">{invoice.billedByEmail}</p>
                      <p className="text-muted-foreground">
                        {invoice.billedByAddress}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs lg:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                      Billed to:
                    </h3>
                    <div className="text-[10px] lg:text-sm leading-relaxed">
                      <p className="font-semibold text-foreground">
                        {invoice.billedToCompany}
                      </p>
                      <p className="text-muted-foreground">{invoice.billedToEmail}</p>
                      <p className="text-muted-foreground">
                        {invoice.billedToAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xs lg:text-sm font-semibold text-muted-foreground mb-1 sm:mb-2">
                      Date Issued:
                    </h3>
                    <p className="text-foreground font-medium text-[10px] lg:text-sm">
                      {invoice.dateIssued}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs lg:text-sm font-semibold text-muted-foreground mb-1 sm:mb-2">
                      Due Date:
                    </h3>
                    <p className="text-foreground font-medium text-[10px] lg:text-sm">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6 sm:mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-[10px] lg:text-sm font-semibold text-muted-foreground pb-2">
                          Item
                        </th>
                        <th className="text-center text-[10px] lg:text-sm font-semibold text-muted-foreground pb-2">
                          QTY
                        </th>
                        <th className="text-right text-[10px] lg:text-sm font-semibold text-muted-foreground pb-2">
                          Cost
                        </th>
                        <th className="text-right text-[10px] lg:text-sm font-semibold text-muted-foreground pb-2">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-2 sm:py-3 text-[10px] lg:text-sm text-muted-foreground font-medium">
                            {item.description}
                          </td>
                          <td className="py-2 sm:py-3 text-[10px] lg:text-sm text-center text-muted-foreground font-medium">
                            {item.qty}
                          </td>
                          <td className="py-2 sm:py-3 text-[10px] lg:text-sm text-right text-muted-foreground font-medium">
                            ${item.cost.toFixed(2)}
                          </td>
                          <td className="py-2 sm:py-3 text-[10px] lg:text-sm text-right text-muted-foreground font-medium">
                            ${item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="flex justify-end mt-auto">
                <div className="w-48 lg:w-64">
                  <div className="flex justify-between py-2 border-b-2 border-border">
                    <span className="text-[10px] lg:text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-[10px] lg:text-sm text-foreground font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3">
                    <span className="text-xs lg:text-base font-semibold text-foreground">Total</span>
                    <span className="text-xs lg:text-base font-semibold text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
