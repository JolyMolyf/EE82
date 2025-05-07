# Schemat bazy danych PostgreSQL dla Cars Home - MVP

## 1. Tabele

### Tabela: `cars`
Główna tabela przechowująca informacje o samochodach.

| Kolumna | Typ | Ograniczenia | Opis |
|---------|-----|-------------|------|
| id | SERIAL | PRIMARY KEY | Unikalny identyfikator samochodu |
| brand | VARCHAR(100) | NOT NULL | Marka samochodu |
| model | VARCHAR(100) | NOT NULL | Model samochodu |
| generation | VARCHAR(100) | | Generacja modelu |
| year | INTEGER | NOT NULL, CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1) | Rok produkcji |
| price | DECIMAL(12, 2) | NOT NULL, CHECK (price > 0) | Cena podstawowa |
| promotion_price | DECIMAL(12, 2) | CHECK (promotion_price > 0 AND promotion_price < price) | Cena promocyjna (jeśli dostępna) |
| vin | VARCHAR(17) | UNIQUE | Numer identyfikacyjny pojazdu (VIN) |
| mileage | INTEGER | NOT NULL, CHECK (mileage >= 0) | Przebieg w kilometrach |
| engine_power | INTEGER | CHECK (engine_power > 0) | Moc silnika w KM |
| fuel_type | VARCHAR(50) | NOT NULL | Rodzaj paliwa |
| transmission_type | VARCHAR(50) | NOT NULL | Rodzaj skrzyni biegów |
| engine_capacity | INTEGER | CHECK (engine_capacity > 0) | Pojemność silnika w cm³ |
| technical_inspection_date | DATE | | Data ważności badania technicznego |
| color | VARCHAR(50) | NOT NULL | Kolor samochodu |
| description | TEXT | | Szczegółowy opis samochodu |
| is_new | BOOLEAN | NOT NULL, DEFAULT FALSE | Czy samochód jest nowy |
| status | VARCHAR(20) | NOT NULL, CHECK (status IN ('active', 'archived')), DEFAULT 'active' | Status oferty |
| category_id | INTEGER | NOT NULL, REFERENCES car_categories(id) | Odniesienie do kategorii |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data utworzenia oferty |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data ostatniej aktualizacji |
| view_count | INTEGER | NOT NULL, DEFAULT 0, CHECK (view_count >= 0) | Licznik wyświetleń |
| is_promoted | BOOLEAN | NOT NULL, DEFAULT FALSE | Czy oferta jest promowana na stronie głównej |
| images | VARCHAR(255)[] | | Tablica URL-i do zdjęć samochodu |
| car_main_image | JSONB | | Główne zdjęcie samochodu w formacie media |

### Tabela: `car_categories`
Kategorie samochodów (np. kompakt, SUV, crossover).

| Kolumna | Typ | Ograniczenia | Opis |
|---------|-----|-------------|------|
| id | SERIAL | PRIMARY KEY | Unikalny identyfikator kategorii |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Nazwa kategorii |
| description | TEXT | | Opis kategorii |

### Tabela: `administrators`
Konta administratorów systemu.

| Kolumna | Typ | Ograniczenia | Opis |
|---------|-----|-------------|------|
| id | SERIAL | PRIMARY KEY | Unikalny identyfikator administratora |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Adres email (login) |
| password_hash | VARCHAR(255) | NOT NULL | Haszowane hasło |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data utworzenia konta |

### Tabela: `financing_parameters`
Parametry finansowania dostępne w systemie.

| Kolumna | Typ | Ograniczenia | Opis |
|---------|-----|-------------|------|
| id | SERIAL | PRIMARY KEY | Unikalny identyfikator parametru |
| financing_type | VARCHAR(20) | NOT NULL, CHECK (financing_type IN ('credit', 'leasing')) | Typ finansowania |
| period_months | INTEGER | NOT NULL, CHECK (period_months IN (6, 12, 24, 36)) | Okres finansowania w miesiącach |
| interest_rate | DECIMAL(5, 2) | NOT NULL, CHECK (interest_rate >= 0) | Oprocentowanie (RRSO) |
| min_down_payment_percentage | DECIMAL(5, 2) | NOT NULL, CHECK (min_down_payment_percentage >= 0 AND min_down_payment_percentage <= 100), DEFAULT 15 | Minimalny procent wpłaty własnej |
| insurance_monthly_cost | DECIMAL(10, 2) | NOT NULL, CHECK (insurance_monthly_cost >= 0), DEFAULT 0 | Miesięczny koszt ubezpieczenia |
| additional_monthly_costs | DECIMAL(10, 2) | NOT NULL, CHECK (additional_monthly_costs >= 0), DEFAULT 0 | Miesięczne koszty dodatkowe |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data ostatniej aktualizacji |

## 2. Relacje między tabelami

1. `cars` (jeden) → `car_categories` (wiele): Każdy samochód należy do jednej kategorii.

## 3. Indeksy

### Indeksy dla tabeli `cars`
```sql
CREATE INDEX idx_cars_brand_model ON cars(brand, model);
CREATE INDEX idx_cars_price ON cars(price);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_category_id ON cars(category_id);
CREATE INDEX idx_cars_is_promoted ON cars(is_promoted);
```

