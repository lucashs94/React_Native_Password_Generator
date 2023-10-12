module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],

    plugins: [
      'react-native-reanimated/plugin',

      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": ["./src/components"],
            "@hooks": ["./src/hooks"],
            "@contexts": ["./src/contexts"],
            "@assets": ["./src/assets"],
            "@pages": ["./src/pages"],
            "@routes": ["./src/routes"],
            "@services": ["./src/services"],
            "@themes": ["./src/themes"],
          },
        },
      ],
      
    ],
  };
};
