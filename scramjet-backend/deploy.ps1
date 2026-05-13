# Run this from the scramjet-backend folder
# Make sure Node.js is installed and the Scramjet CLI package is available.

Write-Host "Installing Scramjet MCP CLI if needed..."
npm install

Write-Host "Deploying Scramjet pipeline..."
npx @scramjet/mcp deploy

Write-Host "Deployment complete. Update settings.json.proxyEndpoint with the deployed endpoint URL."
