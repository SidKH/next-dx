// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { configureRouteSegmentLabels } from "./features/route-segment-labels";

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Configuring Next.js file labels...");

  // Configure features
  configureRouteSegmentLabels();

  // Watch for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("nextDX.features.routeSegmentLabels")) {
        configureRouteSegmentLabels();
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
