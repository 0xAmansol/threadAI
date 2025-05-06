"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { AvatarStack } from "@/components/ui/kibo-ui/avatar-stack";
const Avatars = () => (
  <AvatarStack animate>
    <Avatar>
      <AvatarImage src="https://github.com/haydenbleasel.png" />
      <AvatarFallback>HB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/leerob.png" />
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/serafimcloud.png" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  </AvatarStack>
);
export default Avatars;
