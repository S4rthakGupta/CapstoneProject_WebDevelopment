import * as React from "react";
import type { ToastProps } from "./toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

let count = 0;

function genId() {
  count++;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};

const reducer = (
  state: ToasterToast[],
  action: { type: string; toast?: ToasterToast; toastId?: string }
): ToasterToast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast!, ...state].slice(0, TOAST_LIMIT);
    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.toast!.id ? { ...t, ...action.toast } : t
      );
    case "DISMISS_TOAST":
      if (action.toastId) addToRemoveQueue(action.toastId);
      else state.forEach((t) => addToRemoveQueue(t.id));
      return state.map((t) =>
        t.id === action.toastId || action.toastId === undefined
          ? { ...t, open: false }
          : t
      );
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return [];
      return state.filter((t) => t.id !== action.toastId);
    default:
      return state;
  }
};

const listeners: Array<(state: ToasterToast[]) => void> = [];

let memoryState: ToasterToast[] = [];

function dispatch(action: {
  type: string;
  toast?: ToasterToast;
  toastId?: string;
}) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  const toast = React.useCallback(({ ...props }: ToastProps) => {
    const id = genId();
    const update = (props: ToastProps) =>
      dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        },
      },
    });

    return {
      id,
      dismiss,
      update,
    };
  }, []);

  const dismiss = React.useCallback((toastId?: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }, []);

  return {
    toast,
    dismiss,
    toasts: state,
  };
}

export { useToast };
