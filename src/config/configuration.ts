import * as vscode from "vscode";

export interface FeatureConfiguration {
  enabled: boolean;
}

export interface ExtensionConfiguration {
  features: {
    routeSegmentLabels: FeatureConfiguration;
    // Add more features here as they are developed
  };
}

const DEFAULT_CONFIGURATION: ExtensionConfiguration = {
  features: {
    routeSegmentLabels: {
      enabled: true,
    },
  },
};

export function getConfiguration(): ExtensionConfiguration {
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

export function isFeatureEnabled(
  featureName: keyof ExtensionConfiguration["features"]
): boolean {
  const config = getConfiguration();
  return config.features[featureName]?.enabled ?? false;
}
