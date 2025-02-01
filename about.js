```javascript
// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <Link href='/about'>
        <a>Go to About Page</a>
      </Link>
    </div>
  );
}
```
```javascript
// pages/about.js

export default function About() {
  // This will cause a client-side error if the data fetching fails.
  const data = await fetch('/api/data').then(res => res.json());

  return (
    <div>
      <h1>About Page</h1>
      {/* This will only render if the fetch is successful. */}
      {data && <p>Data from API: {JSON.stringify(data)}</p>}
    </div>
  );
}
```
```javascript
// pages/api/data.js

export default async function handler(req, res) {
  // Simulate a network error sometimes.
  if (Math.random() < 0.5) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
  res.status(200).json({ message: 'Data from API' });
}
```