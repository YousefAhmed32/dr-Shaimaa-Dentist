import { useSyncExternalStore } from "react";
import { curatedCases } from "../data/cases";

const STORAGE_KEY = "dr-shaimaa-local-cases-v1";
const listeners = new Set();

const readSavedCases = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

let localCases = typeof window === "undefined" ? [] : readSavedCases();

const emit = () => listeners.forEach((listener) => listener());
const persist = (next) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  localCases = next;
  emit();
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => localCases;
const getServerSnapshot = () => [];

export function useClinicalCases() {
  const local = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    cases: [...local, ...curatedCases],
    localCases: local,
    addCase: (nextCase) => persist([nextCase, ...localCases]),
    removeCase: (id) => persist(localCases.filter((item) => item.id !== id)),
    replaceLocalCases: (items) => persist(items),
    clearLocalCases: () => persist([]),
  };
}

export function createLocalCaseId() {
  return `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
