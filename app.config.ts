export default defineAppConfig({
  ui: {
    primary: "indigo",
    gray: "slate",
    icons: {
      dynamic: true,
    },
    button: {
      default: {
        size: "md",
        color: "primary",
      },
    },
    card: {
      default: {
        background: "bg-white dark:bg-gray-900",
      },
    },
    container: {
      default: {
        constrained: "max-w-7xl",
      },
    },
  },
});
