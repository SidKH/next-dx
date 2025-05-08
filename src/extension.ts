import * as vscode from "vscode";
import {
  deactivateRouteSegmentLabels,
  activateRouteSegmentLabels,
} from "./features/route-segment-labels";

export async function activate(context: vscode.ExtensionContext) {
  await activateRouteSegmentLabels(context);
}

export async function deactivate() {
  await deactivateRouteSegmentLabels();
}
