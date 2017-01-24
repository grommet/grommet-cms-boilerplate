export default (layout) =>
  layout ? Object.assign({}, ...layout.map((item, i) => 
    ({
      [`${item.name}`]: item.value
    })
  ))
  : null;
