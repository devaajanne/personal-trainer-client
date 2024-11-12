import "./stylings/App.css";
import { Link, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function App() {
  return (
    <div>
      <Container maxWidth='x1'>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Personal trainer client</Typography>
          </Toolbar>
        </AppBar>
        <AppBar position='static'>
          <Toolbar>
            <Button component={Link} to='/' color='inherit'>
              Home
            </Button>
            <Button component={Link} to='/customers' color='inherit'>
              Customers
            </Button>
            <Button component={Link} to='/trainings' color='inherit'>
              Trainings
            </Button>
            <Button component={Link} to='/calendar' color='inherit'>
              Calendar
            </Button>
            <Button component={Link} to='/statistics' color='inherit'>
              Statistics
            </Button>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </div>
  );
}
