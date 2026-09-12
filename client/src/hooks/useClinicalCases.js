import { useEffect, useState } from "react";
import { curatedCases } from "../data/cases";
import { apiFetch, normalizeCase } from "../lib/api";

export function useClinicalCases() {
  const [cases, setCases] = useState(curatedCases);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    apiFetch("/api/cases")
      .then((payload) => {
        if (!active) return;
        setBackendAvailable(true);
        setCases(payload.cases.map(normalizeCase));
      })
      .catch(() => { if (active) setCases(curatedCases); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { cases, loading, backendAvailable };
}
