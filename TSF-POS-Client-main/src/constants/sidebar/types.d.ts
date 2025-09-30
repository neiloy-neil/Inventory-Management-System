import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type SidebarLinkType = {
  name: string;
  link: string;
  adminOnlyPermission?: boolean;
  modsOnlyPermission?: boolean;
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>;
};
