"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useState } from "react";

// Define the type for an order
interface Order {
    orderNumber: string;
    customerName: string;
    phoneNumber: string;
    pizzas: string[];
    totalPrice: string;
    status: "preparing" | "ready" | "cancelled"; // Restrict status to specific values
    date: string;
}

// Initial orders data with type annotation
const initialOrders: Order[] = [
    { orderNumber: "ORD-12345", customerName: "Sarath", phoneNumber: "123-456-7890", pizzas: ["Margherita"], totalPrice: "$10", status: "preparing", date: "2025-03-19" },
    { orderNumber: "ORD-12346", customerName: "Harsha", phoneNumber: "987-654-3210", pizzas: ["Pepperoni", "Veggie"], totalPrice: "$22", status: "ready", date: "2025-03-19" },
    { orderNumber: "ORD-12347", customerName: "Swaran", phoneNumber: "555-123-9876", pizzas: ["BBQ Chicken"], totalPrice: "$13", status: "cancelled", date: "2025-03-18" },
    { orderNumber: "ORD-12348", customerName: "Varun", phoneNumber: "555-789-6543", pizzas: ["Margherita", "BBQ Chicken"], totalPrice: "$23", status: "preparing", date: "2025-03-17" },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders);

    const filterOrders = () => {
        const statusFilter = (document.getElementById("statusFilter") as HTMLSelectElement).value;
        const startDate = (document.getElementById("startDate") as HTMLInputElement).value;
        const endDate = (document.getElementById("endDate") as HTMLInputElement).value;

        const filtered = orders.filter((order: Order) => {
            const isStatusMatch = statusFilter === "all" || order.status === statusFilter;
            const isDateMatch = !startDate || !endDate || (order.date >= startDate && order.date <= endDate);
            return isStatusMatch && isDateMatch;
        });

        setFilteredOrders(filtered);
    };

    const updateStatus = (selectElement: HTMLSelectElement, orderNumber: string) => {
        const newStatus = selectElement.value as Order["status"];
        setOrders((prevOrders: Order[]) =>
            prevOrders.map((order: Order) =>
                order.orderNumber === orderNumber ? { ...order, status: newStatus } : order
            )
        );
        alert(`Order ${orderNumber} status updated to ${newStatus}`);
        filterOrders(); // Re-apply filters after status update
    };

    const deleteOrder = (orderNumber: string) => {
        setOrders((prevOrders: Order[]) => prevOrders.filter((order: Order) => order.orderNumber !== orderNumber));
        alert(`Order ${orderNumber} has been deleted`);
        filterOrders(); // Re-apply filters after deletion
    };

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="container mx-auto p-4">
                        <h1 className="text-center text-2xl font-semibold mb-4">Orders List</h1>
                        <div className="filter flex justify-center gap-4 mb-4">
                            <label htmlFor="statusFilter">Filter by Status:</label>
                            <select
                                id="statusFilter"
                                className="status-select p-1 text-sm border rounded bg-gray-200 dark:bg-gray-700"
                            >
                                <option value="all">All</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <label htmlFor="dateRange">Filter by Date Range:</label>
                            <input
                                type="date"
                                id="startDate"
                                className="status-select p-1 text-sm border rounded bg-gray-200 dark:bg-gray-700"
                            />
                            <input
                                type="date"
                                id="endDate"
                                className="status-select p-1 text-sm border rounded bg-gray-200 dark:bg-gray-700"
                            />
                            <button
                                onClick={filterOrders}
                                className="bg-blue-500 text-white p-1 text-sm rounded"
                            >
                                Apply Filter
                            </button>
                        </div>
                        <table className="orders-table w-full border-collapse rounded-lg shadow-lg">
                            <thead>
                            <tr>
                                <th className="p-2 border-b">Order Number</th>
                                <th className="p-2 border-b">Customer Name</th>
                                <th className="p-2 border-b">Phone Number</th>
                                <th className="p-2 border-b">Pizza(s)</th>
                                <th className="p-2 border-b">Total Price</th>
                                <th className="p-2 border-b">Status</th>
                                <th className="p-2 border-b">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.map((order: Order) => (
                                <tr
                                    key={order.orderNumber}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <td className="p-2 border-b">{order.orderNumber}</td>
                                    <td className="p-2 border-b">{order.customerName}</td>
                                    <td className="p-2 border-b">{order.phoneNumber}</td>
                                    <td className="p-2 border-b">{order.pizzas.join(", ")}</td>
                                    <td className="p-2 border-b">{order.totalPrice}</td>
                                    <td className="p-2 border-b">
                                        <select
                                            className="status-select p-1 text-sm border rounded bg-gray-200 dark:bg-gray-700"
                                            value={order.status}
                                            onChange={(e) => updateStatus(e.target as HTMLSelectElement, order.orderNumber)}
                                        >
                                            <option value="preparing">Preparing</option>
                                            <option value="ready">Ready</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-2 border-b">
                                        <button
                                            onClick={() => deleteOrder(order.orderNumber)}
                                            className="bg-red-500 text-white p-1 text-sm rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}