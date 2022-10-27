import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ textAlign: 'center' }}>
                <Typography variant="h6" flex-direction='column'
                    align-content="center"
                    component="div" sx={{ flexGrow: 1 }}>
                    Dockerizing a Fullstack React App with Docker
                </Typography>

            </Toolbar>
        </AppBar>
    );
}
