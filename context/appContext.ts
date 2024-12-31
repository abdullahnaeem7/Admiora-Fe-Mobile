import React, { createContext, useState } from "react";

// Use 'any' type for the context
const appContext = createContext<any>(undefined);

export default appContext;