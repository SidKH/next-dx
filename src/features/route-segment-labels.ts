import * as vscode from "vscode";

const ROUTE_SEGMENT_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/template.tsx": "${dirname} - template.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

type CustomLabelPatterns = Record<string, string>;

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

  const config = vscode.workspace.getConfiguration("nextDX");
  const enabled = config.get<boolean>("features.routeSegmentLabels.enabled");

  try {
    if (enabled) {
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
  const existingPatterns =
    editorConfig.get<CustomLabelPatterns>("customLabels.patterns") || {};

  // Merge existing patterns with route segment patterns
  const updatedPatterns = {
    ...existingPatterns,
    ...ROUTE_SEGMENT_PATTERNS,
  };

  await editorConfig.update(
    "customLabels.patterns",
    updatedPatterns,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels configured successfully");
}

async function clearRouteSegmentPatterns() {
  const editorConfig = vscode.workspace.getConfiguration("workbench.editor");
  const existingPatterns =
    editorConfig.get<CustomLabelPatterns>("customLabels.patterns") || {};

  // Remove only the route segment patterns while keeping other patterns
  const updatedPatterns = { ...existingPatterns };
  Object.keys(ROUTE_SEGMENT_PATTERNS).forEach((key) => {
    delete updatedPatterns[key];
  });

  await editorConfig.update(
    "customLabels.patterns",
    updatedPatterns,
    vscode.ConfigurationTarget.Global
  );
  console.log("Next.js route segment labels cleared");
}

export async function deactivateRouteSegmentLabels() {
  await clearRouteSegmentPatterns();
}
