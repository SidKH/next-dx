import * as vscode from "vscode";
import { getConfiguration } from "../config/configuration";

const ROUTE_SEGMENT_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/template.tsx": "${dirname} - template.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

export async function activateRouteSegmentLabels(
  context: vscode.ExtensionContext
) {
  await configureRouteSegmentLabels();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (e) => {
      if (e.affectsConfiguration("nextDX.features.routeSegmentLabels")) {
        await configureRouteSegmentLabels();
      }
    })
  );
}

export async function configureRouteSegmentLabels() {
  console.log("Configuring Next.js file labels...");

  const config = getConfiguration();
  const feature = config.features.routeSegmentLabels;
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");

  try {
    if (feature.enabled) {
      const existingPatterns = editorConfig.get("customLabels.patterns");
      if (existingPatterns && Object.keys(existingPatterns).length > 0) {
        const result = await vscode.window.showWarningMessage(
          `Next DX updates 'customLabels.patterns' in your configuration.
          
          However, it seems like you already have 'customLabels.patterns' configured 👇 \n\n ${JSON.stringify(
            existingPatterns
          )} \n\n Do you want to replace it with Next DX config?`,
          { modal: true },
          "Replace",
          "Cancel"
        );
        if (result !== "Replace") {
          console.log("User cancelled replacing customLabels.patterns");
          return;
        }
      }
      await applyRouteSegmentPatterns();
    } else {
      await clearRouteSegmentPatterns();
    }
  } catch (err) {
    console.error("Failed to configure Next.js route segment labels:", err);
  }
}

async function applyRouteSegmentPatterns() {
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");
  await editorConfig.update(
    "customLabels.patterns",
    ROUTE_SEGMENT_PATTERNS,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels configured successfully");
}

async function clearRouteSegmentPatterns() {
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");
  await editorConfig.update(
    "customLabels.patterns",
    undefined,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels cleared");
}

export async function deactivateRouteSegmentLabels() {
  await clearRouteSegmentPatterns();
}
