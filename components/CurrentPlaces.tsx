import React, { CSSProperties, useMemo } from "react";
import useGlobal from "../factory/store";
import { checkInterval, Place, Deal, WeekInterval } from "../factory/places";
import {
  Paper,
  Card,
  Typography,
  Grid,
  useMediaQuery
} from "@material-ui/core";
import { classProperty } from "@babel/types";

const PlaceCardStyles: CSSProperties = {
  // marginTop: '10px',
  padding: "15px 25px",
  color: "white",
  background: "rgb(193, 73, 73)",
  boxShadow: "0px 8px 0px 1px rgba(44,63,68,1)",
  textShadow: "0px 3px 10px black"
};

const DealCardStyles: CSSProperties = {
  padding: "10px 10px",
  marginBottom: "20px",
  boxShadow: "0px 8px 9px 1px rgba(0,0,0,0.2)",
  textShadow: "none"
};

const PlaceTitleStyles: CSSProperties = {
  marginBottom: "10px"
};

const CardGridStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "1400px",
  flexWrap: "wrap"
};

const PlaceWrapperStyles: CSSProperties = {
  paddingBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const PlaceContainerStyles: CSSProperties = {
  width: "95%",
  height: "95%"
};

const PlaceCardGradient = [
  "#f12711",
  "#F23914",
  "#F34B15",
  "#F36518",
  "#F47F19",
  "#F49919",
  "#f5af19"
];
console.log(process.env)
const getColorFromGradientArray = (arrayOfColors: string[], index: number) => {
  let adjustedIndex;

  // if index is higher than array length of colors, determine index with up/down gradient mentality
  if (index >= arrayOfColors.length) {
    // shifted index = array length * 2 so we can determine 'up' gradient
    const shiftedIndex = index % (arrayOfColors.length * 2);
    // if index is still below array length, give that index back
    if (shiftedIndex < arrayOfColors.length) {
      adjustedIndex = shiftedIndex;
    } else {
      /**
       * example:
       * shiftedindex = 8
       * array length = 7
       */
      adjustedIndex =
        arrayOfColors.length - (shiftedIndex - arrayOfColors.length + 1);
    }
  } else {
    adjustedIndex = index;
  }

  return arrayOfColors[adjustedIndex];
};

export default function CurrentPlaces() {
  const [store, actions] = useGlobal();

  const getActiveDeals = (place: Place) => {
    return place.deals.filter(deal =>
      deal.times.some(time => checkInterval(time, store.currentDateTime))
    );
  };

  // TODO: Add in functionality for change of day when that is implemented all around
  const isEndingSoon = (deal: Deal) => {
    const time = deal.times.find(time =>
      checkInterval(time, store.currentDateTime)
    );
    if (time) {
      if (time.end.hour === store.currentDateTime.hour) {
        return store.currentDateTime.hour - time.end.hour <= 30 ? true : false;
      } else if (time.end.hour + 1 === store.currentDateTime.hour) {
        return time.end.hour + 60 - store.currentDateTime.hour <= 30
          ? true
          : false;
      } else {
        return false;
      }
    } else {
      alert("error in ending soon alg");
      return false;
    }
  };

  /**
   * Get mapped place with name and active deals for rendering
   */
  const places = store.places
    .filter((place: Place) => {
      const activeDeals = getActiveDeals(place);
      return activeDeals.length > 0;
    })
    // TODO: figure out a better sort based on what people would like the best (or best deals)
    .sort((first: Place, second: Place) => {
      return 0;
    });

  const matchesMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        {places.map((place, i) => {
          return place.deals.length > 0 ? (
            <Grid key={i} item xs={matchesMobile ? 12 : 6}>
              <Paper
                elevation={3}
                style={{
                  ...PlaceCardStyles,
                  background: getColorFromGradientArray(PlaceCardGradient, i)
                }}
              >
                <Typography
                  variant="h6"
                  component="h4"
                  style={PlaceTitleStyles}
                >
                  {place.name}
                </Typography>
                {getActiveDeals(place).map((deal, i) => {
                  return (
                    <Card key={i} style={DealCardStyles}>
                      {isEndingSoon(deal) ? <p>ending soon...</p> : undefined}
                      <Typography variant="body1">
                        <b>{deal.title}</b>
                      </Typography>
                      <Typography variant="subtitle1">
                        {deal.description}
                      </Typography>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
          ) : (
            undefined
          );
        })}
      </Grid>
    </Grid>
  );
}
