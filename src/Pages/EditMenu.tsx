/* eslint-disable react-hooks/set-state-in-effect */
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEditMenu } from "../hooks/useEditMenu";
import type { Kategori, Label, Size } from "../types";
import { useMenu } from "../hooks/useMenu";

export default function EditMenu() {
    const [showAlert, setShowAlert] = useState(false);
    const [nama, setName] = useState("");
    const [deskripsi, setDesc] = useState("");
    const [harga, setPrice] = useState(0);
    const [size, setSize] = useState<Size | "">("");
    const [label, setLabel] = useState<Label | "">("");
    const [kategori, setCategory] = useState<Kategori | "">("");
    const navigate = useNavigate();
    const { id } = useParams();
    const editMenu = useEditMenu();
    const { menuList } = useMenu();

    useEffect(() => {
        const currentMenu = menuList.find(menu => menu.id === id);
        if (!currentMenu) return;

        setName(currentMenu.nama ?? "");
        setDesc(currentMenu.deskripsi ?? "");
        setPrice(currentMenu.harga ?? 0);
        setSize(currentMenu.size ?? "");
        setLabel(currentMenu.label ?? "");
        setCategory(currentMenu.kategori ?? "");
    }, [])

    const edit = async () => {
        if (!id || !size || !label || !kategori || !nama || !deskripsi || !harga) {
            return;
        }

        if (await editMenu({ id, nama, deskripsi, harga, size, label, kategori })) {
            setShowAlert(true);
            setTimeout(() => {
                navigate("/menu/" + id);
            }, 1000)
        }
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
                                        setSize(e.target.value);
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
                                        setLabel(e.target.value);
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
                                        setCategory(e.target.value);
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
                }} onClick={edit}>Save</Button>
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