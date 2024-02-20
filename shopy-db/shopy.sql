--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14 (Debian 13.14-1.pgdg120+2)
-- Dumped by pg_dump version 13.13

-- Started on 2024-02-20 09:57:50 UTC

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: cart; Type: TABLE; Schema: public; Owner: shopy
--

CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    cart_user_id integer NOT NULL,
    cart_products json NOT NULL,
    cart_updated_dt date NOT NULL
);


ALTER TABLE public.cart OWNER TO shopy;

--
-- TOC entry 201 (class 1259 OID 16391)
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: shopy
--

ALTER TABLE public.cart ALTER COLUMN cart_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483627
    CACHE 1
);


--
-- TOC entry 202 (class 1259 OID 16393)
-- Name: categories; Type: TABLE; Schema: public; Owner: shopy
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name text NOT NULL,
    category_description text NOT NULL
);


ALTER TABLE public.categories OWNER TO shopy;

--
-- TOC entry 203 (class 1259 OID 16399)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: shopy
--

ALTER TABLE public.categories ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483627
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16401)
-- Name: product_reviews; Type: TABLE; Schema: public; Owner: shopy
--

CREATE TABLE public.product_reviews (
    review_id integer NOT NULL,
    review_user_id integer NOT NULL,
    review_product_id integer NOT NULL,
    review_score integer NOT NULL,
    review_message text NOT NULL,
    review_date date NOT NULL
);


ALTER TABLE public.product_reviews OWNER TO shopy;

--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: product_reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: shopy
--

ALTER TABLE public.product_reviews ALTER COLUMN review_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16409)
-- Name: products; Type: TABLE; Schema: public; Owner: shopy
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_image text NOT NULL,
    product_description text NOT NULL,
    product_stock numeric NOT NULL,
    product_stock_total numeric NOT NULL,
    product_modifiers json,
    product_added_dt date NOT NULL,
    product_update_dt date NOT NULL,
    product_category_id integer NOT NULL,
    product_price integer NOT NULL
);


ALTER TABLE public.products OWNER TO shopy;

--
-- TOC entry 207 (class 1259 OID 16415)
-- Name: users; Type: TABLE; Schema: public; Owner: shopy
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_firstname text NOT NULL,
    user_lastname text NOT NULL,
    user_password text NOT NULL,
    user_avatar text NOT NULL,
    user_location json NOT NULL,
    user_email text NOT NULL,
    user_phone text NOT NULL
);


ALTER TABLE public.users OWNER TO shopy;

--
-- TOC entry 208 (class 1259 OID 16421)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: shopy
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483627
    CACHE 1
);


--
-- TOC entry 3047 (class 0 OID 16385)
-- Dependencies: 200
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: shopy
--



--
-- TOC entry 3049 (class 0 OID 16393)
-- Dependencies: 202
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: shopy
--

INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (3, 'electronics', 'products related to electronics');
INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (4, 'jewelery', 'products related to jewelery');
INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (5, 'men''s clothing', 'products related to men''s clothing');
INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (6, 'women''s clothing', 'products related to women''s clothing');


--
-- TOC entry 3051 (class 0 OID 16401)
-- Dependencies: 204
-- Data for Name: product_reviews; Type: TABLE DATA; Schema: public; Owner: shopy
--



--
-- TOC entry 3053 (class 0 OID 16409)
-- Dependencies: 206
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: shopy
--



