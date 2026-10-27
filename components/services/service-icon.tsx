import type { ServiceIcon as ServiceIconKey } from "@/data/types";
import {
  Bot,
  Boxes,
  Building2,
  Cloud,
  Compass,
  Cpu,
  MonitorSmartphone,
  Rocket,
} from "lucide-react";

const icons = {
  bot: Bot,
  compass: Compass,
  rocket: Rocket,
  devices: MonitorSmartphone,
  cloud: Cloud,
  boxes: Boxes,
  cpu: Cpu,
  building: Building2,
} satisfies Record<ServiceIconKey, unknown>;

export function ServiceIcon({ icon, className }: { icon: ServiceIconKey; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden />;
}
