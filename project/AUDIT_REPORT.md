# Project Audit Report

## Summary ✅
- I scanned the repository for common issues (naming, duplicates, DB config, secrets, migrations) and performed safe, non-invasive fixes to improve hygiene and reproducibility.
- I started both backend and frontend dev servers to validate the project runs locally.

---

## High-level Findings (severity)

1. **Hard-coded SECRET_KEY in `backend/settings.py` (High)**
   - The SECRET_KEY is present in code and uses Django's `django-insecure-` prefix (weak). This is a security risk.
   - Recommendation: Rotate the key and set `DJANGO_SECRET_KEY` in environment or secrets manager. Remove any committed secret from the repo history if necessary.

2. **DEBUG controlled in settings but currently True (High)**
   - `DEBUG` was set to `True` in code. I updated settings to read `DJANGO_DEBUG` from environment (default True for dev). For production, set `DJANGO_DEBUG=false`.

3. **Virtual environment included in repo (`The project back/venv`) (Medium)**
   - A full virtualenv is tracked in the repository (large, platform-dependent files). This bloats the repo and causes portability issues.
   - Action taken: Added project-level `.gitignore`, removed `The project back/venv` from Git index (kept the local copy).
   - Recommendation: Keep a simple `requirements.txt`, do not commit `venv`.

4. **Committed SQLite DB (`The project back/db.sqlite3`) (Medium)**
   - Database file is tracked and was removed from Git index and added to `.gitignore` to avoid shipping data in the repo.

5. **Folder naming with spaces (e.g., `The project back`, `The project front`) (Medium)**
   - Spaces in top-level folder names may break automation and CI tooling.
   - Recommendation: Consider renaming to `backend` and `frontend` or `the-project-back` (coordinate with collaborators and update docs/scripts).

6. **Duplicate or incremental migration files (low/medium)**
   - There are `0002_alter_*` and `0003_alter_*` migrations in apps (accounts, orders, ...). They look like sequential adjustments of id fields (AutoField -> BigAutoField). Not incorrect, but can be squashed or reviewed if you want linear history.

7. **CORS settings duplication (low)**
   - `CORS_ALLOW_ALL_ORIGINS` was set to True and later set to DEBUG. I removed the unconditional `True` to rely on the DEBUG-based assignment.

8. **Numerous documentation files (info)**
   - Multiple README/summary docs exist. Consider consolidation to reduce confusion.

9. **Django security check warnings (info/high)**
   - `check --deploy` reported missing `SECURE_HSTS_SECONDS`, missing `SECURE_SSL_REDIRECT=True`, missing secure cookie flags, and warning about DEBUG in deployment. These are expected for dev but should be addressed before deployment.

---

## Actions I Implemented (safe, non-invasive) ✅
- Created `project/.gitignore` with entries for venv, db files, Node `node_modules`, `.env`, `__pycache__`, and common noise files.
- Edited `The project back/backend/settings.py`:
  - Added `import os` and changed:
    - `SECRET_KEY` to read `os.environ.get('DJANGO_SECRET_KEY', '<existing-key>')`
    - `DEBUG` to read `os.environ.get('DJANGO_DEBUG', 'True') == 'True'`
  - Removed the unconditional `CORS_ALLOW_ALL_ORIGINS = True` duplicate.
- Untracked (from Git) `The project back/venv` and `The project back/db.sqlite3` (files still present locally).
- Ran `python manage.py check --deploy` (saw warnings), ran `python manage.py migrate` (no migrations pending).
- Started the backend dev server: python "project/The project back/manage.py" runserver 0.0.0.0:8000 (running) ✅
- Started the frontend dev server: `npm run dev` in `The project front` (Vite) — available at http://localhost:5173/ ✅

---

## How to run the project locally (what I ran)
1. Backend (Windows PowerShell):
   - Ensure Python 3.12+ installed
   - (Recommended) create a venv, install `pip install -r "project/The project back/requirements.txt"`
   - Set env vars for production:
     - `setx DJANGO_SECRET_KEY "<your-secret>"`
     - `setx DJANGO_DEBUG "False"` (for production)
   - Run migrations: `python "project/The project back/manage.py" migrate`
   - Start server: `python "project/The project back/manage.py" runserver 0.0.0.0:8000`

2. Frontend (Windows PowerShell):
   - `cd "project/The project front"`
   - `npm install`
   - `npm run dev` (Vite runs on http://localhost:5173)

---

## Recommended next steps (prioritized) 🔧
1. **Rotate SECRET_KEY** and remove the committed key from history if it's sensitive (use git filter-branch or BFG/acceptable tools). Then set `DJANGO_SECRET_KEY` in your CI/hosting environment. (High)
2. **Set production security settings** (HSTS, SECURE_SSL_REDIRECT, SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE) and ensure `DJANGO_DEBUG` is false in production. (High)
3. **Rename top-level folders to remove spaces** (e.g., `The project back` → `backend`) — this requires updating docs and some scripts, coordinate with the team. (Medium)
4. **Squash or tidy migrations** if you want a cleaner migration history (backup DB before changing migrations). (Medium)
5. **Add CI checks**: run `python manage.py check`, `pytest`, `flake8`/`eslint` on PRs. (Medium)
6. **Consolidate docs** and remove duplicated READMEs if appropriate. (Low)

---

## Files changed (summary)
- Edited: `The project back/backend/settings.py`
- Added: `project/.gitignore`
- Added: `project/AUDIT_REPORT.md` (this file)
- Git: Untracked `The project back/venv/` and `The project back/db.sqlite3` (removed from index and committed)

---

If you want, I can proceed with the higher-risk tasks next (rotate secrets, clean migrations, rename folders) — I will not perform them without your confirmation. If you'd like me to continue, tell me which items to prioritize next.
