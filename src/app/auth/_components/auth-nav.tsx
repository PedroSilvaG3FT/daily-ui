import { LucideIcon } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";

interface IProps {
  title: string;
  Icon: LucideIcon;
  className?: string;
  description: string;
}

export default function AuthNav(props: IProps) {
  const { title, Icon, className, description } = props;

  return (
    <nav className={cn("flex flex-col items-center justify-center", className)}>
      <figure className="bg-background rounded-xl shadow-lg p-4 mb-4 border border-foreground/10">
        <Icon className="text-foreground/40" />
      </figure>

      <h4 className="text-center font-semibold">{title}</h4>
      <p className="text-center text-sm">{description}</p>
    </nav>
  );
}
