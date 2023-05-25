"use client";

// @ts-ignore
import React from "react";
import { createComponent, EventName } from "@lit-labs/react";
import { DenavasNameSearch as WebComponent } from "../index";

export const DenavasNameSearch = createComponent({
  react: React,
  tagName: "denavas-name-search",
  elementClass: WebComponent,
  events: {
    onSearchDone: "search-done" as EventName<CustomEvent<string>>,
  },
});
