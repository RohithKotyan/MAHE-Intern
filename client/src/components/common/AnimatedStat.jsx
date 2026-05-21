import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

export default function AnimatedStat({ value, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -50px 0px", once: false });
  const [displayValue, setDisplayValue] = useState(
    typeof value === 'number' ? `${prefix}0${suffix}` : value
  );

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          const formatted = Number(v).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        }
      });
      return () => controls.stop();
    } else {
      setDisplayValue(`${prefix}0${suffix}`);
    }
  }, [isInView, value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className="inline-block transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] cursor-default">
      {displayValue}
    </span>
  );
}
