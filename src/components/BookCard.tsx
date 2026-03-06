import { Card, Box, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import type { CardProps } from "../types";
import { useNavigate } from "react-router";

export function BookCard({book}: {book: CardProps}) {
    const navigate = useNavigate();
    return <Card elevation={12} sx={{
        width: "450px",
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
                    backgroundColor: "grey",
                    width: "fit-content",
                    padding: "2px 10px",
                    borderRadius: "100px",
                    marginBottom: "8px"
                }}>
                    {book.kategori}
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
                <IconButton onClick={() => {
                    navigate("/book/" + book.id)
                }}>
                    <RemoveRedEyeIcon />
                </IconButton>
                <IconButton onClick={() => {
                    navigate("/book/edit/" + book.id)
                }}>
                    <EditIcon />
                </IconButton>
                <Box sx={{
                    width: "fit-content",
                    padding: "2px 10px",
                    borderRadius: "100px",
                    marginBottom: "8px",
                    backgroundColor: (book.status === "available") ? "green" : "red",
                    color: "white",
                    fontSize: "14px"
                }}>
                    {book.status}
                </Box>
            </CardActions>
        </Box>
        <img src={book.imageUrl} alt="" style={{
            height: "100%"
        }} />
    </Card>
}