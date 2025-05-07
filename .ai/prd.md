# Dokument wymagań produktu (PRD) - Cars Home

## 1. Przegląd produktu

Cars Home to platforma internetowa umożliwiająca użytkownikom przeglądanie dostępnych samochodów na sprzedaż oraz szybkie obliczanie opcji finansowania (rata miesięczna + harmonogram spłat). Głównym celem platformy jest ułatwienie potencjalnym kupującym procesu poszukiwania i wstępnej oceny finansowej zakupu samochodu.

MVP (Minimum Viable Product) platformy skupia się na podstawowych funkcjonalnościach umożliwiających weryfikację koncepcji biznesowej w czasie jednego tygodnia rozwoju. Aplikacja będzie zbudowana jako responsywna aplikacja webowa, dostępna na urządzeniach mobilnych i stacjonarnych.

Cars Home będzie korzystać z następujących technologii:
- Next.js jako framework frontendowy
- Payload CMS do zarządzania treścią
- ShadcnUI dla spójnych komponentów interfejsu
- Wdrożenie na platformie Vercel dla środowiska MVP

## 2. Problem użytkownika

Potencjalni nabywcy samochodów napotykają kilka kluczowych problemów podczas procesu poszukiwania i zakupu pojazdu:

1. Brak łatwego dostępu do ofert - użytkownicy muszą odwiedzać fizycznie salony/komisy lub przeglądać wiele stron internetowych, aby porównać oferty.
2. Trudność w ocenie możliwości finansowych - kupujący często nie mają łatwego sposobu na sprawdzenie, czy dany samochód mieści się w ich budżecie miesięcznym.
3. Brak przejrzystości w opcjach finansowania - harmonogramy spłat i szczegółowe rozliczenia często nie są dostępne na etapie przeglądania ofert.
4. Czasochłonny proces poszukiwania - bez możliwości filtrowania i sortowania, znalezienie odpowiedniego pojazdu zajmuje dużo czasu.

Cars Home rozwiązuje te problemy poprzez:
- Udostępnienie scentralizowanego katalogu samochodów
- Dostarczenie wbudowanego kalkulatora finansowania z różnymi opcjami
- Generowanie szczegółowego harmonogramu spłat
- Umożliwienie komparacji ofert według ceny

## 3. Wymagania funkcjonalne

### 3.1 Katalog samochodów
- Wyświetlanie listy dostępnych samochodów z podstawowymi informacjami (marka, model, rok, cena)
- Sortowanie według ceny (rosnąco/malejąco)
- Obsługa do 1000 pozycji w katalogu
- Karta szczegółów samochodu z dodatkowymi informacjami
- Responsywny design dla wszystkich rozmiarów ekranów

### 3.2 Panel administratora
- System uwierzytelniania dla administratorów
- Funkcje zarządzania ofertami:
  - Dodawanie nowych samochodów
  - Edycja istniejących ofert
  - Usuwanie nieaktualnych ofert
- Konfiguracja parametrów finansowania:
  - Ustawianie RRSO dla różnych okresów finansowania
  - Definiowanie minimalnych wartości wkładu własnego
  - Określanie dostępnych okresów finansowania

### 3.3 Kalkulator finansowania
- Dostępny na stronach szczegółów poszczególnych samochodów
- Obsługa dwóch typów finansowania: kredyt i leasing
- Parametry wprowadzane przez użytkownika:
  - Wkład własny (minimum 15% wartości pojazdu)
  - Okres finansowania (od 6 do 36 miesięcy)
  - Typ finansowania (kredyt/leasing)
  - Wartość wykupu końcowego (dla leasingu)
- Obliczenia według wzoru rat równych
- Predefiniowane wartości RRSO w zależności od okresu finansowania

### 3.4 Harmonogram płatności
- Szczegółowa tabela pokazująca całościowy plan spłat
- Zawartość harmonogramu:
  - Data płatności każdej raty
  - Pozostały kapitał do spłaty po racie
  - Rozbicie rat na część kapitałową i odsetkową
  - Dodatkowe usługi (opcjonalnie)
- Wyświetlanie na stronie w formie tabeli

## 4. Granice produktu

### 4.1 Funkcje poza zakresem MVP
- Możliwość bezpośredniego zakupu samochodu online
- System płatności i rozliczeń
- Panel klienta i konta użytkowników
- Funkcje wyszukiwania zaawansowanego i filtrowania
- Eksport harmonogramu płatności do PDF lub innych formatów
- Negocjacja ceny lub warunków finansowania online
- Integracja z zewnętrznymi systemami finansowymi
- Obsługa rezerwacji pojazdów
- Historia przeglądanych ofert

