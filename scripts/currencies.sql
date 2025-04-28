TRUNCATE public.currencies CASCADE;
COPY public.currencies (id, display_name, display_name_locales, symbol, is_default, created_at, updated_at, deleted_at) FROM stdin;
ILS	Israeli Shekel	{"he": "שקל חדש", "ru": "Израильский шекель"}	₪    	t	2025-03-19 07:52:22.818	\N	\N
USD	United States Dollar	{"he": "דולר אמריקאי", "ru": "Доллар США"}	$    	f	2025-03-19 07:56:02.557	\N	\N
EUR	Euro	{"he": "יורו", "ru": "Евро"}	€    	f	2025-03-19 07:57:53.372	\N	\N
\.
