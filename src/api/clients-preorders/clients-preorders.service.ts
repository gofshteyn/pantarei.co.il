import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientsPreorderDto } from './dto/create-clients-preorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { ClientsPreorder } from './entities/clients-preorder.entity';
import { ProductPreview } from '../products/entities/product-preview.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientsPreordersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  public async create(createClientsPreorderDto: CreateClientsPreorderDto) {

    let result;
    try {
      result = await this.prisma.clientsPreorder.create({
        data: {
          firstName: createClientsPreorderDto.firstName,
          lastName: createClientsPreorderDto.lastName,
          phone: createClientsPreorderDto.phone,
          email: createClientsPreorderDto.email,
          productId: createClientsPreorderDto.productId,
          isMediaRequired: createClientsPreorderDto.isMediaRequired,
          comment: createClientsPreorderDto.comment,
          localeId: createClientsPreorderDto.localeId,
          userEmailNotificationsAllowed: true
        },
        include: {
          product: true
        }
      });
      
    } catch (e) {
      Logger.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new BadRequestException(`Нарушение внешнего ключа.`);
        };
      };
      throw new InternalServerErrorException();
    };

    result.product = plainToInstance(ProductPreview, result.product);
    const clientPreorder = plainToInstance(ClientsPreorder, result);

    // Отправка email администрации сайта
    if (this.configService.get<boolean>('EMAIL_SENDING_ENABLED')) {
      this.mailerService.sendMail({
        to: 'l.gofshteyn@gmail.com',
        subject: 'Заявка с сайта PANTAREI.CO.IL',
        template: 'email-notifications/client-preorders-notifications/client-preorder-notification.ejs',
        context: {
            firstName: clientPreorder.firstName,
            lastName: clientPreorder.lastName,
            phone: clientPreorder.phone,
            email: clientPreorder.email,
            comment: clientPreorder.comment,
            isMediaRequired: clientPreorder.isMediaRequired,
            product: clientPreorder.product.displayName,
            localeId: clientPreorder.localeId
        }
      }).catch(e => {
        Logger.error('Ошибка при уведомлении администрации сайта о полученной заявке от клиента');
        Logger.error(e);
      });

      try {
        if (clientPreorder.email && result.userEmailNotificationsAllowed)
          this.mailerService.sendMail({
            to: clientPreorder.email,
            subject: 'Заявка с сайта PANTAREI.CO.IL',
            template: `email-notifications/client-preorders-notifications/client-preorder-confirmation.${clientPreorder.localeId}.ejs`,
            context: {
              firstName: clientPreorder.firstName,
              lastName: clientPreorder.lastName,
              phone: clientPreorder.phone,
              email: clientPreorder.email,
              comment: clientPreorder.comment,
              isMediaRequired: clientPreorder.isMediaRequired,
              product: clientPreorder.product.displayName,
              localeId: clientPreorder.localeId
            }
          });
      } catch (e) {
        Logger.error('Ошибка при уведомлении клиента о полученной заявке от клиента');
        Logger.error(e);
      };
    };

    return clientPreorder;
  }

  public findAll() {
    return `This action returns all clientsPreorders`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} clientsPreorder`;
  // }

  // update(id: number, updateClientsPreorderDto: UpdateClientsPreorderDto) {
  //   return `This action updates a #${id} clientsPreorder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} clientsPreorder`;
  // }
}
