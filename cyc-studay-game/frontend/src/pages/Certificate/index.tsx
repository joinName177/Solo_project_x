import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { LevelInfo } from "../../types";
import { CertificatePrintView } from "../../components/Certificate";

export function CertificatePrintPage() {
  const [level, setLevel] = useState<LevelInfo | null>(null);

  useEffect(() => {
    api.getLevel().then(setLevel);
  }, []);

  return <CertificatePrintView level={level} />;
}
