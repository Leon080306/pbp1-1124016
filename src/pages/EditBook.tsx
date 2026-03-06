/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import type { Kategori } from "../types";
import { useEffect, useState } from "react";
import { useEditBook } from "../hooks/useEditBook";

export default function EditBook() {
    const { id } = useParams();
    const [category, setCategory] = useState<Kategori>("")
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tahun, setTahun] = useState("");
    const editBook = useEditBook();
    const navigate = useNavigate();

    const handleEdit = async () => {
        if(!id) {
            return;
        }
        if(await editBook({id, judul, deskripsi, tahun, kategori: category})) {
            alert("Berhasil");
        }
    }

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
                setCategory(data.data.kategori);
                setJudul(data.data.judul);
                setDeskripsi(data.data.deskripsi);
                setTahun(data.data.tahun);
            } catch {
                console.log("error")
            }
        }
        reload();
    }, [])

    return <Box>
        <h1>Edit Book</h1>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
        }}>
            <TextField label="Judul" variant="outlined" onChange={(e) => setJudul(e.target.value)} value={judul} sx={{
                width: "100%"
            }} />

            <TextField label="Deskripsi" variant="outlined" onChange={(e) => setDeskripsi(e.target.value)} value={deskripsi} sx={{
                width: "100%"
            }} />

            <TextField label="Tahun" type="number" variant="outlined" onChange={(e) => setTahun(e.target.value)} value={tahun} sx={{
                width: "100%"
            }} />

            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="dateAscending"
                    name="radio-buttons-group"
                    value={category}
                    onChange={(e, value) => {
                        setCategory(value as Kategori);
                    }}
                >
                    <FormLabel id="demo-radio-buttons-group-label">Kategori</FormLabel>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <FormControlLabel value="majalah" control={<Radio />} label="Majalah" />
                        <FormControlLabel value="komik" control={<Radio />} label="Komik" />
                        <FormControlLabel value="novel" control={<Radio />} label="Novel" />
                    </div>
                </RadioGroup>
            </FormControl>
            <Button variant="contained" onClick={() => {
                handleEdit();
                navigate("/");
            }}>Save</Button>
        </Box>
    </Box>
}