--
-- TOC entry 3054 (class 0 OID 16415)
-- Dependencies: 207
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: shopy
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (2, 'Ana', 'López', 'pass5678', 'https://example.com/avatar4.jpg', '{"city": "Ciudad4", "postalCode": "40004", "lat": 48.8566, "lng": 2.3522, "street": "Calle 4", "streetNumber": "1011"}', 'ana@example.com', '789-012-3456');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (3, 'Pedro', 'Sánchez', 'pass4321', 'https://example.com/avatar5.jpg', '{"city": "Ciudad5", "postalCode": "50005", "lat": -33.8688, "lng": 151.2093, "street": "Calle 5", "streetNumber": "1213"}', 'pedro@example.com', '012-345-6789');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (4, 'Laura', 'Rodríguez', 'pass8765', 'https://example.com/avatar6.jpg', '{"city": "Ciudad6", "postalCode": "60006", "lat": -22.9068, "lng": -43.1729, "street": "Calle 6", "streetNumber": "1415"}', 'laura@example.com', '321-654-9870');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (5, 'Javier', 'Fernández', 'pass2468', 'https://example.com/avatar7.jpg', '{"city": "Ciudad7", "postalCode": "70007", "lat": 35.6895, "lng": 139.6917, "street": "Calle 7", "streetNumber": "1617"}', 'javier@example.com', '654-987-0123');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (6, 'Sofía', 'Gómez', 'pass1357', 'https://example.com/avatar8.jpg', '{"city": "Ciudad8", "postalCode": "80008", "lat": 55.7558, "lng": 37.6176, "street": "Calle 8", "streetNumber": "1819"}', 'sofia@example.com', '987-012-3456');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (7, 'Diego', 'Hernández', 'pass3579', 'https://example.com/avatar9.jpg', '{"city": "Ciudad9", "postalCode": "90009", "lat": 40.4168, "lng": -3.7038, "street": "Calle 9", "streetNumber": "2021"}', 'diego@example.com', '210-987-6543');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (8, 'Lucía', 'Díaz', 'pass5791', 'https://example.com/avatar10.jpg', '{"city": "Ciudad10", "postalCode": "10010", "lat": 41.9028, "lng": 12.4964, "street": "Calle 10", "streetNumber": "2223"}', 'lucia@example.com', '543-210-9876');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (9, 'Alejandro', 'Moreno', 'pass7913', 'https://example.com/avatar11.jpg', '{"city": "Ciudad11", "postalCode": "11011", "lat": 22.3193, "lng": 114.1694, "street": "Calle 11", "streetNumber": "2425"}', 'alejandro@example.com', '876-543-2109');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (10, 'Elena', 'Muñoz', 'pass9135', 'https://example.com/avatar12.jpg', '{"city": "Ciudad12", "postalCode": "12012", "lat": -33.4489, "lng": -70.6693, "street": "Calle 12", "streetNumber": "2627"}', 'elena@example.com', '109-876-5432');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (11, 'Adrián', 'Jiménez', 'pass1357', 'https://example.com/avatar13.jpg', '{"city": "Ciudad13", "postalCode": "13013", "lat": 51.5074, "lng": -0.1278, "street": "Calle 13", "streetNumber": "2829"}', 'adrian@example.com', '432-109-8765');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (12, 'Isabel', 'Silva', 'pass3579', 'https://example.com/avatar14.jpg', '{"city": "Ciudad14", "postalCode": "14014", "lat": 48.8566, "lng": 2.3522, "street": "Calle 14", "streetNumber": "3031"}', 'isabel@example.com', '765-432-1098');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (13, 'David', 'Ramos', 'pass5791', 'https://example.com/avatar15.jpg', '{"city": "Ciudad15", "postalCode": "15015", "lat": -33.8688, "lng": 151.2093, "street": "Calle 15", "streetNumber": "3233"}', 'david@example.com', '098-765-4321');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (1, 'Carlos', 'Martínez', '$2b$10$OTOhsM2bD.wMpOaioU.xNOKeHiGL81gcqtOmICRzKhOwm1.6qTvFq', 'https://example.com/avatar3.jpg', '{"city": "Ciudad3", "postalCode": "30003", "lat": 51.5074, "lng": -0.1278, "street": "Calle 3", "streetNumber": "789"}', 'carlos@example.com', '456-789-0123');


--
-- TOC entry 3061 (class 0 OID 0)
-- Dependencies: 201
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopy
--

SELECT pg_catalog.setval('public.cart_cart_id_seq', 1, false);


--
-- TOC entry 3062 (class 0 OID 0)
-- Dependencies: 203
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopy
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 6, true);


--
-- TOC entry 3063 (class 0 OID 0)
-- Dependencies: 205
-- Name: product_reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopy
--

SELECT pg_catalog.setval('public.product_reviews_review_id_seq', 1, false);


--
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopy
--

SELECT pg_catalog.setval('public.users_user_id_seq', 13, true);


--
-- TOC entry 2904 (class 2606 OID 16424)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- TOC entry 2906 (class 2606 OID 16426)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 2908 (class 2606 OID 16428)
-- Name: product_reviews product_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 2910 (class 2606 OID 16430)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 2912 (class 2606 OID 16432)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2916 (class 2606 OID 16433)
-- Name: products category_id; Type: FK CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT category_id FOREIGN KEY (product_category_id) REFERENCES public.categories(category_id) NOT VALID;


--
-- TOC entry 2914 (class 2606 OID 16438)
-- Name: product_reviews product_id; Type: FK CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_id FOREIGN KEY (review_product_id) REFERENCES public.products(product_id) NOT VALID;


--
-- TOC entry 2913 (class 2606 OID 16443)
-- Name: cart user_id; Type: FK CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT user_id FOREIGN KEY (cart_user_id) REFERENCES public.users(user_id) NOT VALID;


--
-- TOC entry 2915 (class 2606 OID 16448)
-- Name: product_reviews user_id; Type: FK CONSTRAINT; Schema: public; Owner: shopy
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT user_id FOREIGN KEY (review_user_id) REFERENCES public.users(user_id) NOT VALID;


-- Completed on 2024-02-20 09:57:50 UTC

--
-- PostgreSQL database dump complete
--

