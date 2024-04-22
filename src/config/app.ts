interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "bestMove",
    github: {
        title: "bestmove",
        url: "https://github.com/Matti88/BestMove_Maps",
    },
    author: {
        name: "matti88",
        url: "https://github.com/Matti88",
    }
}