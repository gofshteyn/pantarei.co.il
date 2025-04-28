TRUNCATE public.products_groups CASCADE;

COPY public.products_groups (id, code, display_name, display_name_locales, "position", created_at, updated_at, deleted_at) FROM stdin;
d3f450bf-b0c5-4361-98b8-7593d746c7dc	\N	Start Diving	{"he": "תתחיל לצלול", "ru": "Начни нырять"}	1	2025-03-19 09:44:45.813	\N	\N
50f9f9e4-948a-4453-a189-5a1114b3f42b	\N	Become a diver	{"he": "תהפוך לצוללן", "ru": "Стань дайвером"}	2	2025-03-19 09:46:25.321	\N	\N
91292509-2c5d-46ba-b158-67290afe21ab	\N	Keep learning	{"he": "תמשיך ללמוד", "ru": "Продолжай учиться"}	3	2025-03-19 09:48:15.073	\N	\N
020c140b-a88f-4fe5-9ad9-9ab0b0609c84	\N	Develop specializations	{"he": "פתח התמחויות", "ru": "Развивай специализации"}	4	2025-03-19 09:53:35.702	\N	\N
bf1ab13b-75fe-4285-b99f-bddce41246cd	\N	Expand the limits	{"he": "הרחב את הגבולות", "ru": "Расширяй пределы"}	5	2025-03-19 09:55:27.216	\N	\N
8b19c170-9210-406b-804a-105b86441097	\N	Become a professional	{"he": "תהפוך למקצוען", "ru": "Стань профессионалом"}	6	2025-03-19 09:57:51.121	\N	\N
7d61b062-d1e8-43df-9551-64f15eade67e	\N	Underwater excursions	{"he": "מודרכות צלילה", "ru": "Подводные экскурсии"}	7	2025-03-19 16:55:44.398	\N	\N
\.

