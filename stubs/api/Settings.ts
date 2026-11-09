/*
 * Minimal type stub for Vencord's @api/Settings.
 * Exists only so the plugin can be type-checked standalone,
 * outside a full Vencord checkout. Vencord provides the real module at build time.
 */

import { OptionType } from "@utils/types";

export interface PluginSettingDef {
    description: string;
    default: unknown;
    type: OptionType;
    restartNeeded?: boolean;
    [key: string]: unknown;
}

export type PluginSettings = Record<string, PluginSettingDef>;

export interface DefinedSettings<T extends PluginSettings> {
    def: T;
    store: { [K in keyof T]: T[K]["default"] };
}

export function definePluginSettings<const T extends PluginSettings>(
    settings: T
): DefinedSettings<T> {
    return {
        def: settings,
        store: {} as { [K in keyof T]: T[K]["default"] },
    };
}
