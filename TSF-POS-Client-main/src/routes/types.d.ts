import React from "react";

export interface Route {
  path: string;
  secured?: boolean;
  component: React.FC;
}