### Indeksy dla tabeli `financing_parameters`
```sql
CREATE UNIQUE INDEX idx_financing_parameters_type_period ON financing_parameters(financing_type, period_months);
```

## 4. Zasady PostgreSQL - Row-Level Security (RLS)

### Zabezpieczenie dostępu do tabeli `cars`
```sql
-- Włączenie RLS na tabeli cars
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Zasada umożliwiająca administratorom pełny dostęp
CREATE POLICY admin_all_cars ON cars
    USING (true)
    WITH CHECK (true)
    TO authenticated;

-- Zasada umożliwiająca ogólny dostęp tylko do odczytu aktywnych samochodów
CREATE POLICY public_view_active_cars ON cars
    FOR SELECT
    USING (status = 'active')
    TO public;
```

### Zabezpieczenie dostępu do tabeli `administrators`
```sql
-- Włączenie RLS na tabeli administrators
ALTER TABLE administrators ENABLE ROW LEVEL SECURITY;

-- Zasada umożliwiająca administratorom pełny dostęp
CREATE POLICY admin_all_administrators ON administrators
    USING (true)
    WITH CHECK (true)
    TO authenticated;
```

### Zabezpieczenie dostępu do tabeli `financing_parameters`
```sql
-- Włączenie RLS na tabeli financing_parameters
ALTER TABLE financing_parameters ENABLE ROW LEVEL SECURITY;

-- Zasada umożliwiająca administratorom pełny dostęp
CREATE POLICY admin_all_financing_parameters ON financing_parameters
    USING (true)
    WITH CHECK (true)
    TO authenticated;

-- Zasada umożliwiająca ogólny dostęp tylko do odczytu
CREATE POLICY public_view_financing_parameters ON financing_parameters
    FOR SELECT
    USING (true)
    TO public;
```

## 5. Widoki (Views)

### Widok aktywnych samochodów
```sql
CREATE VIEW active_cars_view AS
SELECT c.*, cat.name AS category_name
FROM cars c
JOIN car_categories cat ON c.category_id = cat.id
WHERE c.status = 'active';
```

### Widok promocyjnych samochodów
```sql
CREATE VIEW promoted_cars_view AS
SELECT c.*, cat.name AS category_name
FROM cars c
JOIN car_categories cat ON c.category_id = cat.id
WHERE c.status = 'active' AND c.is_promoted = true;
```

## 6. Implementacja SQL

```sql
-- Tworzenie tabel
CREATE TABLE car_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    generation VARCHAR(100),
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
    price DECIMAL(12, 2) NOT NULL CHECK (price > 0),
    promotion_price DECIMAL(12, 2) CHECK (promotion_price > 0 AND promotion_price < price),
    vin VARCHAR(17) UNIQUE,
    mileage INTEGER NOT NULL CHECK (mileage >= 0),
    engine_power INTEGER CHECK (engine_power > 0),
    fuel_type VARCHAR(50) NOT NULL,
    transmission_type VARCHAR(50) NOT NULL,
    engine_capacity INTEGER CHECK (engine_capacity > 0),
    technical_inspection_date DATE,
    color VARCHAR(50) NOT NULL,
    description TEXT,
    is_new BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'archived')) DEFAULT 'active',
    category_id INTEGER NOT NULL REFERENCES car_categories(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0),
    is_promoted BOOLEAN NOT NULL DEFAULT FALSE,
    images VARCHAR(255)[] DEFAULT '{}',
    car_main_image JSONB
);

CREATE TABLE administrators (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financing_parameters (
    id SERIAL PRIMARY KEY,
    financing_type VARCHAR(20) NOT NULL CHECK (financing_type IN ('credit', 'leasing')),
    period_months INTEGER NOT NULL CHECK (period_months IN (6, 12, 24, 36)),
    interest_rate DECIMAL(5, 2) NOT NULL CHECK (interest_rate >= 0),
    min_down_payment_percentage DECIMAL(5, 2) NOT NULL CHECK (min_down_payment_percentage >= 0 AND min_down_payment_percentage <= 100) DEFAULT 15,
    insurance_monthly_cost DECIMAL(10, 2) NOT NULL CHECK (insurance_monthly_cost >= 0) DEFAULT 0,
    additional_monthly_costs DECIMAL(10, 2) NOT NULL CHECK (additional_monthly_costs >= 0) DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(financing_type, period_months)
);

-- Tworzenie indeksów
CREATE INDEX idx_cars_brand_model ON cars(brand, model);
CREATE INDEX idx_cars_price ON cars(price);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_category_id ON cars(category_id);
CREATE INDEX idx_cars_is_promoted ON cars(is_promoted);

CREATE UNIQUE INDEX idx_financing_parameters_type_period ON financing_parameters(financing_type, period_months);

-- Tworzenie widoków
CREATE VIEW active_cars_view AS
SELECT c.*, cat.name AS category_name
FROM cars c
JOIN car_categories cat ON c.category_id = cat.id
WHERE c.status = 'active';

CREATE VIEW promoted_cars_view AS
SELECT c.*, cat.name AS category_name
FROM cars c
JOIN car_categories cat ON c.category_id = cat.id
WHERE c.status = 'active' AND c.is_promoted = true;
```
