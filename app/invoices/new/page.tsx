"use client";

import { Invoice } from "@/app/types/invoice";
import { Product } from "@/app/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { addInvoice } from "../invoiceSlice";
import { useRouter } from "next/navigation";
import { myInfoSelector } from "@/app/myinfoSlice";
import { UNIT_OPTIONS } from "@/app/constants";
import { Input } from "@/app/components/Input";
import Select from "@/app/components/Select";

const NewInvoiceForm = () => {
  const sellerInfo = useSelector(myInfoSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const _blank_data = {
    name: "",
    address: "",
    gstin: "",
  };
  const [formState, setFormState] = useState({
    billTo: _blank_data,
    payTo: _blank_data,
  });

  useEffect(() => {
    setFormState((state) => ({
      ...state,
      payTo: {
        name: sellerInfo.name || "",
        address: sellerInfo.address || "",
        gstin: sellerInfo.gstin || "",
      },
    }));
  }, [sellerInfo]);

  const [products, setProducts] = useState<Product[]>([]);
  const removeProduct = (id: string) => {
    setProducts((state) => state.filter((product) => product.id !== id));
  };
  const updateFormState = (value: string, name: string) => {
    const [key, subKey] = name.split(".");
    setFormState((state) => ({
      ...state,
      [key]: { ...state[key as keyof typeof formState], [subKey]: value },
    }));
  };
  const handleProductUpdate = (value: string, productID: string, field: string) => {
    setProducts((state) => {
      return state.map((p) => {
        if (p.id === productID) {
          return {
            ...p,
            [field]: value,
          };
        }
        return p;
      });
    });
  };
  const handleSubmit = () => {
    const invoice: Invoice = {
      id: v4(),
      date: new Date().toISOString(),
      payTo: formState.payTo,
      billTo: formState.billTo,
      products: products,
      invoiceNumber: `INV-${new Date().getTime()}`,
    };
    dispatch(addInvoice(invoice));
    router.push("/invoices");
  };

  return (
    <div className="max-w-5xl m-auto">
      <div className="text-3xl text-bold m-auto">Create New Invoice</div>
      <div className="m-5 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="seller-name" className="font-bold">
            ---Seller Information
          </label>
          <div className="grid grid-cols-3 gap-1">
            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "payTo.name");
              }}
              value={formState.payTo.name}
              placeholder="Seller Name"
              name="sellerName"
            />

            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "payTo.address");
              }}
              value={formState.payTo.address}
              placeholder="Seller Address"
              name="sellerAddress"
            />

            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "payTo.gstin");
              }}
              value={formState.payTo.gstin}
              placeholder="Seller GSTIN"
              name="selletGSTIN"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="customer-name" className="font-bold">
            ---Buyer Information
          </label>
          <div className="grid grid-cols-3 gap-1">
            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "billTo.name");
              }}
              value={formState.billTo.name}
              placeholder="Buyer Name"
              name="buyerName"
            />

            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "billTo.address");
              }}
              value={formState.billTo.address}
              placeholder="Buyer Address"
              name="buyerAddress"
            />

            <Input
              type="text"
              onChange={(value) => {
                updateFormState(value, "billTo.gstin");
              }}
              value={formState.billTo.gstin}
              placeholder="Buyer GSTIN"
              name="buyerGSTIN"
            />
          </div>
        </div>

        {products.length > 0 && <div className="font-bold">Products</div>}
        {products.map((product) => {
          return (
            <div className="p-4 relative border rounded" key={product.id}>
              <div>
                <Input
                  type="text"
                  onChange={(value) => {
                    handleProductUpdate(value, product.id, "name");
                  }}
                  value={product.name}
                  placeholder="Product Description"
                  name="description"
                />
              </div>
              <div className="grid grid-cols-5 mt-2 gap-2">
                <input
                  onChange={(e) => {
                    handleProductUpdate(e.target.value, product.id, "quantity");
                  }}
                  value={product.quantity}
                  className="p-2 border rounded"
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                />
                <Select
                  options={UNIT_OPTIONS}
                  onChange={(value) => {
                    handleProductUpdate(value, product.id, "unit");
                  }}
                  value={product.unit}
                />
                <select
                  onChange={(e) => {
                    handleProductUpdate(e.target.value, product.id, "unit");
                  }}
                  value={product.unit}
                  className="p-2 border rounded"
                  name="unit"
                >
                  {UNIT_OPTIONS.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
                <input
                  onChange={(e) => {
                    handleProductUpdate(e.target.value, product.id, "sgst");
                  }}
                  value={product.sgst}
                  className="p-2 border rounded"
                  type="number"
                  placeholder="SGST"
                  name="sgst"
                />
                <input
                  onChange={(e) => {
                    handleProductUpdate(e.target.value, product.id, "perUnitPrice");
                  }}
                  value={product.perUnitPrice}
                  className="p-2 border rounded"
                  type="number"
                  placeholder="Price Per Unit"
                  name="perUnitPrice"
                />
                <input
                  onChange={(e) => {
                    handleProductUpdate(e.target.value, product.id, "cgst");
                  }}
                  value={product.cgst}
                  className="p-2 border rounded"
                  type="number"
                  placeholder="CGST"
                  name="cgst"
                />
                <button
                  className="group-hover:border-2 hover:text-red-800 absolute top-2 cursor-pointer right-[-25px]"
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                >
                  <Image className="text-red-500 hover:text-red-700" src="/icons/delete.svg" alt="delete" width={20} height={20} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          className="w-fit bg-zinc-600 hover:bg-zinc-700 text-white rounded p-2 shadow"
          onClick={() => {
            setProducts((state) => [
              ...state,
              {
                id: v4(),
                name: "",
                amount: 0,
                quantity: 0,
                unit: "piece",
                sgst: 0,
                perUnitPrice: 0,
                cgst: 0,
              },
            ]);
          }}
        >
          + Add Product
        </button>

        <button onClick={handleSubmit} className="btn bg-blue-600 hover:bg-blue-700 text-white rounded p-2 shadow" type="submit">
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export default NewInvoiceForm;
