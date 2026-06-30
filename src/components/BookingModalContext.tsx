"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import BookingModal from "./BookingModal";

const Ctx = createContext<() => void>(() => {});

export function useBookingModal() {
  return useContext(Ctx);
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={() => setOpen(true)}>
      {children}
      <BookingModal isOpen={open} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}
