import { createServer } from "http";
import { parse } from "url";

const originalVersions = [
  "myapp-1.1.0.tar",
  "myapp-1.2.0-feat.tar",
  "myapp-0.4.2.taz",
  "myapp-1.3.8.tar",
  "myapp-2.0.0-feat.tar",
  "myapp-1.8.4.tar",
];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/versions") {
    const randomizedVersions = shuffle(originalVersions);

    const responseBody = {
      versions: randomizedVersions,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseBody));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
