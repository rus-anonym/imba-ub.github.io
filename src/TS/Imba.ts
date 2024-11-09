class Imba {
    public links = {
        chat: "https://api.imba-bot.ru/sl/chat",
        news: "https://api.imba-bot.ru/sl/news",
        support: "https://api.imba-bot.ru/sl/support",
        tgBot: "https://api.imba-bot.ru/sl/telegram-bot",
        userToken: "https://api.imba-bot.ru/ut",
        api: {
            prod: "https://api.imba-bot.ru",
            dev: "https://dev-api.imba-bot.ru"
        }
    } as const;
}

export default new Imba();
