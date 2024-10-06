'use client';

import { useEffect, useRef } from 'react';
import { init, WalineInitOptions, WalineInstance } from '@waline/client';

import '@waline/client/style';
import './waline.css';

const Waline = (props: WalineInitOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  return <div ref={containerRef} />;
};

export default Waline;
