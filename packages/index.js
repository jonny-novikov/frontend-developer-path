export function domReady(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument passed to domReady should be a function");
  }
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  }
}
