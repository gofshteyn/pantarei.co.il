import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface RawCourseGroupResult {
  group_id: string;
  group_code: string | null;
  group_display_name: string;
  group_display_name_locales: any;
  course_id: string;
  course_code: string | null;
  course_display_name: string;
  course_display_name_locales: any;
  course_subtitle: string | null;
  course_subtitle_locales: any;
  course_description: string | null;
  course_description_locales: any;
  course_logo_url: string | null;
  course_image_url: string | null;
  feature_id: string;
  feature_description: string;
  feature_description_locales: any;
  inclusion_id: string;
  inclusion_description: string;
  inclusion_description_locales: any;
  suggestion_id: string;
  suggestion_description: string;
  suggestion_description_locales: any;
  default_price: string | number; // Может быть строкой или числом
  default_price_mode: string;
  currency_id: string;
  currency_display_name: string;
  currency_display_name_locales: any;
  currency_symbol: string | null;
}

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  // create(createCoursesGroupDto: CreateCoursesGroupDto) {
  //   return 'This action adds a new coursesGroup';
  // }
  // : Promise<CoursesGroup[]>

  private formatCoursesGroupResult(rawData: RawCourseGroupResult[]) {
    const groupsMap = new Map<string, any>();
  
    rawData.forEach((row) => {
      const groupId = row.group_id;
  
      if (!groupsMap.has(groupId)) {
        groupsMap.set(groupId, {
          id: groupId,
          code: row.group_code,
          displayName: row.group_display_name,
          displayNameLocales: row.group_display_name_locales,
          courses: [],
        });
      }
  
      const group = groupsMap.get(groupId);
  
      const courseId = row.course_id;
      if (courseId) {
        let course = group.courses.find((c: any) => c.id === courseId);
  
        if (!course) {
          course = {
            id: courseId,
            code: row.course_code,
            displayName: row.course_display_name,
            displayNameLocales: row.course_display_name_locales,
            subtitle: row.course_subtitle,
            subtitleLocales: row.course_subtitle_locales,
            description: row.course_description,
            descriptionLocales: row.course_description_locales,
            logoUrl: row.course_logo_url,
            imageUrl: row.course_image_url,
            features: [],
            inclusions: [],
            suggestions: [],
            defaultPrice: {
              price: Number(row.default_price), // Явное преобразование в число
              priceMode: row.default_price_mode,
              currency: {
                id: row.currency_id,
                displayName: row.currency_display_name,
                displayNameLocales: row.currency_display_name_locales,
                symbol: row.currency_symbol,
              },
            },
          };
          group.courses.push(course);
        }
  
        if (row.feature_id) {
          course.features.push({
            id: row.feature_id,
            courseId: row.course_id,
            description: row.feature_description,
            descriptionLocales: row.feature_description_locales,
          });
        }
  
        if (row.inclusion_id) {
          course.inclusions.push({
            id: row.inclusion_id,
            courseId: row.course_id,
            description: row.inclusion_description,
            descriptionLocales: row.inclusion_description_locales,
          });
        }
  
        if (row.suggestion_id) {
          course.suggestions.push({
            id: row.suggestion_id,
            courseId: row.course_id,
            description: row.suggestion_description,
            descriptionLocales: row.suggestion_description_locales,
          });
        }
      }
    });
  
    return Array.from(groupsMap.values());
  }

  public async findAll(expand?: string[]) {
    const today = new Date();
  
    // Получаем ID валюты по умолчанию или используем 'ILS'
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: { isDefault: true, deletedAt: null },
    });
  
    // Если параметр courses не указан
    if (!expand?.includes('courses')) {
      const result = await this.prismaService.coursesGroup.findMany({
        select: {
          id: true,
          code: true,
          displayName: true,
          displayNameLocales: true,
        },
        orderBy: {
          position: 'asc',
        },
      });
  
      return result;
    }
  
    // Если параметр courses указан, используем SQL-запрос
    const sqlQuery = `
      SELECT 
        cg.id AS group_id,
        cg.code AS group_code,
        cg.display_name AS group_display_name,
        cg.display_name_locales AS group_display_name_locales,
        c.id AS course_id,
        c.code AS course_code,
        c.display_name AS course_display_name,
        c.display_name_locales AS course_display_name_locales,
        c.subtitle AS course_subtitle,
        c.subtitle_locales AS course_subtitle_locales,
        c.description AS course_description,
        c.description_locales AS course_description_locales,
        c.logo_url AS course_logo_url,
        c.image_url AS course_image_url,
        cf.id AS feature_id,
        cf.description AS feature_description,
        cf.description_locales AS feature_description_locales,
        ci.id AS inclusion_id,
        ci.description AS inclusion_description,
        ci.description_locales AS inclusion_description_locales,
        cs.id AS suggestion_id,
        cs.description AS suggestion_description,
        cs.description_locales AS suggestion_description_locales,
        p.price AS default_price,
        p.price_mode AS default_price_mode,
        cur.id AS currency_id,
        cur.display_name AS currency_display_name,
        cur.display_name_locales AS currency_display_name_locales,
        cur.symbol AS currency_symbol
      FROM 
        courses_groups cg
      LEFT JOIN 
        courses c ON cg.id = c.course_group_id
      LEFT JOIN 
        courses_features cf ON c.id = cf.course_id
      LEFT JOIN 
        courses_inclusions ci ON c.id = ci.course_id
      LEFT JOIN 
        courses_suggestions cs ON c.id = cs.course_id
      LEFT JOIN 
        prices p ON c.product_id = p.product_id
      LEFT JOIN 
        currencies cur ON p.currency_id = cur.id
      WHERE 
        cg.deleted_at IS NULL
        AND c.deleted_at IS NULL
        AND p.start_date <= $1
        AND (p.end_date IS NULL OR p.end_date >= $1)
        AND cur.id = $2
      ORDER BY 
        cg.position ASC, c.position ASC
    `;
  
    const result = await this.prismaService.$queryRawUnsafe<RawCourseGroupResult[]>(
      sqlQuery,
      today,
      defaultCurrency?.id || 'ILS',
    );
  
    // Преобразуем результат SQL-запроса в нужный формат
    const formattedResult = this.formatCoursesGroupResult(result);
  
    return formattedResult;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} coursesGroup`;
  // }

  // update(id: number, updateCoursesGroupDto: UpdateCoursesGroupDto) {
  //   return `This action updates a #${id} coursesGroup`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coursesGroup`;
  // }
}
