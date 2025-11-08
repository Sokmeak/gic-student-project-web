export default defineAppConfig({
  ui: {
    primary: "indigo",
    gray: "slate",
    header: {
      slots: {
        root: "bg-brand-500/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50",
      }
    }
  },
});
