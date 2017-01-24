const parseBooleans = (str) => {
  if (str === 'true' || str === 'false') {
    return new Boolean(str);
  };
  return str;
};

export default (layout) =>
  layout ? Object.assign({}, ...layout.map((item, i) => 
    ({
      [`${item.name}`]: parseBooleans(item.value)
    })
  ))
  : null;
