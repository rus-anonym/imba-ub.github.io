class Imba {
    public links = {
        chat: "https://api.imbabot.ru/sl/chat",
        news: "https://api.imbabot.ru/sl/news",
        support: "https://api.imbabot.ru/sl/support",
        tgBot: "https://api.imbabot.ru/sl/telegram-bot",
        userToken: "https://api.imbabot.ru/ut",
        api: {
            prod: "https://api.imbabot.ru",
            dev: "https://dev-api.imbabot.ru"
        }
    } as const;
}

export default new Imba();
