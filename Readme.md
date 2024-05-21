# Hotel management software

## Github Repository
- https://github.com/BognarPal/12A_HMS.git

## Publikus weblap
- Bemutatkozás
- Ajánlataink
- Galéria
- Kapcsolat
- Foglalás
- Szolgáltatásaink
    - Szobák
    - Wellness
    - Bár
    - Étterem

## Admin oldal -> publikus weblaphoz
- Bemutatkozás
- Ajánlataink
- Galéria
- Kapcsolat

## Szállodai rendszer
- Recepció
    - Bejelentkezés
        - Előre foglalt időpont -> megjelent
        - Nem foglalt időpontra érkezés
    - Kijelentkezés
        - Számlázás
            - szoba
            - minibár
            - egyéb szolgáltatások, vásárlások
    - Szoba átrendezés

- Admin
    - szobák
        - kategóriák
        - konkrét szobák
        - dinamikus árazás / fix árazás
    - minibár kínalata -> árak
    - étterem
        - kínálata, árak
    - koktél bár
        - kínálata, árak
    - wellness
        - kínálata, árak

## Egyéb
    - Egységes template

# Feladatok elosztása
- kezdés - közösen
    - github repo
        - brach stratégia
    - egységes template
        - hf: bootstrap alternatíva keresése
    - projekt szerkezet kialakítása
    - jogosultsági rendszer
        - bejelentkezés
        - szerepek
        - felhasználó karbantartás

### 1. csoport
    - Publikus weboldalak:
        2. - lábléc (minden oldalon)
        6. - Bemutatkozás
                - Banner, ami görög jobbra (href)
                - Banner, ami van x darab egymás mellett
                - Admin oldalon változtatható képek, url, szövegek
        1. - Ajánlataink
                - Felsoroljuk (szobák, étterem, koktél bár, wellness, egyéb ínyencségek)
                - Nincs admin oldal
        3. - Galéria
                - Képek
                - Admin oldalon törölni és hozzáadni
        4. - Kapcsolat
                - Felsorolni a social media (dict), telefonszám, email, lakcím, adószám stb
                - Admin oldalon ezek módosítása
        5. - Hírek
                - Hírek felsorolva (dátum, kép, cím -> kattintásra szöveg)
                - Admin oldalon törlés, létrehozás. (dátum, kép, cím, szöveg)

        Bálint: 3. 4.
        Barni: 2. 5.
        Teddy: 1. 6.
        Adatbázisba:
            - Bemutatkozás endpoint: képek, alt, href, Rajta lévő szöveg, kulcs (string, melyik részhez tartozik)
            - Galéria endpoint: képek
            - Kapcsolatok endpoint: social media (dict string:(string, ikon)), telefonszám, email, lakcím, adószám
            - Hírek endpoint:  (dátum, kép, alt, cím, szöveg)
### 2. csoport
    - Szobák
        - szállodai rendszer admin felültetén
        - publik weblapon a szobák oldal
        - (csomagajánlat)
### 3. csoport
    - Foglalási rendszer
        - publikus oldalon
        - recepción a bejelentkezés
### 4. csoport
    - Étterem
        - admin oldalon
        - éttermi fogyasztás
        - publikus oldalon az "éttermi kínálat" oldal
### 5. csoport
    - Koktél bár
        - admin oldalon
        - bár fogyasztás
        - publikus oldalon az "koktél bár kínálat" oldal
### 6. csoport
    - Wellness
        - admin oldalon
        - wellness szolgáltatás igénybevétel
        - publikus oldalon az "wellness" oldal
		



		
# Techinkai adatok

## Ajánlott VS Code Extension-ök:
	- Tailwind CSS Intellisense
	
## Ajánlott devdependency
	- prettier prettier-plugin-tailwindcss
	
## minta
	- https://github.com/bradtraversy/tailwind-landing-page