### 4.2 Ograniczenia techniczne
- Brak wdrożenia w środowisku Docker na etapie MVP (planowane w przyszłych wersjach)
- Brak zaawansowanych narzędzi analitycznych na etapie MVP
- Proste uwierzytelnianie dla administratorów, bez zaawansowanych funkcji zarządzania dostępem
- Brak zautomatyzowanych testów wydajnościowych

## 5. Historyjki użytkowników

### Przeglądanie ofert

#### US-001: Przeglądanie listy dostępnych samochodów
**Tytuł**: Przeglądanie listy samochodów
**Opis**: Jako potencjalny kupujący chcę przeglądać dostępne samochody, aby znaleźć pojazdy odpowiadające moim preferencjom.
**Kryteria akceptacji**:
- Lista samochodów wyświetla się poprawnie na stronie głównej
- Każda pozycja zawiera zdjęcie, markę, model, rok produkcji i cenę
- Lista działa poprawnie na urządzeniach mobilnych i desktopowych
- Strona ładuje się w czasie poniżej 4 sekund

#### US-002: Sortowanie listy samochodów według ceny
**Tytuł**: Sortowanie ofert według ceny
**Opis**: Jako potencjalny kupujący chcę mieć możliwość sortowania listy samochodów według ceny (rosnąco/malejąco), aby szybciej znaleźć oferty w moim przedziale cenowym.
**Kryteria akceptacji**:
- Na stronie z listą dostępny jest przycisk do sortowania
- Sortowanie działa w dwóch kierunkach: od najtańszych do najdroższych i odwrotnie
- Po sortowaniu lista odświeża się poprawnie
- Stan sortowania jest zachowany przy nawigacji i powrocie do listy

#### US-003: Przeglądanie szczegółów samochodu
**Tytuł**: Przeglądanie szczegółów samochodu
**Opis**: Jako potencjalny kupujący chcę zobaczyć szczegółowe informacje o wybranym samochodzie, aby ocenić, czy spełnia moje oczekiwania.
**Kryteria akceptacji**:
- Po kliknięciu w pozycję na liście, użytkownik jest przekierowany na stronę ze szczegółami
- Strona szczegółów zawiera wszystkie dostępne informacje o samochodzie
- Na stronie szczegółów znajduje się zdjęcie w większym formacie
- Dostępny jest przycisk powrotu do listy wszystkich samochodów

### Kalkulator finansowania

#### US-004: Obliczanie miesięcznej raty kredytu
**Tytuł**: Obliczanie raty kredytu
**Opis**: Jako potencjalny kupujący chcę obliczyć miesięczną ratę kredytu dla wybranego samochodu, aby sprawdzić, czy mieści się w moim budżecie.
**Kryteria akceptacji**:
- Na stronie szczegółów samochodu dostępny jest kalkulator finansowania
- Możliwość wyboru typu finansowania "kredyt"
- Możliwość wprowadzenia wkładu własnego (minimum 15% wartości pojazdu)
- Możliwość wyboru okresu finansowania (6-36 miesięcy)
- Wyświetlenie obliczonej miesięcznej raty kredytu

#### US-005: Obliczanie miesięcznej raty leasingu
**Tytuł**: Obliczanie raty leasingu
**Opis**: Jako potencjalny kupujący chcę obliczyć miesięczną ratę leasingu dla wybranego samochodu, aby porównać tę opcję z kredytem.
**Kryteria akceptacji**:
- Na stronie szczegółów samochodu dostępny jest kalkulator finansowania
- Możliwość wyboru typu finansowania "leasing"
- Możliwość wprowadzenia wkładu własnego (minimum 15% wartości pojazdu)
- Możliwość wyboru okresu finansowania (6-36 miesięcy)
- Możliwość określenia wartości wykupu końcowego
- Wyświetlenie obliczonej miesięcznej raty leasingu

#### US-006: Przeglądanie harmonogramu płatności
**Tytuł**: Przeglądanie harmonogramu płatności
**Opis**: Jako potencjalny kupujący chcę zobaczyć szczegółowy harmonogram płatności dla wybranej opcji finansowania, aby zrozumieć pełne zobowiązanie finansowe.
**Kryteria akceptacji**:
- Po obliczeniu raty miesięcznej, dostępny jest przycisk "Pokaż harmonogram płatności"
- Harmonogram wyświetla tabelę ze wszystkimi planowanymi płatnościami
- Dla każdej raty widoczna jest data płatności, część kapitałowa, część odsetkowa i pozostały kapitał
- Harmonogram jest czytelny zarówno na urządzeniach mobilnych jak i desktopowych

