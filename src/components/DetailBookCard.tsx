import { Card, Box, CardActions, CardContent, Typography, Button, TextField } from "@mui/material";
import type { CardProps } from "../types";
import { useKembalikan } from "../hooks/useKembalikan";
import { useNavigate } from "react-router";
import { useState } from "react";
import { usePinjam } from "../hooks/usePinjam";

export function DetailBookCard({ book }: { book: CardProps }) {
    const kembalikan = useKembalikan();
    const pinjam = usePinjam();
    const navigate = useNavigate();
    const [nama, setNama] = useState("");

    const handleKembalikan = async () => {
        if (!book.id) {
            return;
        }
        if (await kembalikan(book.id)) {
            alert("Berhasil");
        }
    }

    const handlePinjam = async () => {
        if (!book.id) {
            return;
        }
        const payload = {
            id: book.id,
            nama: nama
        }
        if (await pinjam(payload)) {
            alert("Berhasil");
        }
    }

    return <Card elevation={12} sx={{
        width: "100%",
        height: "250px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden"
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                <h1 style={{
                    fontSize: "18px",
                    margin: 0,
                    marginBottom: "8px"
                }}>{book.judul}</h1>
                <Box sx={{
                    display: "flex",
                    gap: "12px"
                }}>
                    <Box sx={{
                        width: "fit-content",
                        padding: "2px 10px",
                        borderRadius: "100px",
                        marginBottom: "8px",
                        backgroundColor: "grey",
                        color: "white",
                        fontSize: "14px",
                        marginTop: "12px"
                    }}>
                        {book.kategori}
                    </Box>
                    <Box sx={{
                        width: "fit-content",
                        padding: "2px 10px",
                        borderRadius: "100px",
                        marginBottom: "8px",
                        backgroundColor: (book.status === "available") ? "green" : "red",
                        color: "white",
                        fontSize: "14px",
                        marginTop: "12px"
                    }}>
                        {book.status}
                    </Box>
                </Box>
                <Typography>
                    {book.deskripsi}
                </Typography>

            </CardContent>

            <CardActions sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%"
            }}>
                {book.peminjam && (
                    <Box sx={{
                        display: "flex",
                        gap: "12px",
                        width: "500px"
                    }}>
                        <Typography>Peminjam: {book.peminjam}</Typography>
                        <Button variant="contained" onClick={() => {
                            handleKembalikan();
                            navigate("/");
                        }}>Kembalikan</Button>
                    </Box>
                )}
                {!book.peminjam && (
                    <Box sx={{
                        display: "flex",
                        gap: "12px",
                        width: "800px"
                    }}>
                        <TextField label="Nama peminjam" variant="outlined" onChange={(e) => setNama(e.target.value)} sx={{
                            width: "100%"
                        }} />
                        <Button variant="contained" onClick={() => {
                            handlePinjam();
                            navigate("/");
                        }}>Kembalikan</Button>
                    </Box>
                )}
            </CardActions>
        </Box>
        <img src={book.imageUrl} alt="" style={{
            height: "100%"
        }} />
    </Card>
}