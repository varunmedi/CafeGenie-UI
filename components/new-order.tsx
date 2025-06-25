"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";

interface Pizza {
    name: string;
    price: number;
}

const pizzaOptions: Pizza[] = [
    { name: "Margherita", price: 10 },
    { name: "Pepperoni", price: 12 },
    { name: "Veggie", price: 11 },
    { name: "BBQ Chicken", price: 13 },
];

const NewOrder: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [pizzaInput, setPizzaInput] = useState<string>(""); // Input value for typing
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [pizzaList, setPizzaList] = useState<Pizza[]>([]);
    const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>(pizzaOptions); // Filtered options
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Dropdown visibility

    useEffect(() => {
        setOrderNumber("ORD-" + Math.floor(Math.random() * 100000));
    }, []);

    const handlePizzaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setPizzaInput(inputValue);

        // Filter pizzas based on input
        const filtered = pizzaOptions.filter((pizza) =>
            pizza.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredPizzas(filtered);
        setIsDropdownOpen(inputValue.length > 0 && filtered.length > 0);
    };

    const handlePizzaSelect = (pizza: Pizza) => {
        setPizzaList([...pizzaList, pizza]);
        setTotalPrice(totalPrice + pizza.price);
        setPizzaInput(""); // Clear input after selection
        setIsDropdownOpen(false); // Close dropdown
    };

    const handleRemovePizza = (index: number) => {
        const removedPizza = pizzaList[index];
        setPizzaList(pizzaList.filter((_, i) => i !== index));
        setTotalPrice(totalPrice - removedPizza.price);
    };

    const handleSubmitOrder = () => {
        if (!customerName || !phoneNumber || pizzaList.length === 0) {
            alert("Please fill all fields before submitting.");
            return;
        }

        alert(`Order Submitted!\nName: ${customerName}\nPhone: ${phoneNumber}\nOrder Number: ${orderNumber}\nPizzas: ${pizzaList.map((p) => p.name).join(", ")}\nTotal Price: $${totalPrice}`);
    };

    const cardGradientClass: string = `bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs`;

    return (
        <Card className={`@container/card ${cardGradientClass}`}>
            <CardHeader>
                <CardTitle>New Order</CardTitle>
                <CardDescription>Fill the form to place a new order</CardDescription>
                <CardAction>
                    <Badge variant="outline">
                        <IconTrendingUp />
                        New
                    </Badge>
                </CardAction>
            </CardHeader>
            <div className="px-6 py-4">
                <div className="form-group mb-4 flex items-center gap-4">
                    <label htmlFor="customerName" className="w-32 text-sm font-medium text-gray-900 dark:text-gray-100">Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4 flex items-center gap-4">
                    <label htmlFor="phoneNumber" className="w-32 text-sm font-medium text-gray-900 dark:text-gray-100">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="(123) 456-7890"
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4 flex items-center gap-4">
                    <label htmlFor="orderNumber" className="w-32 text-sm font-medium text-gray-900 dark:text-gray-100">Order Number:</label>
                    <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        readOnly
                        className="flex-1 rounded-md border-gray-300 shadow-sm sm:text-sm bg-transparent"
                    />
                </div>
                <div className="form-group mb-4 flex items-center gap-4 relative">
                    <label htmlFor="pizzaInput" className="w-32 text-sm font-medium text-gray-900 dark:text-gray-100">Pizza Type:</label>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            id="pizzaInput"
                            placeholder="Type to search pizzas"
                            value={pizzaInput}
                            onChange={handlePizzaInputChange}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-card dark:bg-card shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
                        />
                        {isDropdownOpen && (
                            <ul className="absolute z-10 w-full mt-1 bg-card dark:bg-card border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                                {filteredPizzas.map((pizza) => (
                                    <li
                                        key={pizza.name}
                                        onClick={() => handlePizzaSelect(pizza)}
                                        className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    >
                                        {pizza.name} - ${pizza.price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="form-group mb-4 flex items-center gap-4">
                    <label htmlFor="totalPrice" className="w-32 text-sm font-medium text-gray-900 dark:text-gray-100">Total Price:</label>
                    <input
                        type="text"
                        id="totalPrice"
                        value={`$${totalPrice}`}
                        readOnly
                        className="flex-1 rounded-md border-gray-300 shadow-sm sm:text-sm bg-transparent"
                    />
                </div>
                <button
                    onClick={handleSubmitOrder}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Order
                </button>
                <ul id="pizzaList" className="mt-4 space-y-2">
                    {pizzaList.map((pizza, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{pizza.name} - ${pizza.price}</span>
                            <button
                                onClick={() => handleRemovePizza(index)}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Total Price: ${totalPrice} <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                    Please review your order before submitting.
                </div>
            </CardFooter>
        </Card>
    );
};

export default NewOrder;