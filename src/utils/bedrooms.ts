type RoomCounts = {
  bedrooms?: number;
  suites?: number;
  suiteDescription?: string;
};

export function bedroomDetails({ bedrooms, suites, suiteDescription }: RoomCounts) {
  const inconsistent = bedrooms != null && suites != null && suites > bedrooms;
  const total = inconsistent ? undefined : bedrooms;
  const validSuites = suites != null && suites > 0 ? suites : undefined;
  const detail = suiteDescription?.trim();
  const addsInformation = detail && !(validSuites != null && new RegExp(`^${validSuites}\\s+su[ií]tes?$`, "i").test(detail));
  const totalLabel = total == null ? undefined : `${total} ${total === 1 ? "quarto" : "quartos"} no total`;

  let summary: string | undefined = totalLabel;
  if (addsInformation) {
    summary = [totalLabel, detail].filter(Boolean).join(" · ");
  } else if (validSuites != null && total != null) {
    summary = validSuites === total
      ? `${totalLabel} · todos são suítes`
      : `${totalLabel} · ${total - validSuites} ${total - validSuites === 1 ? "quarto comum" : "quartos comuns"} + ${validSuites} ${validSuites === 1 ? "suíte" : "suítes"}`;
  } else if (validSuites != null) {
    summary = `${validSuites} ${validSuites === 1 ? "suíte" : "suítes"}`;
  }

  return {
    summary,
    total,
    suites,
    inconsistent,
    needsTotal: inconsistent || (bedrooms == null && validSuites != null),
  };
}
