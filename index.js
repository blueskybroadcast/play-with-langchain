import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const hostname = '127.0.0.1';
const port = 3000;

const loader = new CSVLoader('./data.csv');
const docs = await loader.load();
const vectorStore = await MemoryVectorStore.fromDocuments(
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
        item: pageContent.split(': ')[1]
      };
      return metadata;
    })
  );
  return results;
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
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
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Endpoint not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
