import * as vscode from "vscode";
import { getConfiguration } from "../config/configuration";

const ROUTE_SEGMENT_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/template.tsx": "${dirname} - template.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

export async function configureRouteSegmentLabels(): Promise<void> {
  const config = getConfiguration();
  const feature = config.features.routeSegmentLabels;
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");

  try {
    if (feature.enabled) {
      // Check if customLabels.patterns is already set
      const existingPatterns = editorConfig.get<any>("customLabels.patterns");
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
      // Apply route segment patterns when enabled
      await editorConfig.update(
        "customLabels.patterns",
        ROUTE_SEGMENT_PATTERNS,
        vscode.ConfigurationTarget.Global
      );
      console.log("Next.js route segment labels configured successfully");
    } else {
      // Clear route segment patterns when disabled
      await editorConfig.update(
        "customLabels.patterns",
        undefined,
        vscode.ConfigurationTarget.Global
      );
      console.log("Next.js route segment labels cleared");
    }
  } catch (err) {
    console.error("Failed to configure Next.js route segment labels:", err);
  }
}
