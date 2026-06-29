"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "@heroui/react";

export default function SearchBox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [text, setText] = useState(searchParams.get("search") || "");

    const handleSearch = (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams(searchParams.toString());
        if (text.trim()) {
            params.set("search", text.trim());
            params.set("page", "1");
        } else {
            params.delete("search"); 
        }

        router.push(`/opportunities?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-8">
            <Input
                size="sm"
                type="text"
                placeholder="Search by role or skills..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-white"
            />
            <Button size="sm" type="submit" className="bg-blue-600 text-white font-semibold rounded-xl px-5">
                Search
            </Button>
        </form>
    );
}