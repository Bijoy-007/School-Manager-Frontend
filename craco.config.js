const CracoLessPlugin = require("craco-less");
// import CracoLessPlugin from "craco-less"

// W (Green ): #72CE85
// L (Lavender): #D37AF4
// D (Red): #ED4C6F
// D (Yellow): #F2C92D

// Primary: #6142ba

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    //   options: {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         modifyVars: {
    //           "@primary-color": "#6142ba", // primary color for all components
    //           "@link-color": "blue", // link color
    //           "@success-color": "#D37AF4", // success state color
    //           "@warning-color": "#F2C92D", // warning state color
    //           "@error-color": "#ED4C6F", // error state color
    //           "@font-size-base": "14px", // major text font size
    //           "@heading-color": "rgba(0, 0, 0, 0.95)", // heading text color
    //           "@text-color": "rgba(0, 0, 0, 0.65)", // major text color
    //           "@text-color-secondary": "rgba(0, 0, 0, 0.65)", // secondary text color
    //           "@disabled-color": "rgba(0, 0, 0, 0.65)", // disable state color
    //           "@border-radius-base": "4px", // major border radius
    //           "@border-color-base": "#6142ba", // major border color
    //           "@box-shadow-base":
    //             "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05);", // major shadow for layers },
    //           "@disabled-bg": "#eee",
    //           dark: true,
    //           compact: true, // optional
    //         },
    //         javascriptEnabled: true,
    //       },
    //     },
    //   },
    },
  ],
};
