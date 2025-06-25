"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const pizzaData = {
    labels: ["Margherita", "Pepperoni", "BBQ Chicken", "Veggie"],
    datasets: [
        {
            label: "Pizza Sales",
            data: [10, 20, 30, 40],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
    ],
};

const sizeData = {
    labels: ["Small", "Medium", "Large"],
    datasets: [
        {
            label: "Pizza Size Sales",
            data: [15, 25, 60],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
    ],
};

const salesData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
        {
            label: "Sales Over Time",
            data: [65, 59, 80, 81, 56],
            fill: false,
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
        },
    ],
};

export default function SalesPage() {
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
                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="container mx-auto p-4 flex flex-col items-center">
                        <h1 className="text-center text-2xl font-semibold mb-6">Sales Dashboard</h1>
                        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
                            <div className="chart-container w-full max-w-md">
                                <h2 className="text-center text-xl font-semibold mb-2">Pizza Sales</h2>
                                <Pie data={pizzaData} />
                            </div>
                            <div className="chart-container w-full max-w-md">
                                <h2 className="text-center text-xl font-semibold mb-2">Pizza Size Sales</h2>
                                <Pie data={sizeData} />
                            </div>
                            <div className="chart-container w-full max-w-2xl">
                                <h2 className="text-center text-xl font-semibold mb-2">Sales Over Time</h2>
                                <Line data={salesData} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}