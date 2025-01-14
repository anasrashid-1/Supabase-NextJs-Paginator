"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { socket } from "@/util/socketConfig";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const { title, description, price } = formData;

        if (!title || !description || price <= 0) {
            setError("All fields are required, and price must be greater than 0.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("newproducts")
            .insert([
                {
                    title,
                    description,
                    price,
                    created_at: new Date().toISOString(),
                },
            ]);

        if (error) {
            setError("Error adding product: " + error.message);
        } else {
            const notification = { message: `${title} was added!`, created_at: new Date() };
            socket.emit("newProduct", notification);

            setFormData({ title: "", description: "", price: 0 });
            alert("Product added successfully!");
        }

        setLoading(false);
    };


    const testNewProductEmit = () => {
        console.log("testNewProductEmit called");
        socket.emit("newProduct", "bla bla bla");
    }

    return (
        <div className="p-6 lg:mx-10">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded-sm"
                        placeholder="Enter product title"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded-sm"
                        placeholder="Enter product description"
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-lg">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-2 rounded-sm"
                        placeholder="Enter product price"
                        min="0"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex">
                    <button
                        type="submit"
                        disabled={loading}
                        className="lg:px-4 lg:py-2 px-2 py-1 bg-gray-600 text-white rounded-sm disabled:bg-gray-400 w-full"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                </div>
            </form>

            {/* <button onClick= {testNewProductEmit}  className="lg:px-4 lg:py-2 px-2 py-1 bg-gray-600 text-white rounded-sm disabled:bg-gray-400 w-full" >
                test newProduct emit
            </button> */}
        </div>
    );
};


export default AddProduct;
