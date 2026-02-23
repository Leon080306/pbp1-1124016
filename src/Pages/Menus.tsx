import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router";
import type { Menu } from "./../types";

export default function Menu() {
    const [menuList, setMenuList] = useState<Menu[]>([]);
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteMenuId, setDeleteMenuId] = useState("");

    useEffect(() => {
        const fetchMenus = async () => {
            const getuserInfo = await fetch("http://localhost:5173/api/list-menu", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            const data = await getuserInfo.json();
            setMenuList(data);
            console.log(data);
        }
        fetchMenus();
    }, [])

    const handleDelete = async (menuId: string) => {
        const response = await fetch("http://localhost:5173/api/delete-menu/" + menuId, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })

        const data = await response.json();
        if (response.status !== 200) {
            alert("Failed to delete menu: " + data.message);
            return;
        }

        setOpenConfirm(false);

        const fetchMenus = async () => {
            const getuserInfo = await fetch("http://localhost:5173/api/list-menu", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            const data = await getuserInfo.json();
            setMenuList(data);
            console.log(data);
        }
        fetchMenus();
    }

    return <div style={{
        paddingInline: "24px"
    }}>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h1>Menus</h1>
            <Link to="/menu/add">
                <Button variant="contained">Add Menu</Button>
            </Link>
        </div>
        <table style={{
            width: "100%",
            textAlign: "left"
        }}>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Label</th>
                <th>Size</th>
            </tr>
            <tbody>
                {menuList.map((menu) => (
                    <tr
                        key={menu.id} onClick={() => {
                            navigate("/menu/" + menu.id)
                        }}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <td>{menu.nama}</td>
                        <td>{menu.deskripsi}</td>
                        <td>{menu.harga}</td>
                        <td>{menu.kategori}</td>
                        <td>{menu.label}</td>
                        <td>{menu.size}</td>
                        <td style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/menu/edit/" + menu.id);
                                }}
                            >
                                Edit</Button>

                            <Button
                                size="small"
                                variant="contained"
                                sx={{
                                    backgroundColor: "red"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteMenuId(menu.id);
                                    setOpenConfirm(true);
                                }}
                            >
                                Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Delete Post?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be undone. Are you sure you want to delete this post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(deleteMenuId)}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}