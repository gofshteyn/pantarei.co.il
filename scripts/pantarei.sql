--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pantarei
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pantarei;

--
-- Name: preorder_status; Type: TYPE; Schema: public; Owner: pantarei
--

CREATE TYPE public.preorder_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'completed'
);


ALTER TYPE public.preorder_status OWNER TO pantarei;

--
-- Name: price_mode; Type: TYPE; Schema: public; Owner: pantarei
--

CREATE TYPE public.price_mode AS ENUM (
    'exact',
    'from',
    'to'
);


ALTER TYPE public.price_mode OWNER TO pantarei;

--
-- Name: price_type; Type: TYPE; Schema: public; Owner: pantarei
--

CREATE TYPE public.price_type AS ENUM (
    'sale',
    'purchase'
);


ALTER TYPE public.price_type OWNER TO pantarei;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients_preorders; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.clients_preorders (
    id uuid NOT NULL,
    registration_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id uuid,
    first_name character varying(100),
    phone character varying(15),
    email character varying(255),
    comment text,
    product_id uuid NOT NULL,
    locale_id character(2),
    is_media_required boolean DEFAULT false NOT NULL,
    status public.preorder_status DEFAULT 'pending'::public.preorder_status NOT NULL,
    user_email_notifications_allowed boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    last_name character varying(100),
    city character varying(150),
    country character varying(150),
    "ipAddress" character varying(150)
);


