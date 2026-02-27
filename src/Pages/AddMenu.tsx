import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateMenu } from "../hooks/useCreateMenu";
import type { Kategori, Label, Size } from "../types";
export default function AddMenu() {
    const [showAlert, setShowAlert] = useState(false);
    const [nama, setName] = useState("");
    const [deskripsi, setDesc] = useState("");
    const [harga, setPrice] = useState(0);
    const [size, setSize] = useState<Size | undefined>(undefined);
    const [label, setLabel] = useState<Label | undefined>(undefined);
    const [kategori, setCategory] = useState<Kategori | undefined>(undefined);
    const navigate = useNavigate();
    const createMenu = useCreateMenu();

    const addMenu = async () => {
        if (!size || !label || !kategori|| !nama || !deskripsi || !harga){
            return;
        }
        if (await createMenu({ nama, deskripsi, harga, size, label, kategori })) {
            setShowAlert(true);
            setTimeout(() => {
                navigate("/list-menu");
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
                    }}>Create New Menu</h1>

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
                            <TextField label="Enter menu name" variant="outlined" sx={{
                                width: "100%",
                            }} onChange={(e) => {
                                { setName(e.target.value as string) }
                            }} />
                            <TextField
                                id="filled-multiline-static"
                                label="Enter menu description"
                                multiline
                                rows={2}
                                variant="outlined"
                                onChange={(e) => {
                                    { setDesc(e.target.value as string) }
                                }}
                            />
                            <TextField type="number" label="Enter menu price" variant="outlined" sx={{
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
                                    onChange={(e) => {
                                        setSize(e.target.value);
                                    }}
                                    value={size}
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
                }} onClick={addMenu}>Create New Menu</Button>
            </Paper>
            <Snackbar
                sx={{ width: '100%' }}
                open={showAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
            >
                <Alert variant="filled" severity="success" sx={{ width: '50%' }}>
                    Menu successfully created
                </Alert>
            </Snackbar>
        </div>
    </div>
}