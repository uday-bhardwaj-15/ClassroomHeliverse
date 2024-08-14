import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableFee = () => {
  const invoices = [
    {
      studentname: "Uday",
      paymentStatus: "Pending",
      totalAmount: "₹150.00",
      paymentMethod: "PayPal",
    },
    {
      studentname: "Aman",
      paymentStatus: "Pending",
      totalAmount: "₹150.00",
      paymentMethod: "PayPal",
    },
    {
      studentname: "Yash",
      paymentStatus: "Unpaid",
      totalAmount: "₹350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      studentname: "Itesh",
      paymentStatus: "Paid",
      totalAmount: "₹450.00",
      paymentMethod: "Credit Card",
    },
    {
      studentname: "Dhruv",
      paymentStatus: "Paid",
      totalAmount: "₹550.00",
      paymentMethod: "PayPal",
    },
    {
      studentname: "Ankush",
      paymentStatus: "Pending",
      totalAmount: "₹200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      studentname: "Deepak",
      paymentStatus: "Unpaid",
      totalAmount: "₹300.00",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <div>
      <Table className=" mt-5">
        <TableCaption>A list of your recent fees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.studentname}>
              <TableCell className="font-medium">
                {invoice.studentname}
              </TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">₹2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableFee;
