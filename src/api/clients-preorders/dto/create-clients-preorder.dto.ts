import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateClientsPreorderDto {

    @IsString()
    @ValidateIf((o) => !o.lastName)
    firstName?: string;

    @IsString()
    @ValidateIf((o) => !o.firstName)
    lastName?: string;
    
    @ValidateIf((o) => !o.email)
    phone?: string;

    @IsEmail()
    @ValidateIf((o) => !o.phone)
    email?: string;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsBoolean()
    @IsOptional()
    isMediaRequired?: boolean;

    @IsString()
    @IsNotEmpty()
    localeId: string;
}
