import { useCallback, useMemo, useState } from "react";
import type { Book, BookState } from "../types";

export function useBooks() {
    const [booksList, setBooksList] = useState<Book[]>([]);
    const [booksState, setBooksState] = useState<BookState>("pending");

    const reload = useCallback(async () => {
        setBooksState("loading");
        try {
            const response = await fetch("http://localhost:5173/api/buku/", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            if(response.status !== 200) {
                throw new Error("Failed to fetch menu");
            }
            const data = await response.json();
            setBooksList(data.data);
            setBooksState("fulfilled");
        } catch {
            setBooksState("error");
        }
    }, [])

    return useMemo(() => {
        return { booksList, booksState, reload };
    }, [booksList, booksState, reload]);
}