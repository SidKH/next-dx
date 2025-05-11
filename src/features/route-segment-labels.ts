import * as vscode from "vscode";

const ROUTE_SEGMENT_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/template.tsx": "${dirname} - template.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

type CustomLabelPatterns = Record<string, string>;

export function activateRouteSegmentLabels(context: vscode.ExtensionContext) {
  configureRouteSegmentLabels();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("nextDX.features.routeSegmentLabels")) {
        configureRouteSegmentLabels();
      }
    })
  );
}

export function configureRouteSegmentLabels() {
  console.log("Configuring Next.js file labels...");

  const config = vscode.workspace.getConfiguration("nextDX");
  const enabled = config.get<boolean>("features.routeSegmentLabels.enabled");

  try {
    if (enabled) {
      applyRouteSegmentPatterns();
    } else {
      clearRouteSegmentPatterns();
    }
  } catch (err) {
    console.error("Failed to configure Next.js route segment labels:", err);
  }
}

function applyRouteSegmentPatterns() {
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");
  const existingPatterns =
    editorConfig.get<CustomLabelPatterns>("customLabels.patterns") || {};

  // Merge existing patterns with route segment patterns
  const updatedPatterns = {
    ...existingPatterns,
    ...ROUTE_SEGMENT_PATTERNS,
  };

  editorConfig.update(
    "customLabels.patterns",
    updatedPatterns,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels configured successfully");
}

function clearRouteSegmentPatterns() {
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");
  const existingPatterns =
    editorConfig.get<CustomLabelPatterns>("customLabels.patterns") || {};

  // Remove only the route segment patterns while keeping other patterns
  const updatedPatterns = { ...existingPatterns };
  Object.keys(ROUTE_SEGMENT_PATTERNS).forEach((key) => {
    delete updatedPatterns[key];
  });

  editorConfig.update(
    "customLabels.patterns",
    updatedPatterns,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels cleared");
}

export function deactivateRouteSegmentLabels() {
  clearRouteSegmentPatterns();
}
