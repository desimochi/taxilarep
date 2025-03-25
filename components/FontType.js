import { Mark, mergeAttributes } from "@tiptap/core";

const FontType = Mark.create({
  name: "fontType",

  addAttributes() {
    return {
      family: {
        default: "Arial, sans-serif",
        parseHTML: (element) => element.style.fontFamily || "Arial, sans-serif",
        renderHTML: (attributes) => {
          if (!attributes.family) return {};
          return { style: `font-family: ${attributes.family}` };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontType:
        (family) =>
        ({ editor, commands }) => {
          return commands.setMark("fontType", { family });
        },
    };
  },
});

export default FontType;
