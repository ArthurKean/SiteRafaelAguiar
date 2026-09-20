const paths = {
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  arrowLeft: "M19 12H5m6-6-6 6 6 6",
  arrowDown: "M12 5v14m-6-6 6 6 6-6",
  play: "m8 5 11 7-11 7Z",
  pause: "M8 5v14M16 5v14",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  check: "m5 12 4 4L19 6",
  reset: "M3 10a9 9 0 1 1 2 8M3 4v6h6",
  location: "M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg className="ui-icon" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
