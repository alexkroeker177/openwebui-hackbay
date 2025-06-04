import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Create server instance
const server = new McpServer({
    name: "test-mcp",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Test data for tech stack compliance
const testTechStack = {
    files: [
        {
            name: "package.json",
            content: JSON.stringify({
                dependencies: {
                    "react": "^18.2.0",
                    "typescript": "^5.0.0",
                    "node-fetch": "^3.0.0"
                }
            })
        },
        {
            name: "tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    target: "ES2022",
                    module: "Node16",
                    strict: true
                }
            })
        }
    ]
};
// Test data for license compliance
const testLicenses = {
    files: [
        {
            name: "package.json",
            content: JSON.stringify({
                dependencies: {
                    "react": "^18.2.0", // MIT License
                    "lodash": "^4.17.21", // MIT License
                    "jquery": "^3.6.0" // MIT License
                }
            })
        }
    ]
};
// Register test tools
server.tool("test-tech-stack", "Test tech stack compliance", {
    projectPath: z.string().describe("Path to the project directory"),
}, async ({ projectPath }) => {
    console.log("Testing tech stack compliance for:", projectPath);
    console.log("Test data:", JSON.stringify(testTechStack, null, 2));
    return {
        content: [
            {
                type: "text",
                text: "Tech stack compliance test completed. Check server logs for details.",
            },
        ],
    };
});
server.tool("test-license-compliance", "Test license compliance", {
    projectPath: z.string().describe("Path to the project directory"),
}, async ({ projectPath }) => {
    console.log("Testing license compliance for:", projectPath);
    console.log("Test data:", JSON.stringify(testLicenses, null, 2));
    return {
        content: [
            {
                type: "text",
                text: "License compliance test completed. Check server logs for details.",
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Test MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
