import { Box } from "@mui/material";
import { useMenu } from "../hooks/useMenu";

export default function Homepage() {
    const {menuList, reload} = useMenu();

    reload();
    console.log(menuList);

    return <Box>
        <h1>Homepage</h1>
    </Box>
}