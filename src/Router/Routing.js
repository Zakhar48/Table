import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const Body = React.lazy(() => import('../users/Body'))
const Get = React.lazy(() => import('../users/UsersTable'))


function Routing() {
  return (
    <>
      <Suspense fallback={<div className="spinner-border" role="status"><span className="sr-only"></span></div>}>
        <Routes>
          <Route path='/' element={<Get />} />
          <Route path='/body/:id' element={<Body />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Routing;
