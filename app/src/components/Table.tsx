"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import TableSkeleton from "./TableSkeleton";

interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    created_at: string;
}

const Table = () => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(15);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            console.log("limit: " + limit)
            console.log("total count: " + totalCount);
            console.log("offset: " + offset);

            if (limit !== totalCount) {
                // Fetch total count of items

                const { count, error: countError } = await supabase
                    .from("newproducts")
                    .select("*", { count: "exact", head: true });

                if (countError) {
                    console.error("Error fetching total count:", countError);
                } else {
                    setTotalCount(count || 0);
                }
            }

            // Fetch data with pagination or infinite scrolling
            const { data: fetchedData, error } = await supabase
                .from("newproducts")
                .select("*")
                .range(offset, offset + (limit === totalCount ? 29 : limit - 1));

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setData((prevData) => (limit === totalCount && prevData[0].id === 1 ? [...prevData, ...(fetchedData || [])] : fetchedData || []));
                if (fetchedData && fetchedData.length < 30) {
                    setHasMore(false);
                }
            }

            setLoading(false);
        };

        fetchData();
    }, [offset, limit]);

    useEffect(() => {
        if (limit === totalCount && loaderRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore && !loading) {
                        setOffset((prevOffset) => prevOffset + 30);
                    }
                },
                { threshold: 1.0 }
            );

            observer.observe(loaderRef.current);
            return () => observer.disconnect();
        }
    }, [loaderRef, hasMore, loading, limit, totalCount]);

    const handleLimitChange = (event: any) => {
        const selectedLimit = Number(event.target.value);

        if (selectedLimit === totalCount) {
            console.log("selectedlimit === totalCount", selectedLimit, totalCount);
            setPage(1);
            setOffset(0);
            setLimit(selectedLimit);
            setHasMore(true);
        } else {
            console.log("selectedlimit != totalCount", selectedLimit, totalCount);
            setPage(1);
            setOffset(0);
            setLimit(selectedLimit);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setOffset((newPage - 1) * limit);
    };

    if (loading && data.length === 0) return <TableSkeleton />;

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="p-6 lg:mx-10 ">
            {/* Table Controls */}
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="border px-4 py-2 text-lg rounded-sm w-full sm:w-auto">
                    <label htmlFor="limit">Select Limit : </label>
                    <select
                        id="limit"
                        value={limit}
                        onChange={handleLimitChange}
                        className="bg-white w-full sm:w-auto"
                    >
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={totalCount}>All</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 w-20 py-2 border-b text-lg">ID</th>
                            <th className="px-4 w-20 py-2 border-b text-lg">Title</th>
                            <th className="px-4 w-20 py-2 border-b text-lg">Description</th>
                            <th className="px-4 w-20 py-2 border-b text-lg">Price</th>
                            <th className="px-4 w-20 py-2 border-b text-lg">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={`${item.id}-${index}`}
                                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                            >
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.title}</td>
                                <td className="px-4 py-2">{item.description}</td>
                                <td className="px-4 py-2">${item.price}</td>
                                <td className="px-4 py-2">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {limit < totalCount && (
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-lg">
                        Page {page} of {totalPages} ({totalCount} entries)
                    </span>
                    <div className="flex space-x-2 mt-4 sm:mt-0 items-center ">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-600  px-2 py-1 text-white rounded-sm disabled:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="text-md">{page}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page * limit >= totalCount}
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-gray-600 text-white rounded-sm disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Infinite Scroll Loader */}
            {limit === totalCount && <div ref={loaderRef} className="h-10 mt-4 text-center">{loading && "Loading..."}</div>}
        </div>
    );
};

export default Table;
