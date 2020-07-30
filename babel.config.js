module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
         "root": [
           "./"
         ],
         "alias": {
           "@appjson":"./app.json",
           "@images": "./assets/images",
           "@screens": "./src/screens",
           "@components": "./src/components",
           "@navigators": "./src/navigators",
           "@styles": "./src/styles",
           "@api": "./src/api",
           "@services":"./src/services"
         }
        }
      ]
    ]
  };
};
