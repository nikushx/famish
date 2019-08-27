import React from "react";
import produce from "immer";
import useGlobalHook from "./useGlobalHook";
import { DateTime } from "luxon";
import { Places } from "./places";
import mockPlaces from "../mock/mockPlaces";

type GlobalState = {
  currentDateTime: DateTime;
  places: Places;
};

type GlobalActions = {
  setDate: (newDate: DateTime) => void;
  setCurrentWeekday: (weekday: number) => void;
  setCurrentHour: (hour: number) => void;
  setCurrentMinute: (minute: number) => void;
};

const initDate = DateTime.local();

// global state
const state: GlobalState = {
  currentDateTime: initDate,
  places: [...mockPlaces]
};

// global actions
const globalActions = {
  setDate: (store, newDate: DateTime) => {
    store.setState(
      produce(store.state, (draft: GlobalState) => {
        draft.currentDateTime = newDate;
      })
    );
  },
  setCurrentWeekday: (store, weekday) => {
    store.setState(
      produce(store.state, (draft: GlobalState) => {
        const { hour, minute } = draft.currentDateTime;
        draft.currentDateTime = DateTime.fromObject({
          weekday,
          hour,
          minute
        });
      })
    );
  },
  setCurrentHour: (store, hour) => {
    store.setState(
      produce(store.state, (draft: GlobalState) => {
        const { weekday, minute } = draft.currentDateTime;
        draft.currentDateTime = DateTime.fromObject({
          weekday,
          hour,
          minute
        });
      })
    );
  },
  setCurrentMinute: (store, minute) => {
    store.setState(
      produce(store.state, (draft: GlobalState) => {
        const { hour, weekday } = draft.currentDateTime;
        draft.currentDateTime = DateTime.fromObject({
          weekday,
          hour,
          minute
        });
      })
    );
  }
};

// set up hook for global state management
// @ts-ignore
const useGlobal: () => [GlobalState, GlobalActions] = useGlobalHook(
  React,
  state,
  globalActions
);

export default useGlobal;
