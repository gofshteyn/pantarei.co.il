DELETE FROM courses_groups;

INSERT INTO courses_groups (id, code, display_name, display_name_locales, position, created_at, updated_at, deleted_at)
VALUES
  (uuid_generate_v4(), 'start_diving', 'Начни нырять', '{"ru": "Начни нырять", "en": "Start Diving", "he": "התחל לצלול"}'::jsonb, 1, NOW(), null, null),
  (uuid_generate_v4(), 'become_diver', 'Стань дайвером', '{"ru": "Стань дайвером", "en": "Become a Diver", "he": "הפוך לצוללן"}'::jsonb, 2, NOW(), null, null),
  (uuid_generate_v4(), 'continue_learning', 'Продолжай учиться', '{"ru": "Продолжай учиться", "en": "Continue Learning", "he": "המשך ללמוד"}'::jsonb, 3, NOW(), null, null),
  (uuid_generate_v4(), 'specializations', 'Специализации', '{"ru": "Специализации", "en": "Specializations", "he": "התמחויות"}'::jsonb, 4, NOW(), null, null),
  (uuid_generate_v4(), 'expand_limits', 'Расширяй пределы', '{"ru": "Расширяй пределы", "en": "Expand Boundaries", "he": "הרחב גבולות"}'::jsonb, 5, NOW(), null, null),
  (uuid_generate_v4(), 'become_pro', 'Стань профессионалом', '{"ru": "Стань профессионалом", "en": "Become a Professional", "he": "הפוך למקצוען"}'::jsonb, 6, NOW(), null, null);
