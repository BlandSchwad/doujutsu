function escapeId(string) {
  return string.replaceAll("/", "%2F");
}
export default escapeId;
