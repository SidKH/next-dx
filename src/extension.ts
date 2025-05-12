import * as vscode from "vscode";
import {
  deactivateRouteSegmentLabels,
  activateRouteSegmentLabels,
} from "./features/route-segment-labels";
import { activateWelcomePage } from "./features/welcome-page";

export function activate(context: vscode.ExtensionContext) {
  activateWelcomePage(context);
  activateRouteSegmentLabels();
}

export function deactivate() {
  deactivateRouteSegmentLabels();
}
