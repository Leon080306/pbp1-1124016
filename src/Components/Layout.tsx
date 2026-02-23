import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";

export function Layout(props: PropsWithChildren) {
    return <Stack>
        <AppBar position="static">
            <Toolbar sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Box display="flex" justifyContent="space-evenly" width="50%">
                    <Link to="/list-menu">
                        <Button variant="text" sx={{
                            color: "white",
                            width: "100px",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                            },
                        }}><b>Menu List</b></Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
        {props.children}
    </Stack>
}