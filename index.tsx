import React, { lazy, Suspense } from 'react';

const LazyLoadedComponent = lazy(() => import('./SomeComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyLoadedComponent />
  </Suspense>
);
```

```jsx
import React, { useEffect } from 'react';

const TimedComponent = () => {
  useEffect(() => {
    const timer = setTimeout(() => console.log("Timer completed"), 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return <div>Component with Timeout</div>;
};
```

```jsx
import React, { useCallback } from 'react';

const MyComponent = () => {
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Dependencies

  return <button onClick={handleClick}>Click Me</button>;
};
```

```jsx
import React, { memo } from 'react';

const MyMemoizedComponent = memo(function MyComponent(props) {
  // Component logic
});