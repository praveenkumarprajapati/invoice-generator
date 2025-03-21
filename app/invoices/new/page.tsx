"use client";

import { Invoice } from "@/app/types/invoice";
import { Product } from "@/app/types/product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { addInvoice } from "../invoiceSlice";
import { useRouter } from "next/navigation";
import { myInfoSelector } from "@/app/myinfoSlice";
import { Input } from "@/app/components/Input";
import Image from "next/image";

const NewInvoiceForm = () => {
  const sellerInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formState, setFormState] = useState({
    billTo: { name: "", address: "", gstin: "" },
    payTo: {
      name: sellerInfo.name || "",
      address: sellerInfo.address || "",
      gstin: sellerInfo.gstin || "",
    },
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      payTo: {
        name: sellerInfo.name || "",
        address: sellerInfo.address || "",
        gstin: sellerInfo.gstin || "",
      },
    }));
  }, [sellerInfo]);

  const [products, setProducts] = useState<Product[]>([]);

  const handleProductUpdate = (
    value: string,
    productID: string,
    field: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productID ? { ...p, [field]: value } : p))
    );
  };

  const updateFormState = (value: string, name: string) => {
    const [key, subKey] = name.split(".");
    setFormState((state) => ({
      ...state,
      [key]: { ...state[key as keyof typeof formState], [subKey]: value },
    }));
  };

  const handleSubmit = () => {
    const invoice: Invoice = {
      id: v4(),
      date: new Date().toISOString(),
      payTo: formState.payTo,
      billTo: formState.billTo,
      products,
      invoiceNumber: `INV-${new Date().getTime()}`,
    };
    dispatch(addInvoice(invoice));
    router.push("/invoices");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-left text-gray-800">
        Create New Invoice
      </h1>

      {/* Seller & Buyer Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg mb-2 text-gray-700">
            Seller Information
          </h2>
          <Input
            type="text"
            value={formState.payTo.name}
            placeholder="Seller Name"
            name="sellerName"
            onChange={(value) => updateFormState(value, "payTo.name")}
          />
          <Input
            type="textarea"
            value={formState.payTo.address}
            placeholder="Seller Address (Max 3 lines)"
            name="sellerAddress"
            maxLines={3}
            onChange={(value) => updateFormState(value, "payTo.address")}
          />
          <Input
            type="text"
            value={formState.payTo.gstin}
            placeholder="Seller GSTIN"
            name="sellerGSTIN"
            onChange={(value) => updateFormState(value, "payTo.gstin")}
          />
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg mb-2 text-gray-700">
            Buyer Information
          </h2>
          <Input
            type="text"
            value={formState.billTo.name}
            placeholder="Buyer Name"
            name="buyerName"
            onChange={(value) => updateFormState(value, "billTo.name")}
          />
          <Input
            type="textarea"
            value={formState.billTo.address}
            placeholder="Buyer Address (max 3 lines)"
            maxLines={3}
            name="buyerAddress"
            onChange={(value) => updateFormState(value, "billTo.address")}
          />
          <Input
            type="text"
            value={formState.billTo.gstin}
            placeholder="Buyer GSTIN"
            name="buyerGSTIN"
            onChange={(value) => updateFormState(value, "billTo.gstin")}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 p-6 border rounded-lg shadow-md">
        <h2 className="font-bold text-xl text-gray-700 mb-4 flex items-center gap-2">
          Items {products.length || ""}
        </h2>
        {products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="relative p-4 bg-white border rounded-lg shadow-md"
              >
                {/* Delete Button */}
                <button
                  onClick={() =>
                    setProducts(products.filter((p) => p.id !== product.id))
                  }
                  className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-red-600 transition"
                >
                  <Image
                    src="/icons/delete.svg"
                    alt="Delete"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Product Header */}
                <h3 className="font-semibold text-gray-800 mb-2">
                  Item {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    type="text"
                    placeholder="Product Description"
                    value={product.description}
                    required
                    name="description"
                    className="col-span-3"
                    onChange={(value) =>
                      handleProductUpdate(value, product.id, "description")
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    required
                    value={product.quantity || ""}
                    name="quantity"
                    onChange={(value) =>
                      handleProductUpdate(value, product.id, "quantity")
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <Input
                    type="number"
                    placeholder="Price Per Unit"
                    value={product.perUnitPrice || ""}
                    required
                    name="perUnitPrice"
                    onChange={(value) =>
                      handleProductUpdate(value, product.id, "perUnitPrice")
                    }
                  />
                  <Input
                    type="number"
                    placeholder="SGST % (Optional)"
                    value={product.sgst || ""}
                    name="sgst"
                    onChange={(value) =>
                      handleProductUpdate(value, product.id, "sgst")
                    }
                  />
                  <Input
                    type="number"
                    placeholder="CGST % (Optional)"
                    value={product.cgst || ""}
                    name="cgst"
                    onChange={(value) =>
                      handleProductUpdate(value, product.id, "cgst")
                    }
                  />
                  {/* Total Price Calculation */}
                  <div className="flex items-center justify-center  rounded text-gray-800 font-semibold p-1">
                    <span>
                      Total ₹
                      {(product.quantity * product.perUnitPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No Items added yet. Click below to add.
          </p>
        )}

        {/* Add Product Button */}
        <button
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition duration-200 mt-4"
          onClick={() =>
            setProducts([
              ...products,
              {
                id: v4(),
                description: "",
                quantity: 0,
                sgst: 0,
                perUnitPrice: 0,
                cgst: 0,
              },
            ])
          }
        >
          <Image
            color="#FFF"
            src="/icons/plus.svg"
            alt="Add"
            width={20}
            height={20}
          />
          Add Item
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-200"
      >
        Create Invoice
      </button>
    </div>
  );
};

export default NewInvoiceForm;
