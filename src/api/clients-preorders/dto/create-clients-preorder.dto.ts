import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateClientsPreorderDto {

    @IsString()
    @IsNotEmpty()
    displayName: string;
    
    @ValidateIf((o) => !o.email)
    phone?: string;

    @IsEmail()
    @ValidateIf((o) => !o.phone)
    email?: string;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsBoolean()
    @IsOptional()
    isMediaRequired?: boolean;
}
