import React, { useState, CSSProperties } from "react";
import useGlobal from "../factory/store";
import CurrentPlaces from "./CurrentPlaces";
import {
  AppBar,
  Toolbar,
  Icon,
  Typography,
  Button,
  Drawer,
  Container
} from "@material-ui/core";
import { Fastfood } from "@material-ui/icons";
import { DateTime } from "luxon";

const AppBarStyles: CSSProperties = {
  marginBottom: "25px"
};

const AppBarIconStyles: CSSProperties = {
  paddingRight: "20px"
};

const TitleStyles: CSSProperties = {
  textAlign: "left",
  flexGrow: 1
};

const SubtitleStyles: CSSProperties = {
  border: "1px solid black",
  padding: "10px 20px",
  marginBottom: "15px",
  display: "inline-block"
};

const App = () => {
  const [store, actions] = useGlobal();

  // debug panel
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [debugValue, setDebugValue] = useState("0");

  const toggleDrawer = (open: boolean) => {
    setShowDebugMenu(open);
  };

  return (
    <div className="PGHEats">
      <AppBar position="static" style={AppBarStyles}>
        <Toolbar>
          <Icon style={AppBarIconStyles}>
            <Fastfood />
          </Icon>
          <Typography style={TitleStyles} variant="h6" component="h1">
            Famish
          </Typography>
          <Button
            color="inherit"
            onClick={() => actions.setDate(DateTime.local())}
          >
            Refresh Time
          </Button>
          <Button color="inherit" onClick={() => toggleDrawer(true)}>
            Debug Menu
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={showDebugMenu}
        onClose={() => toggleDrawer(false)}
      >
        <div
          style={{
            padding: "20px"
          }}
        >
          <h3>debug panel</h3>
          <input
            onChange={event => setDebugValue(event.target.value)}
            value={debugValue}
            type="text"
          />
          <button
            onClick={() => actions.setCurrentWeekday(parseInt(debugValue))}
          >
            set weekday
          </button>
          <button onClick={() => actions.setCurrentHour(parseInt(debugValue))}>
            set hour
          </button>
          <button
            onClick={() => actions.setCurrentMinute(parseInt(debugValue))}
          >
            set minute
          </button>
          <p>current time compare:</p>
          <p>weekday: {store.currentDateTime.weekday}</p>
          <p>hour: {store.currentDateTime.hour}</p>
          <p>minute: {store.currentDateTime.minute}</p>
          <button onClick={() => true}>Do something</button>
        </div>
      </Drawer>
      <Container maxWidth="lg" style={{ paddingBottom: "32px" }}>
        <Typography variant="h6" component="h2" style={SubtitleStyles}>
          get some grub, right now.
        </Typography>
        <CurrentPlaces />
      </Container>
      <style jsx>
		{`
          .PGHEats {
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default App;
