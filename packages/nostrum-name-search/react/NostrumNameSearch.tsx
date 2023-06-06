"use client";

// @ts-ignore
import React from "react";
import { createComponent, EventName } from "@lit-labs/react";
import {
  NostrumNameSearch as WebComponent,
  SearchResult as SearchResultType,
} from "../src/nostrum-name-search";

export type SearchResult = SearchResultType;
export const NostrumNameSearch = createComponent({
  react: React,
  tagName: "nostrum-name-search",
  elementClass: WebComponent,
  events: {
    onSearchStarted: "search-started" as EventName<CustomEvent<string>>,
    onSearchDone: "search-done" as EventName<CustomEvent<SearchResultType>>,
    onChange: "change" as EventName<CustomEvent<string>>,
  },
});
