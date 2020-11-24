const RenderIfTrue = ({ children, statement }) => {
  if (!statement) {
    return null;
  }
  return children;
}

export default RenderIfTrue;
