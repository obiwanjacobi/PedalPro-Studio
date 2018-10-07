// base path for relative file paths is the 'app' folder.
export const Configuration = {
    pedalpro: {
        factoryFile: "../assets/PedalPro.65.vrf",
        factoryFileEx: "../assets/PedalProEx.81.vrf",
    },
    application: {
        languageFile: "../assets/Texts.${lang}.json"
    },
    development: {
        simulate: "PedalPro"
        // simulate: "PedalProEx"
    }
};