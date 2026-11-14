/*
 * Manycord, a Vencord plugin that removes Discord's five-account switcher limit
 * Copyright (c) 2026 zpt0.dev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the MIT License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * MIT License for more details.
 *
 * You should have received a copy of the MIT License
 * along with this program. If not, see <https://opensource.org/licenses/MIT>.
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

import {
    PLUGIN_VERSION,
    UPDATE_CHECK_ENABLED,
    UPDATE_CHECK_URL,
    GITHUB_RELEASE_URL,
} from "./constants";

const settings = definePluginSettings({
    discordServerJoin: {
        description: "Join the Discord support server once",
        default: true,
        type: OptionType.BOOLEAN,
    },
    goToUpdateChannel: {
        description: "Navigate to the updates channel on start",
        default: true,
        type: OptionType.BOOLEAN,
    },
    maxAccounts: {
        description: "Number of accounts that can be added, or 0 for no limit",
        default: 0,
        type: OptionType.NUMBER,
        restartNeeded: true,
    },
});

export default definePlugin({
    name: "Manycord",
    description:
        "Remove or customize the five-account limit in Discord's built-in account switcher.",
    authors: [
        {
            id: 299670891875270656n,
            name: "zpt0.dev",
        },
    ],
    tags: ["Utility"],
    settings,
    patches: [
        {
            find: "pushSyncToken:null}),",
            replacement: [
                {
                    match: /(\).length>)5/,
                    replace: "$1$self.getMaxAccounts()",
                },
                {
                    match: /(\i.splice\()5/,
                    replace: "$1$self.getMaxAccounts()",
                },
            ],
        },
        {
            find: "getCurrentUser(),multiAccountUsers",
            replacement: [
                {
                    match: /(maxNumAccounts:)5/,
                    replace: "$1$self.getMaxAccounts()",
                },
                {
                    match: /(\i.length(?:<|>=))5/g,
                    replace: "$1$self.getMaxAccounts()",
                },
            ],
        },
    ],
    getMaxAccounts() {
        return settings.store.maxAccounts === 0 ? Infinity : settings.store.maxAccounts;
    },
    start() {
        setTimeout(() => checkForUpdates(), 5000);

        const DISCORD_INVITE = "https://discord.gg/sKTrAMctcy";
        const joinedKey = "manycord-discord-joined";
        let opened = false;

        if (settings.store.discordServerJoin && !localStorage.getItem(joinedKey)) {
            try {
                window.open(DISCORD_INVITE, "_blank");
                localStorage.setItem(joinedKey, "1");
                opened = true;
            } catch {}
        }

        if (settings.store.goToUpdateChannel && !opened) {
            try {
                window.open(DISCORD_INVITE, "_blank");
            } catch {}
        }
    },
});

async function checkForUpdates(): Promise<void> {
    if (!UPDATE_CHECK_ENABLED) return;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(UPDATE_CHECK_URL, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github.v3+json" },
        });

        clearTimeout(timeoutId);

        if (!response.ok) return;

        const data = await response.json();
        let latestVersion = data.tag_name || data.name || "";
        latestVersion = latestVersion.replace(/^v/i, "").trim();

        if (!latestVersion) return;

        const comparison = compareVersions(latestVersion, PLUGIN_VERSION);
        if (comparison > 0) {
            window.open(GITHUB_RELEASE_URL, "_blank");
        }
    } catch {}
}

function compareVersions(a: string, b: string): number {
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const x = pa[i] ?? 0;
        const y = pb[i] ?? 0;
        if (x > y) return 1;
        if (x < y) return -1;
    }
    return 0;
}
