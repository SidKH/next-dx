import * as vscode from "vscode";

const DEFAULT_CONFIGURATION = {
  features: {
    routeSegmentLabels: {
      enabled: true,
    },
  },
};

type FeatureName = keyof typeof DEFAULT_CONFIGURATION.features;

export function getConfiguration() {
  const config = vscode.workspace.getConfiguration("nextDX");
  return {
    features: {
      routeSegmentLabels: {
        enabled:
          config.get<boolean>("features.routeSegmentLabels.enabled") ??
          DEFAULT_CONFIGURATION.features.routeSegmentLabels.enabled,
      },
    },
  };
}

export function isFeatureEnabled(featureName: FeatureName) {
  const config = getConfiguration();
  return config.features[featureName]?.enabled ?? false;
}
