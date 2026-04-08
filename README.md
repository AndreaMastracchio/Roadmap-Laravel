# 🐘 LaravelStudy - Piattaforma di Apprendimento Laravel

Benvenuto su **LaravelStudy**, non un semplice repository, ma una **piattaforma interattiva completa** progettata per trasformare lo studio di Laravel in un'esperienza pratica e coinvolgente. Dai fondamentali del framework PHP fino alle architetture avanzate, LaravelStudy ti accompagna in ogni fase della tua crescita professionale.

---

## 🏛️ Filosofia del Progetto

Imparare Laravel leggendo solo la documentazione è difficile. LaravelStudy nasce con l'idea di **"Learning by Doing"**:
- **Teoria Strutturata**: Moduli Markdown chiari e progressivi.
- **Pratica Immediata**: Una console interattiva integrata per sporcarsi le mani.
- **Validazione**: Quiz ed esercizi di coding per confermare le tue competenze.
- **Persistenza**: Un sistema completo di account per non perdere mai il filo dello studio.

---

## 🏗️ Architettura del Progetto

Il progetto utilizza un'architettura a microservizi robusta e moderna, completamente Dockerizzata:

- **🎨 Frontend**: Sviluppato in **React 18** con **Material UI (MUI)** e **Vite**. Un'interfaccia fluida, responsive e dotata di un tema personalizzato in stile Laravel.
- **🧠 Backend**: Un server API in **Node.js + Express** che gestisce l'autenticazione sicura (bcrypt), la gestione delle sessioni e il caricamento dinamico dei contenuti.
- **🗄️ Database**: **MariaDB 10.11** per la persistenza affidabile di utenti, acquisti di corsi premium e progressi.
- **⚡ Cache & Sessioni**: **Redis 7** per una gestione delle sessioni ultra-veloce e performance ottimizzate.

---

## 🚀 Requisiti

- **Docker Desktop** o **Docker Engine** (V2 raccomandato).
- **Docker Compose**.
- Browser moderno (Chrome, Firefox, Safari).

---

## ⚙️ Installazione e Setup Rapido

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-utente/laravelstudy.git
   cd laravelstudy
   ```

2. **Prepara l'ambiente**:
   Copia il file di configurazione:
   ```bash
   cp .env.example .env
   ```

3. **Inizializzazione**:
   Il sistema si occuperà automaticamente di configurare il database al primo avvio.

---

## 🛠️ Modalità di Esecuzione

### 💻 Ambiente di Sviluppo (Consigliato)
Avvia l'intero stack con **Hot Reload** (le modifiche al codice si riflettono istantaneamente):
```bash
./bin/dev
```
- **Interfaccia Web**: [http://localhost:8081](http://localhost:8081)
- **API Health Check**: [http://localhost:5006/api/health](http://localhost:5006/api/health)

### 🚢 Kubernetes (Deploy)
Per avviare i servizi in un cluster Kubernetes:

**Produzione:**
```bash
kubectl apply -k ../server/k8s-laravelstudy/production/
```

**Staging:**
```bash
kubectl apply -k ../server/k8s-laravelstudy/staging/
```
Assicurati di aver caricato le immagini `laravelstudy-backend:latest` e `laravelstudy-frontend:latest` nel tuo cluster (es. `kind load docker-image ...` o tramite un Registry).

---

## 🖥️ Caratteristiche Distintive

- **💻 Console Interattiva (zsh-style)**: Una shell nel browser con autocompletamento intelligente (Tab) e feedback sui comandi in tempo reale.
- **🎓 Roadmap Progressiva**: Dai concetti base di PHP a Laravel avanzato.
- **📝 Esercitazioni di Coding**: Scrivi ed esegui codice e comandi `artisan` simulati.
- **👤 User Experience**: Gestione profilo (avatar, password), Dashboard dei progressi e ripresa automatica dello studio dall'ultimo modulo non completato.
- **🛡️ Architettura Moderna**: Basata su container, database MariaDB e cache Redis per un'esperienza scalabile.

---

## 🤝 Contribuire

LaravelStudy è un progetto guidato dalla community. Se vuoi proporre nuovi moduli, correggere bug o suggerire funzionalità:
1. Apri una **Issue** descrivendo la tua idea.
2. Invia una **Pull Request** seguendo le best practices di React/Node.

Buono studio con **LaravelStudy**! 🐘🚀
