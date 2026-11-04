import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
@Module({
  import: [UserModule],
})
export class AppModule {}
