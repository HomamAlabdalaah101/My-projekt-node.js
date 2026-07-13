# WWW-HA-hoal

Server-seitig gerenderte Reise-Website (Express + Nunjucks) mit SQLite-Datenbank, JWT-Auth (per Cookie) und Admin-Bereich zur Verwaltung von Reisezielen, Nutzern und Kommentaren.

## Struktur

```
.
├── server.js            Einstiegspunkt
├── Config/dbconfig.js    SQLite-Setup (Tabellen: Persons, Destinations, Comments)
├── Routes/                app-, user-, destination-, admin-, commentRoutes
├── Services/              Datenzugriff + Encryption/JWT
├── Middlewares/           JWT-Auth-Middleware
├── views/                 Nunjucks-Templates (.html)
└── public/                CSS/JS/Bilder/Fonts
```

## Setup

```bash
npm install
cp .env.example .env   # JWT_SECRET setzen
npm run dev             # oder: npm start
```

Läuft unter `http://localhost:3000`. Die mitgelieferte `database.db` enthält bereits ein paar Demo-Nutzer und Reiseziele (Nutzerdaten sind Platzhalter, keine echten Personen).

**Demo-Admin-Login:** Username `admin` (Passwort unbekannt/zurückzusetzen — siehe unten).

> Um einen eigenen Admin-Account zu bekommen: über `/signup` registrieren und in `database.db` in der Tabelle `Persons` den `username` der Zeile auf `admin` setzen (das ist aktuell die einzige Admin-Prüfung, siehe `Middlewares/authMiddleware.js`).

## Wichtige Routen

| Route | Beschreibung |
|---|---|
| `/`, `/about`, `/portfolio`, `/contact`, `/team` | Öffentliche Seiten |
| `/destinations`, `/destination/:id` | Reiseziele |
| `/login`, `/signup` | Auth |
| `/admin/*` | Admin-Bereich (nur `username === "admin"`) |

## Tech-Stack

Express, Nunjucks, SQLite (`sqlite`/`sqlite3`), JWT, bcrypt
