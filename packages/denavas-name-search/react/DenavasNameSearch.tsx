"use client";

// @ts-ignore
import React from "react";
import { createComponent, EventName } from "@lit-labs/react";
import {
  DenavasNameSearch as WebComponent,
  SearchResult as SearchResultType,
} from "../src/denavas-name-search";

export type SearchResult = SearchResultType;
export const DenavasNameSearch = createComponent({
  react: React,
  tagName: "denavas-name-search",
  elementClass: WebComponent,
  events: {
    onSearchStarted: "search-started" as EventName<CustomEvent<void>>,
    onSearchDone: "search-done" as EventName<CustomEvent<SearchResultType>>,
    onChange: "change" as EventName<CustomEvent<string>>,
  },
});
