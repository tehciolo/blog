import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,

  theme: {
    extend: {
      gridTemplateRows: {
        "holy": "auto 1fr auto",
      },
    },
  },
} as Options;
