export const PLUGIN_VERSION = "0.1.0";
export const GITHUB_REPO = "zpt0/manycord";
export const UPDATE_CHECK_URL = GITHUB_REPO
    ? `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
    : "";
export const GITHUB_RELEASE_URL = GITHUB_REPO
    ? `https://github.com/${GITHUB_REPO}/releases/latest`
    : "";
export const UPDATE_CHECK_ENABLED = !!GITHUB_REPO;
