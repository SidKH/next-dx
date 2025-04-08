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
