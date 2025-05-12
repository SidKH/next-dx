import * as vscode from "vscode";

export function activateWelcomePage(context: vscode.ExtensionContext) {
  context.globalState.update("nextdxHasShownWelome", false);
  const hasShownWelcome = context.globalState.get("nextdxHasShownWelome");

  if (!hasShownWelcome) {
    showWelcomePage(context);
    context.globalState.update("nextdxHasShownWelome", true);
  }
}

function showWelcomePage(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "nextDXWelcome",
    "Welcome to Next DX",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  panel.webview.html = getWelcomePageContent();
}

function getWelcomePageContent() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: var(--vscode-font-family);
        padding: 20px;
        font-size: 16px;
        color: var(--vscode-foreground);
        line-height: 1.6;
      }
      h1 {
        margin-bottom: 20px;
      }
      section {
        margin-bottom: 15px;
      }
      pre {
        background: var(--vscode-textCodeBlock-background);
        padding: 24px;
        border-radius: 16px;
        display: flex;
      }
      code {
        background: transparent;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to Next DX! 👋</h1>
    <p>The extension has updated your User Settings to show better labels for Next.js route segments<br />(no more page.tsx | page.tsx | page.tsx 🙈)</p>
    <pre>
      <code>"workbench.editor.customLabels.patterns": {
  "**/app/**/page.tsx": "\${dirname} - page.tsx",
  "**/app/**/layout.tsx": "\${dirname} - layout.tsx",
  "**/app/**/template.tsx": "\${dirname} - template.tsx",
  "**/app/**/error.tsx": "\${dirname} - error.tsx"
}</code>
    </pre>
    <p>If you want to change labels patterns, or delete them, you can do it in your User Settings (JSON)</p>
    <h2>More improvements coming soon:</h2>
    <ul>
      <li>
        Fix autoimport of Link component when using Lucia icons
      </li>
      <li>
        Fix autoimport from radix primitives when using shadcn/ui components
      </li>
      <li>
        Optional: show client indicator in files that don't explicitly have "use client" but are imported by a client component
      </li>
      <li>
        Optional: show static/dynamic indicator for pages
      </li>
      <li>
        <a href="https://github.com/SidKH/next-dx/issues/new?labels=feature%20request" target="_blank">Request a feature</a>
      </li>
    </ul>
  </body>
  </html>`;
}
