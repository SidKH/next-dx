import * as vscode from "vscode";
import {
  deactivateRouteSegmentLabels,
  activateRouteSegmentLabels,
} from "./features/route-segment-labels";

export function activate(context: vscode.ExtensionContext) {
  activateRouteSegmentLabels(context);
}

export function deactivate() {
  deactivateRouteSegmentLabels();
}
