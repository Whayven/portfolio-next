import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Link from "next/link";

export default function Nav() {
    const [state, setState] = useState({
        left: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open})
    };

    const list = (anchor) => (
        <Box
            sx={{ width: '250px'}}
            role="presentation"
            onClick={toggleDrawer(anchor,false)}
            onKeyDown={toggleDrawer(anchor,false)}
        >
            <List>
                <Link href={`/`}>
                    <ListItem key={'Home'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider />
                <Link href={'/resume'}>
                    <ListItem key={'Resume'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Resume'} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#A5C9CA'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left',false)}
                    >
                        {list('left')}
                    </Drawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Code Haven
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