### Panel administratora

#### US-007: Logowanie do panelu administratora
**Tytuł**: Logowanie administratora
**Opis**: Jako administrator chcę zalogować się do panelu administracyjnego, aby zarządzać ofertami samochodów.
**Kryteria akceptacji**:
- Dostępny jest formularz logowania z polami na nazwę użytkownika i hasło
- System weryfikuje poprawność wprowadzonych danych
- Po poprawnym zalogowaniu, administrator jest przekierowany do panelu zarządzania
- W przypadku błędnych danych wyświetlany jest odpowiedni komunikat

#### US-008: Dodawanie nowej oferty samochodu
**Tytuł**: Dodawanie nowej oferty
**Opis**: Jako administrator chcę dodać nowy samochód do systemu, aby klienci mogli zobaczyć aktualny inwentarz.
**Kryteria akceptacji**:
- W panelu administratora dostępny jest formularz dodawania nowego samochodu
- Formularz zawiera pola na wszystkie wymagane informacje (marka, model, rok, cena, itp.)
- Możliwość dodania zdjęcia samochodu
- Po zapisaniu, nowa oferta jest widoczna na liście dostępnych samochodów

#### US-009: Edycja istniejącej oferty samochodu
**Tytuł**: Edycja oferty
**Opis**: Jako administrator chcę edytować istniejącą ofertę samochodu, aby aktualizować informacje lub cenę.
**Kryteria akceptacji**:
- W panelu administratora dostępna jest lista wszystkich ofert
- Przy każdej ofercie znajduje się przycisk "Edytuj"
- Formularz edycji zawiera wypełnione pola z aktualnymi danymi
- Po zapisaniu zmian, aktualizacja jest widoczna na stronie głównej

#### US-010: Usuwanie oferty samochodu
**Tytuł**: Usuwanie oferty
**Opis**: Jako administrator chcę usunąć ofertę samochodu, który został już sprzedany lub nie jest dostępny.
**Kryteria akceptacji**:
- W panelu administratora, przy każdej ofercie znajduje się przycisk "Usuń"
- Po kliknięciu przycisku pojawia się prośba o potwierdzenie operacji
- Po potwierdzeniu, oferta jest usuwana z systemu
- Usunięta oferta nie jest już widoczna na liście dostępnych samochodów

#### US-011: Konfiguracja parametrów finansowania
**Tytuł**: Konfiguracja parametrów finansowania
**Opis**: Jako administrator chcę ustawić parametry finansowania, aby kalkulator zapewniał dokładne wyniki.
**Kryteria akceptacji**:
- W panelu administratora dostępna jest sekcja "Konfiguracja finansowania"
- Możliwość ustawienia wartości RRSO dla różnych okresów finansowania
- Możliwość określenia minimalnego wkładu własnego
- Możliwość zdefiniowania dostępnych okresów finansowania
- Po zapisaniu, nowe parametry są używane w kalkulatorze finansowania

## 6. Metryki sukcesu

### 6.1 Metryki użytkowników
- Aktywność użytkowników: Minimum 200 unikalnych użytkowników w ciągu pierwszych 3 miesięcy od startu.
- Zaangażowanie: Średni czas spędzony na platformie powyżej 3 minut.
- Wykorzystanie kalkulatora: Co najmniej 40% odwiedzających używa kalkulatora finansowania.
- Konwersja: Co najmniej 5% użytkowników przegląda harmonogram płatności.

### 6.2 Metryki administratorów
- Zaangażowanie administratorów: Minimum 20 samochodów dodanych w ciągu pierwszego miesiąca.
- Aktualność ofert: Czas od sprzedaży samochodu do usunięcia oferty poniżej 48 godzin.

### 6.3 Metryki techniczne
- Stabilność platformy: Uptime na poziomie minimum 99% w pierwszych 3 miesiącach.
- Wydajność: Średni czas ładowania strony poniżej 4 sekund.
- Responsywność: Poprawne działanie na co najmniej 95% popularnych urządzeń i przeglądarek.

### 6.4 Łatwość użytkowania
- Ankieta satysfakcji użytkowników z wynikiem powyżej 4/5 dla pytań o intuicyjność interfejsu.
- Współczynnik porzuceń (bounce rate) poniżej 40%.
- Odsetek użytkowników, którzy poprawnie wykonują podstawowe zadania przy pierwszej próbie, powyżej 80%.
