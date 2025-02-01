```javascript
// pages/about.js
import { useState, useEffect } from 'react';

export default function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>About Page</h1>
      {data && <p>Data from API: {JSON.stringify(data)}</p>}
    </div>
  );
}
```
```javascript
// pages/api/data.js
// Remains unchanged
export default async function handler(req, res) {
  if (Math.random() < 0.5) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
  res.status(200).json({ message: 'Data from API' });
}
```