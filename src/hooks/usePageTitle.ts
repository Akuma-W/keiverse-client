import { useEffect } from "react";
import { WEBSITE } from "@/config/website";

interface Props {
  title?: string;
  description?: string;
}

export const usePageTitle = ({ title, description }: Props = {}) => {
  useEffect(() => {
    const prevTitle = document.title;
    const fullTitle = `${WEBSITE.name} | ${title ?? WEBSITE.slogan}`;
    document.title = fullTitle;

    const metaName = "description";
    let meta = document.querySelector(`meta[name="${metaName}"]`) as HTMLMetaElement | null;
    const prevMetaContent = meta?.content;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = description ?? WEBSITE.slogan;

    return () => {
      // restore previous values
      document.title = prevTitle;
      if (meta) {
        if (typeof prevMetaContent === "string") meta.content = prevMetaContent;
        else meta.remove();
      }
    };
  }, [title, description]);
};
