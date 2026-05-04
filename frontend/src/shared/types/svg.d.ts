declare module "*.svg" {
  import * as React from "react";

  const SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}
