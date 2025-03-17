import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GalleryService {

  private readonly instagramApiUrl: string = 'https://graph.instagram.com/me/media';
  private readonly accessToken: string;

  constructor (
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.accessToken = configService.get<string>('INSTAGRAM_ACCESS_TOKEN');
  }

  create(createGalleryDto: CreateGalleryDto) {
    return 'This action adds a new gallery';
  }

  async findAll() {
    try {

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.instagramApiUrl}?fields=permalink,media_url,thumbnail_url&access_token=${this.accessToken}&limit=9`
        )
      );
      
      // Логируем ответ API для проверки
      console.log('API Response:', response.data);
      
      // Проверяем наличие данных
      if (!response.data || !response.data.data) {
        throw new BadRequestException('Нет данных о медиа в ответе API');
      }

      const transformedData = response.data.data.map(item => {
        // Удаляем поле id и переименовываем media_url в mediaUrl
        const { id, media_url, thumbnail_url, ...rest } = item;
        return { ...rest, mediaUrl: thumbnail_url }; // Переименовываем поле
      });

      return transformedData;
    
    } catch (e) {
      Logger.error('Ошибка при получении галереи из Instagram');
      throw new BadRequestException('Ошибка при получении галереи из Instargram');
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
