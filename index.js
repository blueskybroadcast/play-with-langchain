import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const loader = new CSVLoader('./data.csv');
const docs = await loader.load();
let vectorStore = await MemoryVectorStore.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);

const getSimilarDocuments = async (questions) => {
  const results = await Promise.all(
    questions.map(async (question) => {
      const result = await vectorStore.similaritySearch(question, 1);
      const pageContent = result[0].pageContent.split('\n')[0]
      const metadata = {
        question: question,
        item: pageContent.split('|')[0]
      };
      return metadata;
    })
  );
  return results;
};

const seedDocuments = async (blob) => {
  const loader = new JSONLoader(blob, ["/description"]);
  const docs = await loader.load();
  vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );
  return vectorStore.memoryVectors;
};

const handleAsk = async (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const params = JSON.parse(body);

    getSimilarDocuments(params.questions).then((result) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'success', data: result }));
    });
  });
}

const handleSeed = async (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const json = JSON.parse(body);
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        let item = json[key];
        item.description = `${item.url}|${item.description}`;
      }
    }
    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], { type: 'application/json' });

    seedDocuments(blob).then((result) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'success', data: result }));
    });
  });
}

const handleTest = async (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const result = await vectorStore.similaritySearch(body, 1);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'success', data: result }));
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    switch (req.url) {
      case '/ask':
        handleAsk(req, res);
        break;
      case '/seed':
        handleSeed(req, res);
        break;
      case '/test':
        handleTest(req, res);
        break;
      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Endpoint not found');
        break;
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Endpoint not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
