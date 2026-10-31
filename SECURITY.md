# Security Policy

Do not open public issues for vulnerabilities.
Report privately via GitHub: Security tab -> "Report a vulnerability"
(https://github.com/gokulsaraswat/gokulmobilize/security/advisories/new).

Never commit secrets. `.env*` files are gitignored except `.env.example`, which holds names only.
The Android signing keystore (`*.keystore`, `*.jks`) is never committed; keep a backup outside every repo.
