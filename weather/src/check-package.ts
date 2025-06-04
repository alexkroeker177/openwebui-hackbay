import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Create server instance
const server = new McpServer({
  name: "package-checker",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register package.json compliance check tool
server.tool(
  "check-package-json",
  "Check if package.json is compliant with guidelines",
  {
    projectPath: z.string().describe("Path to the project directory"),
  },
  async ({ projectPath }) => {
    try {
      const packageJsonPath = path.join(projectPath, "package.json");
      const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
      const packageJson = JSON.parse(packageJsonContent);

      // Connect to remote MCP server
      const remoteMcpUrl = "https://hackbay2o25.app.n8n.cloud/mcp-test/433fe2b5-94be-4172-9ed1-a13c1ad5099d/sse";
      
      // Send package.json to remote MCP for compliance check
      const response = await fetch(remoteMcpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "check-package",
          data: packageJson,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      console.error("Error checking package.json:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error checking package.json: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Package Checker MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 