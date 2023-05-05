/**
 * Resolve the `:v-pre` / `:no-v-pre` mark from token info
 */
export const resolveVPre = (info) => {
    if (/:v-pre\b/.test(info)) {
        return true;
    }
    if (/:no-v-pre\b/.test(info)) {
        return false;
    }
    return null;
};
