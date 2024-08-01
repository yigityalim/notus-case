/**
 * @fileoverview image.tsx file
 * Image component
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import { Loader } from "lucide-react";
import React from "react";

export function Image({
  ...props
}: Readonly<React.ImgHTMLAttributes<HTMLImageElement>>) {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  return (
    <div className="relative size-8 overflow-hidden rounded-full">
      <img
        {...props}
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Loader size={24} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
