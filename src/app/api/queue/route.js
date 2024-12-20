// /src/app/api/queue/route.js
let queue = [];
let currentQueueNumber = 0;

export async function POST(req) {
  currentQueueNumber++;
  queue.push(currentQueueNumber);
  return new Response(JSON.stringify({ queueNumber: currentQueueNumber }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  return new Response(JSON.stringify(queue), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req) {
  const { number } = await req.json();
  const index = queue.indexOf(number);
  if (index > -1) {
    queue.splice(index, 1);
  }
  return new Response(JSON.stringify({ message: 'Antrian dipanggil', queue }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE() {
  queue = [];
  currentQueueNumber = 0;
  return new Response(JSON.stringify({ message: 'Antrian direset' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
