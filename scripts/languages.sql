DELETE FROM languages;
INSERT INTO languages (id, code, display_name, display_name_locales, image_url, created_at, updated_at, deleted_at)
VALUES
  ('en', 'eng', 'English', '{"ru": "Английский", "en": "English", "he": "אנגלית"}'::jsonb, null, NOW(), null, null),
  ('ru', 'rus', 'Russian', '{"ru": "Русский", "en": "Russian", "he": "רוסית"}'::jsonb, null, NOW(), null, null),
  ('es', 'spa', 'Spanish', '{"ru": "Испанский", "en": "Spanish", "he": "ספרדית"}'::jsonb, null, NOW(), null, null),
  ('fr', 'fra', 'French', '{"ru": "Французский", "en": "French", "he": "צרפתית"}'::jsonb, null, NOW(), null, null),
  ('de', 'deu', 'German', '{"ru": "Немецкий", "en": "German", "he": "גרמנית"}'::jsonb, null, NOW(), null, null),
  ('it', 'ita', 'Italian', '{"ru": "Итальянский", "en": "Italian", "he": "איטלקית"}'::jsonb, null, NOW(), null, null),
  ('pt', 'por', 'Portuguese', '{"ru": "Португальский", "en": "Portuguese", "he": "פורטוגזית"}'::jsonb, null, NOW(), null, null),
  ('ja', 'jpn', 'Japanese', '{"ru": "Японский", "en": "Japanese", "he": "יפנית"}'::jsonb, null, NOW(), null, null),
  ('zh', 'zho', 'Chinese', '{"ru": "Китайский", "en": "Chinese", "he": "סינית"}'::jsonb, null, NOW(), null, null),
  ('he', 'heb', 'Hebrew', '{"ru": "Иврит", "en": "Hebrew", "he": "עברית"}'::jsonb, null, NOW(), null, null),
  ('ar', 'ara', 'Arabic', '{"ru": "Арабский", "en": "Arabic", "he": "ערבית"}'::jsonb, null, NOW(), null, null),
  ('ko', 'kor', 'Korean', '{"ru": "Корейский", "en": "Korean", "he": "קוריאנית"}'::jsonb, null, NOW(), null, null),
  ('hi', 'hin', 'Hindi', '{"ru": "Хинди", "en": "Hindi", "he": "הינדי"}'::jsonb, null, NOW(), null, null),
  ('sw', 'swa', 'Swahili', '{"ru": "Суахили", "en": "Swahili", "he": "סוואהילי"}'::jsonb, null, NOW(), null, null),
  ('tr', 'tur', 'Turkish', '{"ru": "Турецкий", "en": "Turkish", "he": "טורקית"}'::jsonb, null, NOW(), null, null),
  ('vi', 'vie', 'Vietnamese', '{"ru": "Вьетнамский", "en": "Vietnamese", "he": "ווייטנאמי"}'::jsonb, null, NOW(), null, null),
  ('pl', 'pol', 'Polish', '{"ru": "Польский", "en": "Polish", "he": "פולנית"}'::jsonb, null, NOW(), null, null),
  ('nl', 'nld', 'Dutch', '{"ru": "Голландский", "en": "Dutch", "he": "הולנדית"}'::jsonb, null, NOW(), null, null);
