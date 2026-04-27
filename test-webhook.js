const axios = require('axios');

const n8nWebhookUrl = 'http://localhost:5678/webhook/test-webhook'; // Use test webhook

const simulatedPayload = {
  action: 'completed',
  workflow_run: {
    id: 123456789,
    name: 'CI/CD Pipeline',
    head_branch: 'main',
    head_sha: 'abc123',
    status: 'completed',
    conclusion: 'failure',
    html_url: 'https://github.com/user/repo/actions/runs/123456789'
  },
  repository: {
    name: 'cicd-debugger',
    owner: {
      login: 'your-username'
    }
  }
};

async function testWebhook() {
  try {
    const response = await axios.post(n8nWebhookUrl, simulatedPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': 'workflow_run'
      }
    });
    console.log('Webhook sent successfully:', response.status);
  } catch (error) {
    console.error('Error sending webhook:', error.message);
  }
}

testWebhook();