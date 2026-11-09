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

const settings = definePluginSettings({
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
});
