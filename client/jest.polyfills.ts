const { TextEncoder, TextDecoder } = require("node:util");

if (!globalThis.TextEncoder) {
  Reflect.set(globalThis, "TextEncoder", TextEncoder);
}
if (!globalThis.TextDecoder) {
  Reflect.set(globalThis, "TextDecoder", TextDecoder);
}

if (!globalThis.Blob) {
  globalThis.Blob = require("node:buffer").Blob;
}
if (!globalThis.fetch) {
  globalThis.fetch = require("node-fetch");
}
if (!globalThis.Request) {
  globalThis.Request = require("node-fetch").Request;
}
if (!globalThis.Response) {
  globalThis.Response = require("node-fetch").Response;
}
if (!globalThis.Headers) {
  globalThis.Headers = require("node-fetch").Headers;
}
if (!globalThis.FormData) {
  globalThis.FormData = require("form-data");
}
