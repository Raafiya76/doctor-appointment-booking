// Redux Imports
import { TypedUseSelectorHook, useSelector } from "react-redux";
// Custom Imports
import { RootState } from "../redux/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector; // Export useTypedSelector as the default export.
