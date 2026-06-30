import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = hasLocale(routing.locales, locale)
        ? locale
        : routing.defaultLocale;

    return {
        locale: currentLocale,
        messages: (await import(`./locale/${currentLocale}.json`)).default,
    };
});
