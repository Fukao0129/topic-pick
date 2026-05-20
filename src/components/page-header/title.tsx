import { Text } from "@/src/components/ui/text";
import { Breadcrumb } from "./breadcrumb";

export function Title({
  title = "",
  description = "",
  className = "",
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Breadcrumb />
      <Text tag="h1" size="xl" bold>
        {title}
      </Text>
      <Text tag="p" size="xs" color="secondary">
        {description}
      </Text>
    </div>
  );
}
