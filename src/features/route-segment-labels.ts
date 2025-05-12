import * as vscode from "vscode";

const ROUTE_SEGMENT_PATTERNS = {
  "**/app/**/page.tsx": "${dirname} - page.tsx",
  "**/app/**/layout.tsx": "${dirname} - layout.tsx",
  "**/app/**/template.tsx": "${dirname} - template.tsx",
  "**/app/**/error.tsx": "${dirname} - error.tsx",
};

type CustomLabelPatterns = Record<string, string>;

export function activateRouteSegmentLabels() {
  applyRouteSegmentPatterns();
}

export function deactivateRouteSegmentLabels() {
  clearRouteSegmentPatterns();
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
}