ALTER TABLE public.clients_preorders OWNER TO pantarei;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.courses (
    id character(36) NOT NULL,
    code character varying(20),
    course_group_id character(36),
    product_id uuid NOT NULL,
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    subtitle character varying(100),
    subtitle_locales jsonb,
    description text,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    logo_url character varying(255),
    image_url character varying(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.courses OWNER TO pantarei;

--
-- Name: courses_features; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.courses_features (
    id character(36) NOT NULL,
    course_id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.courses_features OWNER TO pantarei;

--
-- Name: courses_groups; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.courses_groups (
    id character(36) NOT NULL,
    code character varying(20),
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.courses_groups OWNER TO pantarei;

--
-- Name: courses_inclusions; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.courses_inclusions (
    id character(36) NOT NULL,
    course_id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.courses_inclusions OWNER TO pantarei;

--
-- Name: courses_suggestions; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.courses_suggestions (
    id character(36) NOT NULL,
    course_id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.courses_suggestions OWNER TO pantarei;

--
-- Name: currencies; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.currencies (
    id character varying(4) NOT NULL,
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    symbol character(5),
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.currencies OWNER TO pantarei;

--
-- Name: excursions; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.excursions (
    id character(36) NOT NULL,
    code character varying(20),
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    subtitle character varying(100),
    subtitle_locales jsonb,
    description text,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    logo_url character varying(255),
    image_url character varying(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    product_id uuid NOT NULL
);


ALTER TABLE public.excursions OWNER TO pantarei;

--
-- Name: excursions_features; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.excursions_features (
    id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    excursion_id character(36) NOT NULL
);


ALTER TABLE public.excursions_features OWNER TO pantarei;

--
-- Name: excursions_inclusions; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.excursions_inclusions (
    id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    excursion_id character(36) NOT NULL
);


ALTER TABLE public.excursions_inclusions OWNER TO pantarei;

--
-- Name: excursions_suggestions; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.excursions_suggestions (
    id character(36) NOT NULL,
    description character varying(255) NOT NULL,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    excursion_id character(36) NOT NULL
);


ALTER TABLE public.excursions_suggestions OWNER TO pantarei;

--
-- Name: languages; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.languages (
    id character(2) NOT NULL,
    code character varying(3),
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    image_url character varying(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.languages OWNER TO pantarei;

--
-- Name: locales; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.locales (
    language_id character(2) NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.locales OWNER TO pantarei;

--
-- Name: prices; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.prices (
    id character(36) NOT NULL,
    product_id uuid NOT NULL,
    currency_id character varying(4) NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    comment text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    price_mode public.price_mode DEFAULT 'exact'::public.price_mode NOT NULL,
    price_type public.price_type NOT NULL,
    value numeric(15,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.prices OWNER TO pantarei;

--
-- Name: products; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    code character varying(20),
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    description text,
    description_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    image_url character varying(255),
    is_service boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone,
    product_group_id character(36)
);


ALTER TABLE public.products OWNER TO pantarei;

--
-- Name: products_groups; Type: TABLE; Schema: public; Owner: pantarei
--

CREATE TABLE public.products_groups (
    id character(36) NOT NULL,
    code character varying(20),
    display_name character varying(100) NOT NULL,
    display_name_locales jsonb,
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.products_groups OWNER TO pantarei;

--
-- Data for Name: clients_preorders; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.clients_preorders (id, registration_date, user_id, first_name, phone, email, comment, product_id, locale_id, is_media_required, status, user_email_notifications_allowed, created_at, updated_at, deleted_at, last_name, city, country, "ipAddress") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.courses (id, code, course_group_id, product_id, display_name, display_name_locales, subtitle, subtitle_locales, description, description_locales, "position", logo_url, image_url, created_at, updated_at, deleted_at) FROM stdin;
bd756af4-3819-437c-abd4-10387397d31e	\N	bf1ab13b-75fe-4285-b99f-bddce41246cd	bd756af4-3819-437c-abd4-10387397d31e	Deep Diver	{"he": "Deep Diver", "ru": "Deep Diver"}	Deep dives	{"he": "צלילות עמוקות", "ru": "Глубокие погружения"}	<p><b>Deep Diver</b> is a course for certified divers who want to explore underwater depths and master diving techniques <b>up to 40 meters</b>. Deep diving opens the door to new adventures, such as exploring shipwrecks, observing unique deep-sea creatures, and diving into picturesque deep reefs. This course teaches safe deep diving methods, developing skills in planning, gas mixture management, and time control underwater.</p> <p><b>The Deep Diver course</b> is your ticket to new horizons in diving. It provides access to places that only trained and experienced divers can reach, turning deep diving into an exciting, comfortable, and safe adventure.</p>	{"he": "<p><b>Deep Diver</b> הוא קורס עבור צוללנים מוסמכים המעוניינים לחקור את המעמקים התת-ימיים וללמוד טכניקות צלילה <b>עד 40 מטרים</b>. צלילה עמוקה פותחת את הדלת להרפתקאות חדשות, כמו חקר ספינות טבועות, צפייה ביצורים ייחודיים של המעמקים וצלילה לשוניות עמוקות וציוריות. הקורס מלמד שיטות בטוחות לצלילה עמוקה, תוך פיתוח מיומנויות בתכנון, ניהול תערובות גזים ושליטה בזמן מתחת למים.</p><p><b>קורס Deep Diver</b> הוא הכרטיס שלך לאופקים חדשים בצלילה. הוא מספק גישה למקומות שרק צוללנים מיומנים ומנוסים יכולים להגיע אליהם, והופך את הצלילה העמוקה להרפתקה מרגשת, נוחה ובטוחה.</p>", "ru": "<p><b>Deep Diver</b> – это курс для сертифицированных дайверов, которые хотят исследовать подводные глубины и освоить технику погружений <b>до 40 метров</b>. Глубоководный дайвинг открывает доступ к новым приключениям, таким как исследование затонувших объектов, наблюдение за уникальными глубоководными обитателями и погружения в живописные глубокие рифы. Этот курс обучает безопасным методам глубоководного погружения, развивая навыки планирования, управления газовой смесью и контроля за временем под водой.</p><p><b>Курс Deep Diver</b> — это ваш билет к новым горизонтам в дайвинге. Он открывает доступ к тем местам, куда могут добраться только подготовленные и опытные дайверы, и превращает глубоководные погружения в захватывающее, комфортное и безопасное приключение.</p>"}	1	\N	\N	2025-03-19 17:47:53.55	\N	\N
3d6a4801-136a-4415-a05e-f4ec3747d15c	\N	bf1ab13b-75fe-4285-b99f-bddce41246cd	3d6a4801-136a-4415-a05e-f4ec3747d15c	Wreck Diver	{"he": "Wreck Diver", "ru": "Wreck Diver"}	Safe diving to underwater objects	{"he": "צלילה בטוחה לאובייקטים תת-ימיים", "ru": "Безопасное погружение к подводным объектам"}	<p><b>Wreck Diver</b> is an exciting course for divers who want to explore shipwrecks, airplanes, and other underwater objects. Diving to wrecks allows you to immerse yourself in history, observing artificial reefs and mysterious artifacts that have long become part of the marine ecosystem. This course teaches safe and fascinating methods of exploring wrecks and opens access to new dive locations.</p> <p><b>Wreck Diver</b> is a course that combines the spirit of adventure with respect for history. It makes wreck diving safe and educational, allowing you to explore the past hidden beneath the sea.</p>	{"he": "<p><b>Wreck Diver</b> הוא קורס מרגש עבור צוללנים המעוניינים לחקור ספינות טבועות, מטוסים ועצמים תת-ימיים אחרים. צלילה אל ספינות טבועות מאפשרת לך לצלול אל תוך ההיסטוריה, לצפות בשוניות מלאכותיות ובחפצים מסתוריים שהפכו מזמן לחלק מהמערכת האקולוגית הימית. הקורס מלמד שיטות בטוחות ומרתקות לחקר ספינות טבועות ופותח גישה לאתרי צלילה חדשים.</p><p><b>Wreck Diver</b> הוא קורס שמשלב בין רוח ההרפתקה לכבוד להיסטוריה. הוא הופך את צלילת הספינות הטבועות לבטוחה ומחכימה, ומאפשר לך לחקור את העבר החבוי מתחת לפני הים.</p>", "ru": "<p><b>Wreck Diver</b> – это захватывающий курс для дайверов, которые хотят исследовать затонувшие корабли, самолёты и другие подводные объекты. Погружения на затонувшие объекты позволяют окунуться в историю, наблюдая искусственные рифы и загадочные артефакты, которые давно стали частью морской экосистемы. Этот курс обучает безопасным и увлекательным методам исследования затонувших объектов и открывает доступ к новым локациям для погружений.</p><p><b>Wreck Diver</b> – это курс, который сочетает в себе дух приключений и уважение к истории. Он делает погружения на затонувшие объекты безопасными и познавательными, позволяя вам исследовать прошлое, скрытое на дне моря.</p>"}	2	\N	\N	2025-03-19 17:49:01.356	\N	\N
a6aeacf5-0965-407c-bb76-364b70c305ce	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b	a6aeacf5-0965-407c-bb76-364b70c305ce	Advanced Open Water Diver Course	{"he": "Advanced Open Water Diver קורס", "ru": "Курс Advanced Open Water Diver"}	Advanced training course	{"he": "קורס לימוד מתקדם", "ru": "Курс продолженного обучения"}	<p><b>Advanced Open Water Diver</b> is an advanced diving course that allows participants to expand their skills and confidence underwater, exploring new types of dives and gaining valuable experience. This course not only opens up more opportunities for independent diving but also helps divers better understand and control their actions underwater.</p>\n\n<p>Students of the <b>Advanced Open Water Diver</b> course will complete a <b>minimum of 6</b> themed underwater <b>dives</b>, enhancing their diving capabilities and teaching important aspects of advanced diving.</p>\n\n<p>During the course, you will master theoretical and practical skills for deep dives (<b>from 21 to 30 meters</b>), expand your knowledge of underwater navigation, refine your buoyancy control skills, dive to a sunken ship, and participate in other exciting dives aimed at developing your experience and pushing your limits.</p>\n\n<p>The <b>Advanced Open Water Diver</b> course is another step toward more challenging and thrilling underwater adventures. It grants access to unique dives in various locations around the world, making your underwater journey richer and safer.</p>\n	{"he": "<p><b>Advanced Open Water Diver</b> הוא קורס צלילה מתקדם המאפשר למשתתפים להרחיב את כישוריהם וביטחונם מתחת למים, לחקור סוגי צלילה חדשים ולצבור ניסיון יקר ערך. הקורס הזה לא רק פותח יותר אפשרויות לצלילה עצמאית, אלא גם עוזר לצוללים להבין ולשלוט טוב יותר בפעולותיהם מתחת למים.</p><p>תלמידי קורס <b>Advanced Open Water Diver</b> יבצעו <b>לפחות 6</b> צלילות נושאיות תת-ימיות, שירחיבו את יכולותיהם וילמדו אותם היבטים חשובים בצלילה מתקדמת.</p><p>במהלך הקורס, תרכוש מיומנויות תיאורטיות ומעשיות בצלילות עומק (<b>מ-21 עד 30 מטרים</b>), תעמיק את הידע שלך בניווט תת-ימי, תשפר את השליטה בציפה, תצלול אל ספינה טבועה ותשתתף בעוד צלילות מרתקות שפותחו במיוחד להרחבת הניסיון והגבולות שלך.</p><p>קורס <b>Advanced Open Water Diver</b> הוא עוד צעד לעבר הרפתקאות צלילה מאתגרות ומלהיבות יותר. הוא פותח גישה לצלילות ייחודיות בנקודות שונות בעולם, מה שהופך את מסע הצלילה שלך לעשיר ובטוח יותר.</p>", "ru": "<p><b>Advanced Open Water Diver</b> – это продвинутый курс дайвинга, позволяющий участникам расширить свои навыки и уверенность под водой, исследуя новые виды погружений и получая ценный опыт. Этот курс не только открывает больше возможностей для самостоятельных погружений, но и помогает дайверам глубже понять и контролировать свои действия под водой.</p><p>Студентам курса <b>Advanced Open Water Diver</b> предстоит совершить <b>минимум 6</b> тематических подводных <b>погружений</b>, расширяющих возможности дайверов и обучая важным аспектам продвинутого дайвинга.</p><p>В ходе курса Ты овладеешь теоретическими и практическими навыками глубоких погружений (<b>от 21 до 30 метров</b>), расширишь свои знания о подводной навигации, отточишь навыки владения плавучестью, погрузишься к затопленному судну и сделаешь еще ряд увлекательных погружений, направленных на развитие опыта и расширение Твоих пределов.</p><p>Курс <b>Advanced Open Water Diver</b> – это еще один шаг к более сложным и захватывающим приключениям под водой. Он открывает доступ к уникальным погружениям в разных точках мира, делая Твое подводное путешествие более насыщенным и безопасным.</p>"}	2	\N	\N	2025-03-19 17:37:13.096	\N	\N
c3469351-41c4-49c4-b6c5-86ddceb9c682	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84	c3469351-41c4-49c4-b6c5-86ddceb9c682	Night Diver	{"he": "Night Diver", "ru": "Night Diver"}	Night dives	{"he": "צלילות לילה", "ru": "Ночные погружения"}	<p><b>Night Diver</b> is a course for certified divers who want to experience thrilling night dives and discover a completely new underwater world. Night diving is a unique opportunity to observe underwater creatures during their evening activity, explore flora and fauna that only appear in the dark, and experience the unusual atmosphere of the underwater world illuminated by dive lights.</p> <p><b>Night Diver</b> is a course for those who want to unlock the full depth of the underwater world. It offers unforgettable experiences and expands the boundaries of perception, opening the doors to the mysterious world of night diving.</p>	{"he": "<p><b>Night Diver</b> הוא קורס עבור צוללנים מוסמכים המעוניינים לחוות צלילות לילה מרגשות ולגלות עולם תת-ימי חדש לחלוטין. צלילת לילה היא הזדמנות ייחודית לצפות ביצורים תת-ימיים במהלך פעילותם הערבית, לחקור צמחייה ובעלי חיים המופיעים רק בחשיכה, ולחוות את האווירה המיוחדת של העולם התת-ימי המואר על ידי פנסי צלילה.</p><p><b>Night Diver</b> הוא קורס עבור אלה שרוצים לפתוח את כל העומק של העולם התת-ימי. הוא מציע חוויות בלתי נשכחות ומרחיב את גבולות התפיסה, פותח את הדלתות לעולם המסתורי של צלילת הלילה.</p>", "ru": "<p><b>Night Diver</b> – это курс для сертифицированных дайверов, которые хотят испытать захватывающие погружения ночью и открыть для себя совершенно новый подводный мир. Ночные погружения – это уникальная возможность наблюдать подводных обитателей в их вечерней активности, изучить флору и фауну, которые проявляются только в темное время суток, и испытать необычную атмосферу подводного мира в свете фонарей.</p><p><b>Night Diver</b> – это курс для тех, кто хочет раскрыть полную глубину возможностей подводного мира. Он дарит незабываемые впечатления и расширяет границы восприятия, открывая двери в таинственный мир ночного дайвинга.</p>"}	2	\N	\N	2025-03-19 17:45:07.689	\N	\N
e6c1b124-5f50-44ba-8018-5b382ba65763	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84	e6c1b124-5f50-44ba-8018-5b382ba65763	Enriched Air Diver	{"he": "Enriched Air Diver"}	Training in the safe use of enriched air	{"he": "לימוד שימוש בטוח בתערובות מועשרות", "ru": "Обучение безопасному использованию обогащенных смесей"}	<p><b>Enriched Air Diver</b> is a specialized course that allows divers to use enriched air (nitrox) to increase dive time and enhance safety underwater. Nitrox is a gas mixture with a higher oxygen content, which reduces nitrogen buildup in the body and provides more opportunities for diving, especially <b>at depths of 18 to 30 meters</b>.</p> <p>If you want to increase your time underwater and reduce the interval between dives, if you plan intensive dive series, or simply want to improve your physical condition after diving by reducing accumulated nitrogen, then this course is perfect for you.</p>	{"he": "<p><b>Enriched Air Diver</b> הוא קורס מיוחד המאפשר לצוללנים להשתמש באוויר מועשר (ניטרוקס) כדי להגדיל את זמן הצלילה ולשפר את הבטיחות מתחת למים. ניטרוקס הוא תערובת גזים עם תכולת חמצן גבוהה יותר, המפחיתה את הצטברות החנקן בגוף ומספקת יותר הזדמנויות לצלילה, במיוחד <b>בעומקים של 18 עד 30 מטרים</b>.</p><p>אם אתה רוצה להגדיל את הזמן שלך מתחת למים ולהפחית את המרווח בין הצלילות, אם אתה מתכנן סדרות צלילות אינטנסיביות, או פשוט רוצה לשפר את המצב הגופני שלך לאחר הצלילה על ידי הפחתת החנקן שהצטבר, הקורס הזה מושלם עבורך.</p>", "ru": "<p><b>Enriched Air Diver</b> – это специализированный курс, который позволяет дайверам использовать обогащённый воздух (найтрокс) для увеличения времени погружений и повышения безопасности под водой. Найтрокс – смесь с повышенным содержанием кислорода, которая снижает накопление азота в организме и дает больше возможностей для погружений, особенно <b>на глубинах от 18 до 30 метров</b>.</p><p>Если Ты хочешь увеличить время нахождения под водой и уменьшить интервал между погружениями, если Ты планируешь интенсивные серии погружений или просто хочешь улучшить свою физическое состояние после погружений за счет снижения накопленного азота, то этот курс идеально подходит для Тебя.</p>"}	1	\N	\N	2025-03-19 17:43:55.382	\N	\N
c7859326-a86e-456f-b2d7-549a14f37624	\N	8b19c170-9210-406b-804a-105b86441097	c7859326-a86e-456f-b2d7-549a14f37624	Assistant Dive Instructor	{"he": "Assistant Dive Instructor קןרס", "ru": "Курс Assistant Dive Instructor"}	Advanced training course	{"he": "קורס לימוד מתקדם", "ru": "Курс продолженного обучения"}	<p><b>Assistant Dive Instructor</b> is a course designed for certified divers who want to take a step toward becoming an instructor. Course participants learn to support instructors during training, develop skills in planning and conducting diving classes, and master methods of group management and water safety. The course includes theoretical lessons, practical training, and working with students. After obtaining the certification, you will be able to conduct introductory courses, assist instructors in other courses, and become part of the professional diving community.</p>	{"he": "<p><b>Assistant Dive Instructor</b> הוא קורס המיועד לצוללנים מוסמכים המעוניינים לעשות צעד לקראת הפיכה למדריכים. משתתפי הקורס לומדים לתמוך במדריכים במהלך ההדרכה, לפתח מיומנויות בתכנון וביצוע שיעורי צלילה, וללמוד שיטות לניהול קבוצות ולבטיחות במים. הקורס כולל שיעורים תיאורטיים, אימונים מעשיים ועבודה עם תלמידים. לאחר קבלת ההסמכה, תוכל להעביר קורסי מבוא, לסייע למדריכים בקורסים אחרים ולהפוך לחלק מהקהילה המקצועית של הצוללנים.</p>", "ru": "<p><b>Assistant Dive Instructor</b> – это курс, предназначенный для сертифицированных дайверов, желающих сделать шаг к профессии инструктора. Участники курса учатся поддерживать инструкторов во время обучения, развивают навыки планирования и проведения занятий по дайвингу, а также осваивают методы управления группами и обеспечения безопасности на воде. Курс включает теоретические занятия, практические тренировки и работу с учениками. Получив сертификат, Ты сможешь проводить вводные курсы, ассистировать инструкторам на других курсах и стать частью профессионального сообщества дайверов.</p>"}	3	\N	\N	2025-03-19 17:52:24.063	\N	\N
d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	\N	d3f450bf-b0c5-4361-98b8-7593d746c7dc	d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	Introductory Dive	{"he": "צלילת היכרות", "ru": "Ознакомительное погружение"}	Safe diving with an instructor	{"he": "צלילה בטוחה עם מדריך", "ru": "Безопасный дайвинг вместе с инструктором"}	<p><b>Introductory Dive</b> is an opportunity to touch another, unexplored world. Just like astronauts breathe in space while in zero gravity, you will be able to breathe underwater. You will see the underwater world from within, experience the feeling of weightlessness, and be amazed at how time seems to change during these moments.</p><p>As part of the introductory dive program, you will <b>dive to a depth of up to 6 meters</b> in the beautiful Red Sea under the guidance of an experienced instructor. You will learn basic theoretical knowledge and diving techniques, and receive underwater photos at the end of the dive.</p><p>The introductory dive is <b>available to children</b> and adults <b>aged 8 and above</b>.</p>	{"he": "<p><b>צלילת היכרות</b> היא הזדמנות לגעת בעולם אחר ובלתי מוכר. בדומה לאסטרונאוטים שנושמים בחלל בזמן חוסר משקל, תוכלו לנשום מתחת למים. תראו את העולם התת-ימי מבפנים, תחוו את תחושת חוסר המשקל, ותתפלאו כיצד הזמן משתנה ברגעים אלו.</p><p>במסגרת תוכנית צלילת ההיכרות, תבצעו <b>צלילה לעומק של עד 6 מטרים</b> בים האדום היפהפה, בהדרכתו של מדריך מנוסה. תלמדו ידע תיאורטי בסיסי וטכניקות צלילה, ותקבלו תמונות תת-ימיות בסיום הצלילה.</p><p>צלילת ההיכרות <b>זמינה לילדים</b> ולמבוגרים <b>מגיל 8 ומעלה</b>.</p>", "ru": "<p><b>Ознакомительное погружение</b> — это возможность прикоснуться к другому, неизведанному миру. Подобно тому как космонавты, находясь в невесомости, дышат в космосе, Ты сможешь дышать прямо под водой. Ты увидишь подводный мир изнутри, сможешь ощутить себя в невесомости, удивишься, как изменяется бег времени в эти моменты.</p><p>В рамках программы ознакомительного погружения Ты совершишь <b>погружение на глубину до 6 метров</b> в прекрасном Красном море под руководством опытного инструктора, познакомишься с базовыми теоретическими знаниями и техникой подводного плавания, а также получишь подводные фотографии в конце погружения.</p><p>Ознакомительное погружение <b>доступно детям</b> и взрослым, <b>достигшим 8 лет</b>.</p>"}	1	\N	\N	2025-03-19 17:32:20.048	\N	\N
ad59d289-445d-44c0-8d16-4d5a4b4c07a9	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b	ad59d289-445d-44c0-8d16-4d5a4b4c07a9	Open Water Diver Course	{"he": "Open Water Diver קורס", "ru": "Курс Open Water Diver"}	Beginner diver course	{"he": "קורס צלילה למתחילים", "ru": "Курс для начинающих дайверов"}	<p>You are about to embark on one of the most amazing adventures of your life!</p> <p>After completing the course, you will receive an international <b>Open Water Diver</b> certification and become part of a global community of passionate underwater enthusiasts. With this certification, you will take the first step toward forever changing your perspective on the world and obtain a &quot;license&quot; to explore one of the last frontiers of our planet—the World Ocean.</p> <p>Only a few become astronauts and uncover the mysteries of space, but by completing this course, you too can experience the thrill of weightlessness, encounter amazing marine creatures, and explore sunken objects. Such opportunities are available only to those who are truly passionate about diving.</p> <p>The certification you will receive upon completing the <b>Open Water Diver</b> course confirms compliance with the highest international standards of safety and quality education.</p>	{"he": "<p>אתם עומדים לצאת לאחד מההרפתקאות המדהימות ביותר בחייכם!</p> <p>לאחר סיום הקורס, תקבלו תעודה בינלאומית של <b>Open Water Diver</b> ותהפכו לחלק מקהילה גלובלית של חובבי עולם תת-ימי נלהבים. עם התעודה הזו, תעשו את הצעד הראשון לשינוי תפיסת העולם שלכם ותקבלו &quot;רישיון&quot; לחקור את אחד הגבולות האחרונים של כוכב הלכת שלנו—האוקיינוס העולמי.</p> <p>רק מעטים הופכים לאסטרונאוטים וחושפים את מסתורי החלל, אך עם סיום הקורס, גם אתם תוכלו לחוות את הריגוש של חוסר משקל, לפגוש יצורים ימיים מדהימים ולחקור עצמים טבועים. אפשרויות כאלה זמינות רק לאלו שממש נלהבים מצלילה.</p> <p>התעודה שתקבלו עם סיום קורס <b>Open Water Diver</b> מאשרת עמידה בסטנדרטים הבינלאומיים הגבוהים ביותר של בטיחות ואיכות בחינוך.</p>", "ru": "<p>Вас ожидает одно из самых удивительных приключений в вашей жизни!</p><p>Завершив обучение, Вы получите международный сертификат <b>Open Water Diver</b> и станете частью мирового сообщества страстных любителей подводного мира. С этим сертификатом вы сделаете первый шаг к тому, чтобы навсегда изменить свой взгляд на мир и получите “лицензию” на исследование одного из последних рубежей нашей планеты — Мирового Океана.</p><p>Лишь немногие становятся космонавтами и раскрывают тайны космоса, но, пройдя обучение, вы тоже сможете почувствовать трепет невесомости, увидеть удивительных морских существ и исследовать затонувшие объекты. Такие возможности доступны только тем, кто по-настоящему увлечен дайвингом.</p><p>Сертификат, который Вы получите по итогам обучения на курсе <b>Open Water Diver</b>, подтверждает соответствие самым высоким международным стандартам безопасности и качества образования.</p>"}	1	\N	\N	2025-03-19 17:35:59.231	\N	\N
1cd9500c-6f9a-4548-a201-10806064907a	\N	d3f450bf-b0c5-4361-98b8-7593d746c7dc	1cd9500c-6f9a-4548-a201-10806064907a	Discover Scuba Diving	{"he": "גילוי צלילה", "ru": "Discover Scuba Diving"}	The first step towards full training in the course	{"he": "הצעד הראשון ללימוד מלא בקורס", "ru": "Первый шаг к полноценному обучению на курсе"}	<p>The <b>Discover Scuba Diving</b> program is an exciting and safe introduction to the underwater world for beginners who want to try diving but are not ready for a full course. It is designed to provide participants with basic skills and confidence under the guidance of a professional instructor. The program takes place in confined water at a depth of <b>up to 6 meters</b> and offers a unique opportunity to experience what it feels like to breathe underwater for the first time.</p><p>The program includes a theoretical introductory lesson, a training dive, and your first independent underwater experience.</p><p>During the practical session with the instructor, you will master skills such as clearing your mask underwater, using the breathing apparatus, and controlling your buoyancy underwater.</p><p>The <b>Discover Scuba Diving</b> program can be the first step toward obtaining an international <b>Open Water Diver</b> certification, which will allow you to dive anywhere in the world.</p><p>If you want to find out if you are ready to fully immerse yourself in the exciting world of diving, the <b>Discover Scuba Diving</b> program is an easy way to do it.</p>	{"he": "<p>תוכנית <b>Discover Scuba Diving</b> היא היכרות מרגשת ובטוחה עם העולם התת-ימי למתחילים שרוצים לנסות צלילה אך עדיין לא מוכנים לקורס מלא. התוכנית נועדה להעניק למשתתפים מיומנויות בסיסיות וביטחון בהדרכתו של מדריך מקצועי. התוכנית מתקיימת במים מוגבלים בעומק של <b>עד 6 מטרים</b> ומציעה הזדמנות ייחודית לחוות לראשונה איך זה לנשום מתחת למים.</p><p>התוכנית כוללת שיעור תיאורטי מקדים, צלילת אימון וחוויה תת-ימית עצמאית ראשונה.</p><p>במהלך השיעור המעשי עם המדריך, תלמדו מיומנויות כמו ניקוי מסיכה מתחת למים, שימוש בציוד הנשימה ושליטה בציפה מתחת למים.</p><p>תוכנית <b>Discover Scuba Diving</b> יכולה להיות הצעד הראשון לקראת קבלת תעודת <b>Open Water Diver</b> בינלאומית, שתאפשר לכם לצלול בכל מקום בעולם.</p><p>אם אתם רוצים להבין האם אתם מוכנים לצלול לעולם המרתק של הצלילה, תוכנית <b>Discover Scuba Diving</b> היא דרך קלה לעשות זאת.</p>", "ru": "<p>Программа <b>Discover Scuba Diving</b> – это увлекательное и безопасное знакомство с подводным миром для новичков, которые хотят попробовать дайвинг, но не готовы к полноценному курсу. Она разработана для того, чтобы дать участникам базовые навыки и уверенность под руководством профессионального инструктора. Программа проходит в условиях ограниченной воды на глубине <b>до 6 метров</b> и предоставляет уникальный шанс впервые ощутить каково это: дышать под водой.</p><p>Программа включает в себя теоретический вводный урок, тренировочное погружение и первый самостоятельный подводный опыт.</p><p>В ходе практического занятия с инструктором вы овладеете навыками очистки маски под водой, работой с дыхательным аппаратом и сможете контролировать свою плавучесть под водой.</p><p>Программа <b>Discover Scuba Diving</b> может стать первым шагом к получению международной сертификации <b>Open Water Diver</b>, которая позволит погружаться в любой точке мира.</p><p>Если вы хотите понять готовы ли вы к полноценному погружению в захватывающий мир дайвинга, то программа <b>Discover Scuba Diving</b> — это легкий способ сделать это.</p>"}	2	\N	\N	2025-03-19 17:34:13.378	\N	\N
cf89c5e0-686e-4618-8f9d-dca9d1b581dd	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b	cf89c5e0-686e-4618-8f9d-dca9d1b581dd	Open Water Diver + Advanced Open Water Diver Course	{"he": "Open Water Diver + Advanced Open Water Diver קורס", "ru": "Курс Open Water Diver + Advanced Open Water Diver"}	Special offer	{"he": "הצעה מיוחדת ומשתלמת", "ru": "Специальное выгодное предложение"}	<p>The comprehensive course «<b>Open Water Diver + Advanced Open Water Diver</b>» is a unique program specially designed for those who want to go from beginner to confident, experienced diver in one course. This intensive and structured course combines basic and advanced levels, allowing you to immediately master all the necessary skills for safe and deep diving.</p>	{"he": "<p>קורס מקיף &laquo;<b>Open Water Diver + Advanced Open Water Diver</b>&raquo; הוא תוכנית ייחודית שפותחה במיוחד עבור אלה שרוצים לעבור את הדרך ממתחילים לצוללנים מנוסים ובטוחים בקורס אחד. קורס אינטנסיבי ומאורגן זה משלב רמות בסיסיות ומתקדמות, ומאפשר לכם לרכוש מיומנויות הנדרשות לצלילה בטוחה ועמוקה.</p>", "ru": "<p>Комплексный курс «<b>Open Water Diver + Advanced Open Water Diver</b>» – это уникальная программа, специально разработанная для тех, кто хочет пройти путь от новичка до уверенного, опытного дайвера в одном курсе. Этот интенсивный и структурированный курс объединяет базовый и продвинутый уровни, что позволяет сразу освоить все необходимые навыки для безопасных и глубоких погружений.</p>"}	3	\N	\N	2025-03-19 17:38:43.46	\N	\N
74cb0b1c-2b55-4ba3-999b-1d11eaea7090	\N	91292509-2c5d-46ba-b158-67290afe21ab	74cb0b1c-2b55-4ba3-999b-1d11eaea7090	Rescue Diver Course	{"he": "קןרס הצלה", "ru": "Курс Rescue Diver"}	Advanced training course	{"he": "קורס לימוד מתקדם", "ru": "Курс продолженного обучения"}	<p><b>Rescue Diver</b> is a course for certified divers who want to develop their skills to the level of a confident and prepared diver. The training program focuses on preventing and managing potential underwater incidents, teaching participants the basics of rescue operations and emergency assistance methods. This course will help you become a more responsible and skilled diver who not only cares about their own safety but is also ready to help others.</p>	{"he": "<p><b>Rescue Diver</b> הוא קורס עבור צוללנים מוסמכים המעוניינים לפתח את כישוריהם לרמה של צוללן בטוח ומוכן לכל מצב. תוכנית ההכשרה מתמקדת במניעה וניהול של אירועים פוטנציאליים מתחת למים, ומלמדת את המשתתפים את יסודות פעולות החילוץ ושיטות סיוע בחירום. הקורס יעזור לך להפוך לצוללן אחראי ומיומן יותר, שלא רק דואג לבטיחותו האישית אלא גם מוכן לעזור לאחרים.</p>", "ru": "<p><b>Rescue Diver</b> – это курс для сертифицированных дайверов, которые хотят развить свои навыки до уровня уверенного и готового к любым ситуациям дайвера. Программа обучения фокусируется на предупреждении и управлении потенциальными инцидентами под водой, обучая участников основам спасательных операций и методам оказания помощи в экстренных ситуациях. Этот курс поможет тебе стать более ответственным и подкованным дайвером, который не только заботится о собственной безопасности, но и готов помочь другим.</p>"}	1	\N	\N	2025-03-19 17:40:39.768	\N	\N
3300642f-ef1b-40df-a23e-281e539d8ffa	\N	91292509-2c5d-46ba-b158-67290afe21ab	3300642f-ef1b-40df-a23e-281e539d8ffa	Emergency First Response	{"he": "Emergency First Response קורס", "ru": "Курс Emergency First Response"}	First aid course	{"he": "קורס עזרה ראשונה", "ru": "Курс оказания первой помощи"}	<p><b>Emergency First Response (EFR)</b> is a first aid and resuscitation course designed for those who want to learn how to act quickly and effectively in emergency situations. The course not only teaches first aid techniques but also builds confidence and skills for responding in critical moments. EFR is a mandatory step for those aiming to obtain <b>Rescue Diver</b> certification and beyond.</p> <p>During the course, you will learn basic cardiopulmonary resuscitation (CPR) and first aid skills, develop the ability to confidently respond and provide assistance to a victim until professionals arrive, and master basic medical techniques that can save the lives of your loved ones.</p> <p><b>Emergency First Response</b> is a course that makes you confident in your ability to help others, regardless of the circumstances. EFR skills may one day become crucial in saving lives—both on land and underwater.</p>	{"he": "<p><b>Emergency First Response (EFR)</b> הוא קורס עזרה ראשונה והחייאה שנועד עבור אלה שרוצים ללמוד כיצד לפעול במהירות וביעילות במצבי חירום. הקורס לא רק מלמד טכניקות עזרה ראשונה אלא גם בונה ביטחון ומיומנויות לתגובה ברגעים קריטיים. EFR הוא שלב חובה עבור אלה השואפים לקבל הסמכת <b>Rescue Diver</b> ומעבר לכך.</p><p>במהלך הקורס תלמדו מיומנויות בסיסיות של החייאה (CPR) ועזרה ראשונה, תפתחו את היכולת להגיב בביטחון ולספק סיוע לנפגע עד להגעת אנשי מקצוע, ותשלטו בטכניקות רפואיות בסיסיות שיכולות להציל את חייהם של יקיריכם.</p><p><b>Emergency First Response</b> הוא קורס שהופך אתכם לבטוחים ביכולתכם לעזור לאחרים, ללא קשר לנסיבות. מיומנויות EFR עשויות יום אחד להיות קריטיות להצלת חיים—בין אם ביבשה או מתחת למים.</p>", "ru": "<p><b>Emergency First Response (EFR)</b> – это курс по оказанию первой помощи и реанимации, который разработан для тех кто хочет научиться быстро и грамотно действовать в экстренных ситуациях. Курс не только обучает техникам оказания первой помощи, но и развивает уверенность и навыки для реагирования в критические моменты. EFR является обязательным этапом для тех, кто стремится получить сертификацию <b>Rescue Diver</b> и выше.</p><p>В ходе курса ты познакомишься с базовыми навыками сердечно-легочной реанимации (СЛР) и оказания первой помощи, разовьешь способность уверенно реагировать и оказывать помощь пострадавшему до прибытия профессионалов, освоишь базовые медицинские приемы, которые могут спасти жизнь твоим близким.</p><p><b>Emergency First Response</b> – это курс, который делает вас уверенным в собственной способности помочь другим, независимо от обстоятельств. Навыки EFR могут однажды стать ключевыми в спасении жизни – как на суше так и под водой.</p>"}	2	\N	\N	2025-03-19 17:42:02.747	\N	\N
2e2b0efd-364e-47bf-b66f-0edbe4c1308f	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84	2e2b0efd-364e-47bf-b66f-0edbe4c1308f	Dry Suit Diver	{"he": "Dry Suit Diver", "ru": "Dry Suit Diver"}	Dry suit diving	{"he": "צלילות בחליפה יבשה", "ru": "Погружения в сухом гидрокостюме"}	<p><b>Dry Suit Diver</b> is a specialized course for divers who want to learn the techniques of diving in a drysuit. Such a suit provides access to comfortable diving during the cool season or in cold or extreme conditions where water temperatures may be too low for a regular wetsuit. The course helps you master buoyancy control and comfort features when diving in cold waters, making diving accessible year-round.</p> <p><b>Dry Suit Diver</b> is the key to new opportunities that are not dependent on water temperature. This course will open up access to exciting and unique diving locations, making it possible to dive at any time of the year and in a variety of natural conditions.</p>	{"he": "<p><b>Dry Suit Diver</b> הוא קורס מיוחד עבור צוללנים המעוניינים ללמוד את הטכניקות של צלילה בחליפת יבשה. חליפה כזו מאפשרת גישה לצלילה נוחה במהלך העונה הקרה או בתנאים קרים או קיצוניים שבהם טמפרטורת המים עשויה להיות נמוכה מדי עבור חליפה רטובה רגילה. הקורס עוזר לך לשלוט בשליטה בציפה ובתכונות הנוחות בעת צלילה במים קרים, והופך את הצלילה לנגישה בכל ימות השנה.</p><p><b>Dry Suit Diver</b> הוא המפתח להזדמנויות חדשות שאינן תלויות בטמפרטורת המים. הקורס הזה יפתח גישה לאתרי צלילה מרגשים וייחודיים, ויאפשר צלילה בכל עת של השנה ובמגוון תנאים טבעיים.</p>", "ru": "<p><b>Dry Suit Diver</b> – это специализированный курс для дайверов, которые хотят изучить технику погружений в сухом гидрокостюме. Такой костюм открывает доступ к комфортному дайвингу в прохладный сезон или в холодных или экстремальных условиях, где температура воды может быть слишком низкой для обычного мокрого костюма. Курс помогает освоить особенности управления плавучестью и комфорта при погружениях в холодных водах, делая дайвинг доступным в любое время года.</p><p><b>Dry Suit Diver</b> – это ключ к новым возможностям, которые не зависят от температуры воды. Этот курс откроет вам доступ к захватывающим и уникальным местам для дайвинга, делая его возможным в любое время года и в самых разных природных условиях.</p>"}	3	\N	\N	2025-03-19 17:46:32.612	\N	\N
2d82a681-f8e7-4025-b323-7af13b6d525c	\N	8b19c170-9210-406b-804a-105b86441097	2d82a681-f8e7-4025-b323-7af13b6d525c	Divemaster Course	{"he": "Divemaster קןרס", "ru": "Курс Divemaster"}	First professional level	{"he": "הרמה המקצועית הראשונה", "ru": "Первый профессиональный уровень"}	<p><b>Divemaster</b> is a professional course for experienced divers who want to take the next step in their diving career. This course teaches underwater group management, assisting instructors, and working with divers of different skill levels. By becoming a certified divemaster, you will be able to lead groups, assist in training, and conduct independent underwater tours. <b>Divemaster</b> is your first professional level in the diving education system, opening up opportunities to work in dive centers around the world.</p> <p><b>Divemaster</b> is not just a course, it is a <b>path to professionalism, leadership</b>, and new <b>opportunities</b> in the world of diving. If you are ready to share your passion for underwater adventures and help others explore the underwater world, Divemaster is your ideal next step.</p>	{"he": "<p><b>Divemaster</b> הוא קורס מקצועי עבור צוללנים מנוסים המעוניינים לקחת את הצעד הבא בקריירת הצלילה שלהם. הקורס מלמד ניהול קבוצות מתחת למים, סיוע למדריכים ועבודה עם צוללנים ברמות מיומנות שונות. לאחר שתהפוך לדייבמאסטר מוסמך, תוכל להוביל קבוצות, לסייע בהדרכה ולבצע סיורים תת-ימיים עצמאיים. <b>Divemaster</b> הוא הרמה המקצועית הראשונה שלך במערכת החינוך לצלילה, הפותחת הזדמנויות לעבודה במרכזי צלילה ברחבי העולם.</p><p><b>Divemaster</b> הוא לא רק קורס, זה <b>דרך למקצועיות, מנהיגות</b> והזדמנויות חדשות בעולם הצלילה. אם אתה מוכן לשתף את התשוקה שלך להרפתקאות תת-ימיות ולעזור לאחרים לחקור את העולם התת-ימי, Divemaster הוא הצעד הבא האידיאלי שלך.</p>", "ru": "<p><b>Divemaster</b> – это профессиональный курс для опытных дайверов, которые хотят сделать следующий шаг в своей дайвинг-карьере. Этот курс обучает управлению подводной группой, технике помощи инструктору и работе с дайверами разных уровней подготовки. Став сертифицированным дайвмастером, вы сможете сопровождать группы, помогать в обучении, а также проводить самостоятельные подводные экскурсии. <b>Divemaster</b> – это ваш первый профессиональный уровень в системе обучения дайвингу, открывающий возможности для работы в дайв-центрах по всему миру.</p><p><b>Divemaster</b> – это не просто курс, это <b>путь к профессионализму, лидерству</b> и новым <b>возможностям</b> в мире дайвинга. Если вы готовы делиться своей страстью к подводным приключениям и помогать другим познавать мир под водой, Divemaster – ваш идеальный следующий шаг.</p>"}	1	\N	\N	2025-03-19 17:50:34.732	\N	\N
645e94a4-cd7d-4ecb-b6bd-9a5d4546447d	\N	8b19c170-9210-406b-804a-105b86441097	645e94a4-cd7d-4ecb-b6bd-9a5d4546447d	Divemaster Leader Course	{"he": "Divemaster Leader קןרס", "ru": "Курс Divemaster Leader"}	Leadership development	{"he": "פיתוח כישורי מנהיגות", "ru": "Развитие лидерских качеств"}	<p><b>Divemaster Leader</b> is an advanced professional course for divers aiming to become leaders of underwater groups and support instructors. The program develops skills in dive management, training, and resolving complex situations underwater. During the course, participants deepen their theoretical knowledge, master leadership qualities, and learn to ensure the safety of other divers. Upon completing the course, you will be able to confidently lead groups, assist in training, and build a career as a diving professional.</p>	{"he": "<p><b>Divemaster Leader</b> הוא קורס מקצועי מתקדם עבור צוללנים השואפים להפוך למנהיגים של קבוצות תת-ימיות ולתמוך במדריכים. התוכנית מפתחת מיומנויות בניהול צלילות, הדרכה ופתרון מצבים מורכבים מתחת למים. במהלך הקורס, המשתתפים מעמיקים את הידע התיאורטי שלהם, רוכשים מיומנויות מנהיגות ולומדים להבטיח את בטיחותם של צוללנים אחרים. לאחר סיום הקורס, תוכלו להוביל קבוצות בביטחון, לסייע בהדרכה ולבנות קריירה כמקצוענים בצלילה.</p>", "ru": "<p><b>Divemaster Leader</b> – это продвинутый профессиональный курс для дайверов, стремящихся стать лидерами подводных групп и поддерживать инструкторов. Программа развивает навыки управления погружениями, обучения и решения сложных ситуаций под водой. В ходе курса участники углубляют теоретические знания, осваивают лидерские качества и учатся обеспечивать безопасность других дайверов. Завершив курс, вы сможете уверенно вести группы, ассистировать в обучении и строить карьеру профессионала в дайвинге.</p>"}	2	\N	\N	2025-03-19 17:51:35.15	\N	\N
\.


--
-- Data for Name: courses_features; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.courses_features (id, course_id, description, description_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
a38e78cb-3f58-441b-92eb-69080fe2abf9	d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	Глубина (макс) 6 метров;	\N	2	2025-03-24 07:45:05.307	\N	\N
a6e8b4de-0ed1-47e0-b90f-d5ac847d327c	d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	Время в воде 30 минут;	\N	1	2025-03-24 07:44:22.19	\N	\N
65bb414c-d397-4c6f-b10b-06db9ff38e5a	d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	Доступно детям от 8 лет.	\N	3	2025-03-24 07:45:58.417	\N	\N
\.


--
-- Data for Name: courses_groups; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.courses_groups (id, code, display_name, display_name_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
d3f450bf-b0c5-4361-98b8-7593d746c7dc	\N	Start Diving	{"he": "תתחיל לצלול", "ru": "Начни нырять"}	1	2025-03-19 10:00:19.399	\N	\N
50f9f9e4-948a-4453-a189-5a1114b3f42b	\N	Become a diver	{"he": "תהפוך לצוללן", "ru": "Стань дайвером"}	2	2025-03-19 10:00:36.379	\N	\N
91292509-2c5d-46ba-b158-67290afe21ab	\N	Keep learning	{"he": "תמשיך ללמוד", "ru": "Продолжай учиться"}	3	2025-03-19 10:00:55.648	\N	\N
020c140b-a88f-4fe5-9ad9-9ab0b0609c84	\N	Develop specializations	{"he": "פתח התמחויות", "ru": "Развивай специализации"}	4	2025-03-19 10:01:13.255	\N	\N
bf1ab13b-75fe-4285-b99f-bddce41246cd	\N	Expand the limits	{"he": "הרחב את הגבולות", "ru": "Расширяй пределы"}	5	2025-03-19 10:01:30.023	\N	\N
8b19c170-9210-406b-804a-105b86441097	\N	Become a professional	{"he": "תהפוך למקצוען", "ru": "Стань профессионалом"}	6	2025-03-19 10:01:58.596	\N	\N
\.


--
-- Data for Name: courses_inclusions; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.courses_inclusions (id, course_id, description, description_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: courses_suggestions; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.courses_suggestions (id, course_id, description, description_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: currencies; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.currencies (id, display_name, display_name_locales, symbol, is_default, created_at, updated_at, deleted_at) FROM stdin;
ILS	Israeli Shekel	{"he": "שקל חדש", "ru": "Израильский шекель"}	₪    	t	2025-03-19 07:52:22.818	\N	\N
USD	United States Dollar	{"he": "דולר אמריקאי", "ru": "Доллар США"}	$    	f	2025-03-19 07:56:02.557	\N	\N
EUR	Euro	{"he": "יורו", "ru": "Евро"}	€    	f	2025-03-19 07:57:53.372	\N	\N
\.


--
-- Data for Name: excursions; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.excursions (id, code, display_name, display_name_locales, subtitle, subtitle_locales, description, description_locales, "position", logo_url, image_url, created_at, updated_at, deleted_at, product_id) FROM stdin;
c37b1d3b-8f80-4402-855f-3747181bd1cf	\N	The sunken ship "Satil"	{"he": "הספינה הטבועה סאטיל", "ru": "Затопленный корабль Сатиль"}	A warship off the shores of Eilat	{"he": "ספינת מלחמה מול חופי אילת", "ru": "Военное судно у берегов Эйлата"}	<p>One of the most popular underwater diving sites in Israel is the <b>Satil</b> — a former military ship sunk off the coast of Eilat. This sunken object attracts both beginner and experienced divers due to its historical significance, fascinating underwater life, and accessibility for diving. The <b>Satil</b> was one of the Sa'ar-3 class missile boats that served in the Israeli Navy and participated in the defense of the country for many years. In 1994, it was intentionally sunk to create an artificial reef, which has since become home to a variety of marine life and a magnet for divers from around the world.</p> <p>Diving on the Satil opens up a fascinating world. The ship's hull is already partially covered with corals, and fish swim around it. Inside the ship, you can explore various compartments, including the captain's bridge and engine room, creating a sense of real adventure.</p> <p>The ship lies <b>at a depth of 18 to 24 meters</b>, making it accessible to divers of different skill levels. For beginners, it is an excellent opportunity to feel like an explorer of underwater mysteries, while for experienced divers, it is a chance to practice penetration skills into sunken objects.</p>	{"he": "<p>אחד מאתרי הצלילה התת-ימיים הפופולריים בישראל הוא <b>סטיל</b> — ספינת צבא לשעבר שהוטבעה מול חופי אילת. האובייקט הטבוע הזה מושך צוללנים מתחילים ומנוסים כאחד בשל חשיבותו ההיסטורית, החיים התת-ימיים המרתקים והנגישות שלו לצלילה. <b>סטיל</b> הייתה אחת מספינות הטילים מסדרת סער-3 ששירתו בחיל הים הישראלי והשתתפו בהגנה על המדינה במשך שנים רבות. בשנת 1994, היא הוטבעה בכוונה כדי ליצור שונית מלאכותית, שהפכה מאז לבית למגוון רחב של יצורים ימיים ולמוקד משיכה לצוללנים מכל רחבי העולם.</p> <p>צלילה על הסטיל פותחת עולם מרתק. גוף הספינה כבר מכוסה חלקית באלמוגים, ודגים שוחים סביבו. בתוך הספינה, תוכלו לחקור תאים שונים, כולל גשר הקפטן והחדר מכונות, מה שיוצר תחושה של הרפתקה אמיתית.</p> <p>הספינה שוכנת <b>בעומק של 18 עד 24 מטרים</b>, מה שהופך אותה לנגישה לצוללנים ברמות שונות. עבור מתחילים, זו הזדמנות מצוינת להרגיש כמו חוקרי תעלומות תת-ימיות, בעוד שעבור צוללנים מנוסים, זהו סיכון לתרגל כישורי חדירה לאובייקטים טבועים.</p>", "ru": "<p>Одним из самых популярных подводных объектов для дайвинга в Израиле является <b>Сатиль</b> — бывший военный корабль, затопленный у побережья Эйлата. Этот затопленный объект привлекает как начинающих, так и опытных дайверов, благодаря своему историческому значению, увлекательной подводной жизни и доступности для погружений. <b>Сатиль</b> был одним из ракетных катеров класса Саар-3, служивших в ВМС Израиля, и участвовал в защите страны на протяжении многих лет. В 1994 году его намеренно затопили для создания искусственного рифа, который с тех пор стал домом для множества морских обитателей и местом притяжения для дайверов со всего мира.</p><p>Погружение на Сатиль открывает перед вами удивительный мир. Корпус корабля уже частично оброс кораллами, вокруг которого снуют рыбы. Внутри судна вы сможете исследовать различные помещения, включая капитанский мостик и машинное отделение, что создаёт ощущение настоящего приключения.</p><p>Корабль лежит <b>на глубине от 18 до 24 метров</b>, что делает его доступным для дайверов разного уровня подготовки. Для начинающих это отличная возможность почувствовать себя исследователем подводных тайн, а для опытных — шанс попрактиковать навыки проникновения в затонувшие объекты.</p>"}	1	\N	\N	2025-03-23 19:25:40.794	\N	\N	c37b1d3b-8f80-4402-855f-3747181bd1cf
117c413a-166f-4dad-8585-708753979737	\N	Paradise	{"he": "Paradise", "ru": "Paradise"}	Paradise Gardens on the shores of Eilat	{"he": "גני עדן על חופי אילת", "ru": "Райские сады у берегов Эйлата"}	<p>The &quot;Paradise Gardens&quot; is one of the most beautiful diving sites in Israel, located northeast of the sunken ship <b>Satil</b>. This dive site is quite deep and far from the shore, making it accessible only to experienced divers. Here you can see a variety of corals and diverse marine life. During the dive, we recommend carefully monitoring no-decompression limits and air consumption, especially in strong current conditions.</p>	{"he": "<p>&quot;גני עדן&quot; הוא אחד מאתרי הצלילה היפים ביותר בישראל, הממוקם צפונית-מזרחית לספינה הטבועה <b>סטיל</b>. אתר צלילה זה נמצא בעומק רב ומרוחק מהחוף, מה שהופך אותו לנגיש רק לצוללנים מנוסים. כאן תוכלו לראות מגוון רחב של אלמוגים וחיים ימיים עשירים. במהלך הצלילה, אנו ממליצים לעקוב בקפידה אחר גבולות הדקומפרסיה וצריכת האוויר, במיוחד בתנאי זרם חזק.</p>", "ru": "<p>Райские сады - это одно из самых красивых мест для дайвинга в Израиле, расположенное к северо-востоку от затопленного корабля <b>Сатиль</b>. Этот дайв-сайт располагается довольно глубоко и далеко от берега, что делает его посещение доступным только для опытных дайверов. Здесь вы сможете увидеть множество различных кораллов и разнообразную морскую жизнь. Во время погружения рекомендуем внимательно следить за бездекомпрессионными пределами и за расходом воздуха, особенно в условиях сильного течения.</p>"}	3	\N	\N	2025-03-23 19:26:40.859	\N	\N	117c413a-166f-4dad-8585-708753979737
7d74f2b1-f9d5-40f4-adc0-011586aea0f7	\N	Coral Reef Reserve	{"he": "שמורת האלמוגים", "ru": "Коралловый заповедник"}	A pleasant stroll for underwater explorers	{"he": "טיול נעים לחוקרים תת-ימיים", "ru": "Приятная прогулка для подводных исследователей"}	<p>The Coral Nature Reserve in Eilat in the Red Sea is a true treasure for divers of various certifications. Stretching over a distance of about 4 kilometers, this unique stretch of coastline offers excellent opportunities for underwater walks in pleasant company. Here you can enjoy a variety of corals preserved in their pristine beauty and encounter numerous marine creatures - vibrant Red Sea fish, moray eels, sea snakes, octopuses, eagle rays, and sometimes even whale sharks.</p>	{"he": "<p>שמורת האלמוגים באילת בים האדום היא אוצר אמיתי עבור צוללנים בעלי הסמכות שונות. המתחם הייחודי הזה של קו החוף, הנמתח לאורך של כ-4 קילומטרים, מציע הזדמנויות מצוינות להליכות תת-ימיות בחברה נעימה. כאן תוכלו ליהנות ממגוון אלמוגים השמורים ביופיים הטבעי ולפגוש יצורים ימיים רבים - דגים צבעוניים של הים האדום, צלופחי מורנה, נחשי ים, תמנונים, טריגונים ולעיתים אפילו כרישי לווייתן.</p>", "ru": "<p>Коралловый заповедник в Эйлате в Красном море - это истинное сокровище для дайверов самых разных сертификаций. Протянувшись на расстояние порядка 4 километров, этот уникальный участок побережья предлагает великолепные возможности для подводных прогулок в приятной компании. Здесь можно насладиться разнообразными видами кораллов, сохранившимися в своей первозданной красоте и встретить множество морских обитателей - ярких красноморских рыб, мурен, змей, осьминогов, орляков, и иногда даже китовых акул.</p>"}	4	\N	\N	2025-03-23 19:28:03.134	\N	\N	7d74f2b1-f9d5-40f4-adc0-011586aea0f7
65de4e6f-caf5-48c6-b0bd-f888ee049fb5	\N	The sunken boat Yatush	{"he": "הסירה הטבועה יאטוש", "ru": "Затопленный катер Ятуш"}	A deep dive into the history of a small vessel	{"he": "צלילה עמוקה אל תולדותיה של ספינה קטנה", "ru": "Затопленный катер Ятуш"}	<p>One of the most impressive underwater objects in Eilat for divers is the Israeli Navy patrol boat - <b>Yatush</b>. The history of this vessel dates back to the Vietnam War, when it served as a patrol boat in the American fleet. After the withdrawal of US troops from Vietnam, the boat was transferred to Israel along with other military equipment. In the 1980s, the <b>Yatush</b> was sunk off the coast of Eilat and became a popular site for recreational diving.</p>	{"he": "<p>אחד מהאובייקטים התת-ימיים המרשימים ביותר באילת עבור צוללנים הוא סירת הסיור של חיל הים הישראלי - <b>יטוש</b>. ההיסטוריה של כלי השיט הזה חוזרת לימי מלחמת וייטנאם, אז שימש כסירת סיור בצי האמריקאי. לאחר נסיגת כוחות ארה&quot;ב מווייטנאם, הסירה הועברה לישראל יחד עם ציוד צבאי נוסף. בשנות ה-80, <b>יטוש</b> הוטבע מול חופי אילת והפך לאתר פופולרי לצלילה חובבנית.</p>", "ru": "<p>Одним из самых впечатляющих подводных объектов Эйлата для дайверов стал патрульный катер ВМФ Израиля - <b>Ятуш</b>. История этого судна уходит во времена Вьетнамской войны, когда он служил патрульным катером в составе американского флота. После вывода войск США из Вьетнама катер был передан Израилю вместе с другими образцами военной техники. В 80-х годах <b>Ятуш</b> был затоплен у берегов Эйлата и стал популярным объектом для любительских погружений.</p>"}	2	\N	\N	2025-03-23 19:27:10.716	\N	\N	65de4e6f-caf5-48c6-b0bd-f888ee049fb5
\.


--
-- Data for Name: excursions_features; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.excursions_features (id, description, description_locales, "position", created_at, updated_at, deleted_at, excursion_id) FROM stdin;
\.


--
-- Data for Name: excursions_inclusions; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.excursions_inclusions (id, description, description_locales, "position", created_at, updated_at, deleted_at, excursion_id) FROM stdin;
\.


--
-- Data for Name: excursions_suggestions; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.excursions_suggestions (id, description, description_locales, "position", created_at, updated_at, deleted_at, excursion_id) FROM stdin;
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.languages (id, code, display_name, display_name_locales, image_url, created_at, updated_at, deleted_at) FROM stdin;
en	\N	English	{"he": "אנגלית", "ru": "Английский"}	\N	2025-03-19 07:29:03.285	\N	\N
ru	\N	Russian	{"he": "רוסית", "ru": "Русский"}	\N	2025-03-19 07:30:29.824	\N	\N
he	\N	Hebrew	{"he": "עברית", "ru": "Иврит"}	\N	2025-03-19 07:32:13.34	\N	\N
\.


--
-- Data for Name: locales; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.locales (language_id, is_default, created_at, updated_at, deleted_at) FROM stdin;
en	t	2025-03-19 07:48:03.548	\N	\N
ru	f	2025-03-19 07:48:03.552	\N	\N
he	f	2025-03-19 07:48:03.553	\N	\N
\.


--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.prices (id, product_id, currency_id, start_date, end_date, comment, created_at, updated_at, deleted_at, price_mode, price_type, value) FROM stdin;
d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:06:55.024	\N	\N	exact	sale	10.00
1cd9500c-6f9a-4548-a201-10806064907a	1cd9500c-6f9a-4548-a201-10806064907a	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:08:10.964	\N	\N	exact	sale	10.00
ad59d289-445d-44c0-8d16-4d5a4b4c07a9	ad59d289-445d-44c0-8d16-4d5a4b4c07a9	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:09:25.753	\N	\N	from	sale	10.00
a6aeacf5-0965-407c-bb76-364b70c305ce	a6aeacf5-0965-407c-bb76-364b70c305ce	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:10:33.823	\N	\N	from	sale	10.00
cf89c5e0-686e-4618-8f9d-dca9d1b581dd	cf89c5e0-686e-4618-8f9d-dca9d1b581dd	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:12:00.185	\N	\N	from	sale	10.00
74cb0b1c-2b55-4ba3-999b-1d11eaea7090	74cb0b1c-2b55-4ba3-999b-1d11eaea7090	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:13:29.26	\N	\N	from	sale	10.00
c3469351-41c4-49c4-b6c5-86ddceb9c682	c3469351-41c4-49c4-b6c5-86ddceb9c682	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:17:49.161	\N	\N	from	sale	10.00
3300642f-ef1b-40df-a23e-281e539d8ffa	3300642f-ef1b-40df-a23e-281e539d8ffa	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:15:40.974	\N	\N	from	sale	10.00
bd756af4-3819-437c-abd4-10387397d31e	bd756af4-3819-437c-abd4-10387397d31e	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:20:01.251	\N	\N	from	sale	10.00
3d6a4801-136a-4415-a05e-f4ec3747d15c	3d6a4801-136a-4415-a05e-f4ec3747d15c	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:20:46.618	\N	\N	from	sale	10.00
c37b1d3b-8f80-4402-855f-3747181bd1cf	c37b1d3b-8f80-4402-855f-3747181bd1cf	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:32:56.15	\N	\N	exact	sale	10.00
117c413a-166f-4dad-8585-708753979737	117c413a-166f-4dad-8585-708753979737	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:33:40.15	\N	\N	exact	sale	10.00
65de4e6f-caf5-48c6-b0bd-f888ee049fb5	65de4e6f-caf5-48c6-b0bd-f888ee049fb5	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:34:34.605	\N	\N	exact	sale	10.00
7d74f2b1-f9d5-40f4-adc0-011586aea0f7	7d74f2b1-f9d5-40f4-adc0-011586aea0f7	ILS	2025-01-01 00:00:00	2030-12-31 00:00:00	\N	2025-03-24 07:35:11.57	\N	\N	exact	sale	10.00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.products (id, code, display_name, display_name_locales, description, description_locales, "position", image_url, is_service, created_at, updated_at, deleted_at, product_group_id) FROM stdin;
c37b1d3b-8f80-4402-855f-3747181bd1cf	\N	The sunken ship "Satil"	{"he": "הספינה הטבועה סאטיל", "ru": "Затопленный корабль Сатиль"}	\N	\N	1	\N	t	2025-03-19 17:01:01.944	\N	\N	7d61b062-d1e8-43df-9551-64f15eade67e
117c413a-166f-4dad-8585-708753979737	\N	Paradise	{"he": "Paradise", "ru": "Paradise"}	\N	\N	2	\N	t	2025-03-19 17:03:32.997	\N	\N	7d61b062-d1e8-43df-9551-64f15eade67e
65de4e6f-caf5-48c6-b0bd-f888ee049fb5	\N	The sunken boat Yatush	{"he": "הסירה הטבועה יאטוש", "ru": "Затопленный катер Ятуш"}	\N	\N	3	\N	t	2025-03-19 17:06:26.569	\N	\N	7d61b062-d1e8-43df-9551-64f15eade67e
7d74f2b1-f9d5-40f4-adc0-011586aea0f7	\N	Coral reef reserve	{"he": "שמורת האלמוגים", "ru": "Коралловый заповедник"}	\N	\N	4	\N	t	2025-03-19 17:08:55.752	\N	\N	7d61b062-d1e8-43df-9551-64f15eade67e
645e94a4-cd7d-4ecb-b6bd-9a5d4546447d	\N	Divemaster Leader Course	{"he": "Divemaster Leader קןרס", "ru": "Курс Divemaster Leader"}	\N	\N	2	\N	t	2025-03-19 12:09:17.961	\N	\N	8b19c170-9210-406b-804a-105b86441097
c7859326-a86e-456f-b2d7-549a14f37624	\N	Assistant Dive Instructor	{"he": "Assistant Dive Instructor קןרס", "ru": "Курс Assistant Dive Instructor"}	\N	\N	3	\N	t	2025-03-19 12:10:50.883	\N	\N	8b19c170-9210-406b-804a-105b86441097
d4e7a9b3-5c2f-48f1-9d8a-6b3c7e1f25a4	\N	Introductory Dive	{"he": "צלילת היכרות", "ru": "Ознакомительное погружение"}	\N	\N	1	\N	t	2025-03-19 10:17:28.009	\N	\N	d3f450bf-b0c5-4361-98b8-7593d746c7dc
1cd9500c-6f9a-4548-a201-10806064907a	\N	Discover Scuba Diving	{"he": "גילוי צלילה", "ru": "Discover Scuba Diving"}	\N	\N	2	\N	t	2025-03-19 10:29:34.961	\N	\N	d3f450bf-b0c5-4361-98b8-7593d746c7dc
3d6a4801-136a-4415-a05e-f4ec3747d15c	\N	Wreck Diver	{"he": "Wreck Diver", "ru": "Wreck Diver"}	\N	\N	2	\N	t	2025-03-19 11:04:41.225	\N	\N	bf1ab13b-75fe-4285-b99f-bddce41246cd
bd756af4-3819-437c-abd4-10387397d31e	\N	Deep Diver	{"he": "Deep Diver", "ru": "Deep Diver"}	\N	\N	1	\N	t	2025-03-19 11:03:13.117	\N	\N	bf1ab13b-75fe-4285-b99f-bddce41246cd
74cb0b1c-2b55-4ba3-999b-1d11eaea7090	\N	Rescue Diver Course	{"he": "קןרס הצלה", "ru": "Курс Rescue Diver"}	\N	\N	4	\N	t	2025-03-19 10:46:03.556	\N	\N	91292509-2c5d-46ba-b158-67290afe21ab
3300642f-ef1b-40df-a23e-281e539d8ffa	\N	Emergency First Response	{"he": "Emergency First Response קורס", "ru": "Курс Emergency First Response"}	\N	\N	5	\N	t	2025-03-19 10:47:23.087	\N	\N	91292509-2c5d-46ba-b158-67290afe21ab
2d82a681-f8e7-4025-b323-7af13b6d525c	\N	Divemaster Course	{"he": "Divemaster קןרס", "ru": "Курс Divemaster"}	\N	\N	1	\N	t	2025-03-19 11:07:13.425	\N	\N	8b19c170-9210-406b-804a-105b86441097
cf89c5e0-686e-4618-8f9d-dca9d1b581dd	\N	Open Water Diver + Advanced Open Water Diver	{"he": "Open Water Diver + Advanced Open Water Diver קורס", "ru": "Курс Open Water Diver + Advanced Open Water Diver"}	\N	\N	3	\N	t	2025-03-19 10:40:42.8	\N	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b
ad59d289-445d-44c0-8d16-4d5a4b4c07a9	\N	Open Water Diver Course	{"he": "Open Water Diver קורס", "ru": "Курс Open Water Diver"}	\N	\N	1	\N	t	2025-03-19 10:35:03.375	\N	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b
a6aeacf5-0965-407c-bb76-364b70c305ce	\N	Advanced Open Water Diver Course	{"he": "Advanced Open Water Diver קורס", "ru": "Курс Advanced Open Water Diver"}	\N	\N	2	\N	t	2025-03-19 10:37:08.7	\N	\N	50f9f9e4-948a-4453-a189-5a1114b3f42b
c3469351-41c4-49c4-b6c5-86ddceb9c682	\N	Night Diver	{"he": "Night Diver", "ru": "Night Diver"}	\N	\N	2	\N	t	2025-03-19 11:00:36.485	\N	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84
e6c1b124-5f50-44ba-8018-5b382ba65763	\N	Enriched Air Diver	{"he": "Enriched Air Diver"}	\N	\N	1	\N	t	2025-03-19 10:58:30.731	\N	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84
2e2b0efd-364e-47bf-b66f-0edbe4c1308f	\N	Dry Suit Diver	{"he": "Dry Suit Diver", "ru": "Dry Suit Diver"}	\N	\N	3	\N	t	2025-03-19 11:01:33.84	\N	\N	020c140b-a88f-4fe5-9ad9-9ab0b0609c84
\.


--
-- Data for Name: products_groups; Type: TABLE DATA; Schema: public; Owner: pantarei
--

COPY public.products_groups (id, code, display_name, display_name_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
d3f450bf-b0c5-4361-98b8-7593d746c7dc	\N	Start Diving	{"he": "תתחיל לצלול", "ru": "Начни нырять"}	1	2025-03-19 09:44:45.813	\N	\N
50f9f9e4-948a-4453-a189-5a1114b3f42b	\N	Become a diver	{"he": "תהפוך לצוללן", "ru": "Стань дайвером"}	2	2025-03-19 09:46:25.321	\N	\N
91292509-2c5d-46ba-b158-67290afe21ab	\N	Keep learning	{"he": "תמשיך ללמוד", "ru": "Продолжай учиться"}	3	2025-03-19 09:48:15.073	\N	\N
020c140b-a88f-4fe5-9ad9-9ab0b0609c84	\N	Develop specializations	{"he": "פתח התמחויות", "ru": "Развивай специализации"}	4	2025-03-19 09:53:35.702	\N	\N
bf1ab13b-75fe-4285-b99f-bddce41246cd	\N	Expand the limits	{"he": "הרחב את הגבולות", "ru": "Расширяй пределы"}	5	2025-03-19 09:55:27.216	\N	\N
8b19c170-9210-406b-804a-105b86441097	\N	Become a professional	{"he": "תהפוך למקצוען", "ru": "Стань профессионалом"}	6	2025-03-19 09:57:51.121	\N	\N
7d61b062-d1e8-43df-9551-64f15eade67e	\N	Underwater excursions	{"he": "מודרכות צלילה", "ru": "Подводные экскурсии"}	7	2025-03-19 16:55:44.398	\N	\N
\.


--
-- Name: clients_preorders clients_preorders_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.clients_preorders
    ADD CONSTRAINT clients_preorders_pkey PRIMARY KEY (id);


--
-- Name: courses_features courses_features_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_features
    ADD CONSTRAINT courses_features_pkey PRIMARY KEY (id);


--
-- Name: courses_groups courses_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_groups
    ADD CONSTRAINT courses_groups_pkey PRIMARY KEY (id);


--
-- Name: courses_inclusions courses_inclusions_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_inclusions
    ADD CONSTRAINT courses_inclusions_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: courses_suggestions courses_suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_suggestions
    ADD CONSTRAINT courses_suggestions_pkey PRIMARY KEY (id);


--
-- Name: currencies currencies_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);


--
-- Name: excursions_features excursions_features_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_features
    ADD CONSTRAINT excursions_features_pkey PRIMARY KEY (id);


--
-- Name: excursions_inclusions excursions_inclusions_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_inclusions
    ADD CONSTRAINT excursions_inclusions_pkey PRIMARY KEY (id);


--
-- Name: excursions excursions_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions
    ADD CONSTRAINT excursions_pkey PRIMARY KEY (id);


--
-- Name: excursions_suggestions excursions_suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_suggestions
    ADD CONSTRAINT excursions_suggestions_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: locales locales_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.locales
    ADD CONSTRAINT locales_pkey PRIMARY KEY (language_id);


--
-- Name: prices prices_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_pkey PRIMARY KEY (id);


--
-- Name: products_groups products_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.products_groups
    ADD CONSTRAINT products_groups_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: courses_code_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX courses_code_key ON public.courses USING btree (code);


--
-- Name: courses_groups_code_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX courses_groups_code_key ON public.courses_groups USING btree (code);


--
-- Name: excursions_code_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX excursions_code_key ON public.excursions USING btree (code);


--
-- Name: locales_language_id_is_default_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX locales_language_id_is_default_key ON public.locales USING btree (language_id, is_default);


--
-- Name: products_code_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX products_code_key ON public.products USING btree (code);


--
-- Name: products_groups_code_key; Type: INDEX; Schema: public; Owner: pantarei
--

CREATE UNIQUE INDEX products_groups_code_key ON public.products_groups USING btree (code);


--
-- Name: clients_preorders clients_preorders_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.clients_preorders
    ADD CONSTRAINT clients_preorders_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(language_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: clients_preorders clients_preorders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.clients_preorders
    ADD CONSTRAINT clients_preorders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: courses courses_course_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_course_group_id_fkey FOREIGN KEY (course_group_id) REFERENCES public.courses_groups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: courses_features courses_features_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_features
    ADD CONSTRAINT courses_features_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses_inclusions courses_inclusions_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_inclusions
    ADD CONSTRAINT courses_inclusions_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: courses_suggestions courses_suggestions_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.courses_suggestions
    ADD CONSTRAINT courses_suggestions_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: excursions_features excursions_features_excursion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_features
    ADD CONSTRAINT excursions_features_excursion_id_fkey FOREIGN KEY (excursion_id) REFERENCES public.excursions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: excursions_inclusions excursions_inclusions_excursion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_inclusions
    ADD CONSTRAINT excursions_inclusions_excursion_id_fkey FOREIGN KEY (excursion_id) REFERENCES public.excursions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: excursions excursions_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions
    ADD CONSTRAINT excursions_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: excursions_suggestions excursions_suggestions_excursion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.excursions_suggestions
    ADD CONSTRAINT excursions_suggestions_excursion_id_fkey FOREIGN KEY (excursion_id) REFERENCES public.excursions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: locales locales_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.locales
    ADD CONSTRAINT locales_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: prices prices_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES public.currencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: prices prices_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_product_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantarei
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_product_group_id_fkey FOREIGN KEY (product_group_id) REFERENCES public.products_groups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pantarei
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

