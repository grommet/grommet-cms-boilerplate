// @flow
import convert from "color-convert";
const hexRE = /(0x)?[0-9a-f]+/i;

type ColorType = {
  hex: string,
  cmyk: string,
  rgb: string
};

export default (hex: string): ColorType => {
  if (!hexRE.test(hex)) {
    return {
      hex: 'N/A',
      cmyk: 'N/A',
      rgb: 'N/A'
    };
  }
  return {
    hex,
    cmyk: convert.hex.cmyk(hex),
    rgb: convert.hex.rgb(hex)
  };
};
