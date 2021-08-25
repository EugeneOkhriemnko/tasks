/* eslint-disable */
import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "!style-loader!css-loader!less-loader!../../src/styles/index.less";

export const decorators = [
  () => ({
    template: "<div class='vc-theme_light' style='font-family: \"Roboto\"; font-size: var(--font-size-m)'><story/></div>",
  }),
];