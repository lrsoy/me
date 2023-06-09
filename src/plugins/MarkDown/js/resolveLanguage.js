import * as languages from './languages';

/**
 * A key-value map to get language info from alias
 *
 * - key: alias
 * - value: language
 */
let languagesMap;

/**
 * Lazy generate languages map
 */
const getLanguagesMap = () => {
    if (!languagesMap) {
        languagesMap = Object.values(languages).reduce((result, item) => {
            item.aliases.forEach((alias) => {
                result[alias] = item;
            });
            return result;
        }, {});
    }
    return languagesMap;
};

/**
 * Resolve language for highlight from token info
 */
export const resolveLanguage = (info) => {
    // get user-defined language alias
    const alias = info.match(/^([^ :[{]+)/)?.[1] || 'text';

    // if the alias does not have a match in the map
    // fallback to the alias itself
    return (
        getLanguagesMap()[alias] ?? {
            name: alias,
            ext: alias,
            aliases: [alias],
        }
    );
};
