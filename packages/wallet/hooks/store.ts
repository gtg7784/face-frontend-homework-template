import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppState, AppDispatch } from 'store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useAppDispatch, useAppSelector };
