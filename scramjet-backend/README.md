-]=# Scramjet Backend

This folder is the backend pipeline workspace for your proxy service.

## What is here
- `settings.json` — where you store your Scramjet proxy endpoint and related backend settings.
- `pipe.yml` — an example pipeline template you can customize and deploy.

## How to use it
1. Open a terminal in this folder:
   ```powershell
   cd /d C:\Users\ejcop\Downloads\Lumora\scramjet-backend
   ```

2. Install the Scramjet deploy CLI and dependencies:
   ```powershell
   npm install
   ```

3. Edit `settings.json` and set `proxyEndpoint` to your backend endpoint.

4. Deploy your pipeline using the included script:
   ```powershell
   .\deploy.ps1
   ```

5. After deploy, update `c:\Users\ejcop\Downloads\Lumora\scramjet.js` with your actual endpoint.

## Notes
- The example pipeline in `pipe.yml` is a starting point only.
- If Scramjet uses a different format for your version, follow the official Scramjet docs.
- A working backend is required for a real transport proxy.
