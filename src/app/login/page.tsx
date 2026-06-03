import { LoginBtn } from "@/src/features/users";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";

export default function Login() {
  return (
    <Card className="flex flex-col items-center gap-6 py-12 px-8">
      <Image
        src="/icon.svg"
        alt={process.env.APP_NAME || "TopicPick"}
        width={150}
        height={35}
      />
      <LoginBtn />
    </Card>
  );
}
