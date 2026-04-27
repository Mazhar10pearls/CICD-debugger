# CI/CD Failure Debugger

An AI-powered system that automatically analyzes CI/CD pipeline failures and creates GitHub issues with root cause analysis.

**Repository**: https://github.com/Mazhar10pearls/CICD-debugger

## Architecture

- **GitHub Actions**: Detects pipeline failures
- **n8n**: Workflow automation platform
- **Gemini API**: AI analysis of failure logs
- **GitHub API**: Creates issues with analysis

## Prerequisites

### GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "CICD-Debugger"
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token immediately** - you won't see it again!

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Give it a name like "CICD-Debugger"
5. **Copy the API key**

## Local Testing Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- GitHub Personal Access Token with repo permissions
- Google Gemini API Key

### Environment Variables

Create a `.env` file in the **project root directory** (same location as `docker-compose.yml`):

```
GITHUB_TOKEN=your_github_personal_access_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Security Note**: Never commit these keys to your repository. The `.env` file is already added to `.gitignore`.

### Steps

1. **Clone and setup the project**
   ```bash
   git clone <repo>
   cd cicd-debugger
   npm install
   ```

2. **Simulate a build failure locally**
   ```bash
   # On Windows
   simulate-failure.bat
   
   # On Linux/Mac
   bash simulate-failure.sh
   ```
   This demonstrates the type of failure the system will analyze.

3. **Start n8n locally**
   ```bash
   docker-compose up -d
   ```

3. **Import the n8n workflow**
   - Open http://localhost:5678
   - Login with user/password
   - For testing: Import `n8n-workflow-test.json` (uses mock data)
   - For production: Import `n8n-workflow.json` (real GitHub integration)

4. **Set environment variables in n8n**
   - Edit the `.env` file in the project root and add your actual API keys
   - Or set them directly in the n8n UI at Settings > Environment Variables

5. **Test the webhook**
   ```bash
   node test-webhook.js
   ```

6. **Check for created issue**
   - The workflow should create a GitHub issue in your repo with the analysis

## Robustness Features

- **Error Handling**: Each API call has retry logic with exponential backoff
- **Authentication**: Secure token-based authentication for all APIs
- **Input Validation**: Validates webhook payloads and API responses
- **Fallbacks**: Uses mock data for local testing when APIs are unavailable
- **Logging**: Comprehensive logging at each step for debugging
- **Rate Limiting**: Respects API rate limits with delays
- **Timeout Handling**: Configurable timeouts to prevent hanging workflows

## Potential Issues and Solutions

- **Gemini API Quota Exceeded**: Implement caching or reduce analysis frequency
- **GitHub API Rate Limits**: Use authenticated requests and implement delays
- **Webhook Delivery Failures**: Use webhook redelivery or polling as fallback
- **Parsing Errors**: Add more robust text parsing with regex patterns
- **Network Issues**: Implement circuit breaker pattern for external calls
- **Token Expiration**: Monitor token validity and refresh automatically

## Testing Different Failure Scenarios

To test various failure types, modify the mock data in `n8n-workflow-test.json`:

- **Build Failures**: Change logs to include compilation errors
- **Test Failures**: Include test output with failing assertions
- **Dependency Issues**: Mock npm install failures
- **Timeout Errors**: Simulate long-running tasks timing out

## Production Deployment

- Deploy n8n to a cloud service (Railway, Heroku, etc.)
- Set up GitHub webhook to point to n8n endpoint
- Use secrets for API keys
- Monitor workflow executions

## Troubleshooting

- Ensure GitHub token has `repo` and `workflow` permissions
- Check n8n logs: `docker-compose logs n8n`
- Verify webhook payload structure matches GitHub's format
- Test Gemini API separately if issues persist