module.exports = function(api) {
    api.cache(true);

    api.cache(true);

    api.cache(true);

    api.cache(true);

    api.cache(true);

    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel", "nativewind/babel", "nativewind/babel", "nativewind/babel", "nativewind/babel"],

        plugins: [["module-resolver", {
            root: ["./"],

            alias: {
                "@": "./",
                "tailwind.config": "./tailwind.config.js"
            }
        }]]
    };
};