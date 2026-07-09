import { AboutPreview, type SplitContentProps } from "./about-preview";

/** Page-builder alias for the about-preview / split content section */
export function SplitContentBlock(props: SplitContentProps) {
  return <AboutPreview {...props} />;
}

export type { SplitContentProps };
