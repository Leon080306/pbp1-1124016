import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditMenu() {
    const [showAlert, setShowAlert] = useState(false);
    const [nama, setName] = useState("");
    const [deskripsi, setDesc] = useState("");
    const [harga, setPrice] = useState(0);
    const [size, setSize] = useState("");
    const [label, setLabel] = useState("");
    const [kategori, setCategory] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch("http://localhost:5173/api/menu/" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })

            const data = await response.json();
            if (response.status !== 200) {
                alert("Failed to create menu: " + data.message);
                return;
            }
            setName(data.nama);
            setDesc(data.deskripsi);
            setPrice(data.harga);
            setSize(data.size);
            setLabel(data.label);
            setCategory(data.kategori);
        }
        getDetails();
    }, [])

    const editMenu = async () => {
        const response = await fetch("http://localhost:5173/api/update-menu/" + id, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                nama,
                deskripsi,
                harga,
                size,
                label,
                kategori
            }),
        })

        const data = await response.json();
        if (response.status !== 200) {
            alert("Failed to edit menu: " + data.message);
            return;
        }

        setShowAlert(true);
        setTimeout(() => {
            navigate("/menu/" + id);
        }, 1000)
    }

    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh"
        }}>
            <Paper elevation={16} sx={{
                width: 800,
                height: 500,
                paddingBlock: 2,
                paddingInline: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 4
            }}>
                <div>
                    <h1 style={{
                        textAlign: "center"
                    }}>Edit Menu</h1>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "32px"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            flex: "1"
                        }}>
                            <TextField label="Enter menu name" variant="outlined" value={nama}
                            sx={{
                                width: "100%",
                            }} 
                            onChange={(e) => {
                                { setName(e.target.value) }
                            }} 

                            />
                            <TextField
                                id="filled-multiline-static"
                                label="Enter menu description"
                                multiline
                                rows={2}
                                variant="outlined"
                                onChange={(e) => {
                                    { setDesc(e.target.value) }
                                }}
                                value={deskripsi}
                            />
                            <TextField type="number" label="Enter menu price" variant="outlined" value={harga} sx={{
                                width: "100%",
                            }} onChange={(e) => {
                                { setPrice(parseInt(e.target.value)) }
                            }} />
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            flex: "1"
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Size"
                                    value={size}
                                    onChange={(e) => {
                                        setSize(e.target.value as string);
                                    }}
                                >
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="large">Large</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{
                                marginBottom: "24px"
                            }}>
                                <InputLabel id="demo-simple-select-label">Label</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Label"
                                    onChange={(e) => {
                                        setLabel(e.target.value as string);
                                    }}
                                    value={label}
                                >
                                    <MenuItem value={"vegan"}>Vegan</MenuItem>
                                    <MenuItem value={"gluten_free"}>Gluten Free</MenuItem>
                                    <MenuItem value={"halal"}>Halal</MenuItem>
                                    <MenuItem value={"low_cal"}>Low Calorie</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Category"
                                    onChange={(e) => {
                                        setCategory(e.target.value as string);
                                    }}
                                    value={kategori}
                                >
                                    <MenuItem value={"minuman"}>Drink</MenuItem>
                                    <MenuItem value={"makanan"}>Food</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <Button variant="contained" sx={{
                    marginBottom: 2,
                    width: "100%",
                    height: "40px",
                    boxShadow: 8,
                }} onClick={editMenu}>Save</Button>
            </Paper>
            <Snackbar
                sx={{ width: '100%' }}
                open={showAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
            >
                <Alert variant="filled" severity="success" sx={{ width: '50%' }}>
                    Menu successfully edited
                </Alert>
            </Snackbar>
        </div>
    </div>
}