import React from "react";
import { createComponent } from "@lit-labs/react";
import { DenavasNameSearch as WebComponent } from "../index";

export const DenavasNameSearch = createComponent({
  react: React,
  tagName: "denavas-name-search",
  elementClass: WebComponent,
});
