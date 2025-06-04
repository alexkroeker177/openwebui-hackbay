# n8n AI Agent with OpenWebUI Chat Interface

This project sets up a chatbot interface using OpenWebUI that integrates with n8n for AI agent functionality.

## Prerequisites

- Python 3.11 or higher
- pip (Python package installer)
- Basic understanding of n8n workflows
- Basic understanding of OpenWebUI

## Setup

1. Clone this repository:
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. Create and activate a virtual environment:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start OpenWebUI:
```bash
open-webui serve
```

5. Access the services:
- OpenWebUI: http://localhost:8080
- n8n: http://localhost:5678 (if running locally)

## Configuration

### OpenWebUI
- The OpenWebUI interface will be available at http://localhost:8080
- Configuration can be done through environment variables or the web interface

### n8n Integration
- Access your n8n instance at http://localhost:5678
- Create your AI agent workflows in n8n
- Use webhooks to connect n8n with OpenWebUI

## Integration Steps

To integrate n8n with OpenWebUI:

1. Create a workflow in n8n that handles AI agent logic
2. Set up a webhook in n8n that OpenWebUI can call
3. Configure OpenWebUI to use the n8n webhook for processing messages

## Environment Variables

Create a `.env` file in the project root with the following variables:
```
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
OPENWEBUI_SECRET_KEY=your-secret-key-here
```

## Troubleshooting

If you encounter any issues:

1. Ensure you're using Python 3.11 or higher
2. Verify that the virtual environment is activated
3. Check that all dependencies are installed correctly
4. Ensure n8n is running and accessible
5. Check the OpenWebUI logs for any error messages

## Security Notes

- Change the default secret key in your .env file
- Consider setting up authentication for n8n
- Use environment variables for sensitive configuration # openwebui-hackbay
