import fs from "fs";
import url from "url";
import http from "http";
import crypto from "crypto";

const VOXELCHAIN_HOST = `https://voxelchain.app`;
const VOXELCHAIN_PORT = 8688;

const WATCH_FILE_PATH = `./dist/index.js`;

function randomHash() {
  const seed = crypto.webcrypto.getRandomValues(new Uint8Array(8));
  return Array.prototype.map.call(seed, (x) => ("00" + x.toString(16)).slice(-2)).join("").toUpperCase();
}

let currentFile = "";
let refreshHash = "";

try {
  currentFile = fs.readFileSync(WATCH_FILE_PATH, "utf-8");
  refreshHash = randomHash();
} catch (e) {}

fs.watch(WATCH_FILE_PATH, () => {
  try {
    const data = fs.readFileSync(WATCH_FILE_PATH, "utf-8");
    currentFile = data;
    refreshHash = randomHash();
  } catch (e) {
    currentFile = "";
    refreshHash = randomHash();
  }
});

http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  res.setHeader("Access-Control-Allow-Origin", VOXELCHAIN_HOST);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  if (query.command !== "") {
    if (query.command === "refresh-hash") {
      res.write(refreshHash);
    } else if (query.command === "file-data") {
      res.write(currentFile);
    } else {
      res.write("");
    }
  } else {
    res.write("");
  }
  res.end();
}).listen(VOXELCHAIN_PORT);

console.log(`Listening on port '${VOXELCHAIN_PORT}'`);
