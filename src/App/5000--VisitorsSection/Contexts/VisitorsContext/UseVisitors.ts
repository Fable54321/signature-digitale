import { useContext } from "react";
import { VisitorsContext } from "./VisitorsContext";

export const useVisitors = () => {

    const context = useContext(VisitorsContext);

    if (!context) {
        throw new Error("useVisitors must be used within a VisitorsProvider");
    }

    return context;
}