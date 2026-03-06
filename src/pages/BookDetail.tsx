/* eslint-disable react-hooks/set-state-in-effect */
import { Box } from "@mui/material";
import { useParams } from "react-router";
import type { Book } from "../types";
import { useEffect, useState } from "react";
import { DetailBookCard } from "../components/DetailBookCard";

export default function EditBook() {
    const { id } = useParams();
    const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);
    

    useEffect(() => {
        const reload = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/buku/" + id, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    },
                })
                if (response.status !== 200) {
                    throw new Error("Failed to fetch menu");
                }
                const data = await response.json();
                setCurrentBook(data.data);
            } catch {
                console.log("error")
            }
        }
        reload();
    }, [])

    return <Box>
        <h1>Book Detail</h1>
        {currentBook && <DetailBookCard book={currentBook} />}
    </Box>
}