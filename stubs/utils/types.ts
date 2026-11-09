/*
 * Minimal type stubs for Vencord's @utils/types.
 * These exist only so the plugin can be type-checked standalone,
 * outside a full Vencord checkout. Vencord provides the real module at build time.
 */

export enum OptionType {
    STRING,
    NUMBER,
    BOOLEAN,
    SELECT,
    SLIDER,
    COMPONENT,
    CUSTOM,
}

export interface PluginAuthor {
    id: bigint;
    name: string;
}

export interface PatcherReplacement {
    match: RegExp;
    replace: string;
}

export interface PluginPatch {
    find: string;
    replacement: PatcherReplacement | PatcherReplacement[];
}

export interface PluginDef {
    name: string;
    description: string;
    authors: PluginAuthor[];
    tags?: string[];
    settings?: unknown;
    patches?: PluginPatch[];
    [key: string]: unknown;
}

export default function definePlugin<P extends PluginDef>(plugin: P): P {
    return plugin;
}
