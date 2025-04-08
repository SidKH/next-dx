import * as vscode from "vscode";
import { getConfiguration } from "../config/configuration";

const NEXT_PAGE_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

export class PageLabels {
  public async configure(): Promise<void> {
    const config = getConfiguration();
    const feature = config.features.routeSegmentLabels;
    const editorConfig = vscode.workspace.getConfiguration("workbench.editor");

    try {
      if (feature.enabled) {
        // Apply page patterns when enabled
        await editorConfig.update(
          "customLabels.patterns",
          NEXT_PAGE_PATTERNS,
          vscode.ConfigurationTarget.Global
        );
        console.log("Next.js page labels configured successfully");
      } else {
        // Clear page patterns when disabled
        await editorConfig.update(
          "customLabels.patterns",
          undefined,
          vscode.ConfigurationTarget.Global
        );
        console.log("Next.js page labels cleared");
      }
    } catch (err) {
      console.error("Failed to configure Next.js page labels:", err);
    }
  }
}
