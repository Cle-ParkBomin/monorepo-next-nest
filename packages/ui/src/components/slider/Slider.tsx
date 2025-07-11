import React, { useCallback, useEffect, useRef, useState } from 'react';

import Tooltip from '@ui/components/modal/Tooltip';

interface SliderProps {
  amount: number;
  total: number;
  onChange?: (amount: number) => void;
  isNumber?: boolean;
  isDisabled?: boolean;
  tooltipText?: string;
}

export default function Slider({
  amount,
  total,
  onChange,
  isNumber = false,
  isDisabled = false,
  tooltipText,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const percent = (amount / total) * 100;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const variantStyle = {
    default: {
      wrapper: 'cursor-pointer',
      fill: 'bg-primary-500',
      unfill: 'bg-grey-300',
      hover: 'hover:bg-grey-950/8',
      handler: 'cursor-pointer border-primary-500 hover:border-primary-600',
    },
    disabled: {
      wrapper: '',
      fill: 'bg-grey-300',
      unfill: 'bg-grey-200',
      hover: '',
      handler: 'border-grey-300',
    },
  };

  const variantKey = isDisabled ? 'disabled' : 'default';

  const calculatePercent = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !onChange) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      onChange(Math.round(newValue));
    },
    [onChange],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsOpen(false);
  };

  const handleClickBar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    calculatePercent(e.clientX);
  };

  function getSliderSteps(max: number, steps: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < steps - 1; i++) {
      result.push(Math.round((max / (steps - 1)) * i));
    }
    result.push(max);
    return result;
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 드래그 중 마우스 위치 기준으로 퍼센트 계산
      if (!isDragging || isDisabled) return;
      calculatePercent(e.clientX);
      setIsOpen(true);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, calculatePercent, isDisabled]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`relative flex w-full ${variantStyle[variantKey].wrapper}`}
      ref={sliderRef}
      onClick={handleClickBar} // div 태그는 클릭 가능한 요소가 아닙니다.
    >
      {/* slider bar */}
      <div
        className={`h-1.5 rounded-full ${variantStyle[variantKey].fill}`}
        style={{ width: `${percent}%` }}
      />
      <div className={`h-1.5 flex-1 rounded-full ${variantStyle[variantKey].unfill}`} />
      {/* slider number */}
      {isNumber &&
        getSliderSteps(total, 5).map((item) => (
          <div
            key={`slider_${item}`}
            className='absolute top-0 flex flex-col gap-1'
            style={{ left: `calc(${(item / total) * 100}%` }}
          >
            <div className={`h-1.5 w-0.5 ${![0, 100].includes(item) && 'bg-grey-400'}`} />
            <span className='-translate-x-1/2 transform text-12 leading-16 text-grey-500'>
              {item}
            </span>
          </div>
        ))}
      {/* slider handler */}
      <div
        className='absolute top-1/2 z-10 flex -translate-y-1/2 transform'
        style={{ left: `calc(${percent}% - 1rem)` }}
      >
        <div className='relative flex justify-center'>
          {/* tooltip */}
          {isOpen && (
            <div className='absolute bottom-7'>
              <Tooltip detail={tooltipText ?? `${percent}%`} />
            </div>
          )}
          <button
            className={`flex h-7 w-7 items-center justify-center rounded-full ${variantStyle[variantKey].hover}`}
            onMouseDown={() => !isDisabled && setIsDragging(true)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div
              className={`h-4 w-4 rounded-full border-2 bg-white ${variantStyle[variantKey].handler}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
