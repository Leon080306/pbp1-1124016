import { Box } from "@mui/material";
import { useBooks } from "../hooks/useBooks";
import { useEffect } from "react";
import { BookCard } from "../components/BookCard";

export default function Homepage() {
    const { booksList, reload, booksState } = useBooks();

    
    useEffect(() => {
        reload();
        console.log(booksList);
    }, [])

    if (booksState === "pending" || booksState === "loading") {
        return <Box>
            <h1 style={{ textAlign: "center" }}>Loading books...</h1>
        </Box>
    }

    if (booksState === "error") {
        return <Box>
            <h1 style={{ textAlign: "center" }}>Failed to fetch books</h1>
        </Box>
    }

    return <Box>
        <h1 style={{ textAlign: "center" }}>Homepage</h1>

        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
        }}>
            {booksList.map((book) => (
                <BookCard key={book.id} book={book}/>
            ))}
        </Box>
    </Box>
}