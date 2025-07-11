import { TabType } from '@ui/components/tab/Tab';
import { FaCheck } from 'react-icons/fa6';

interface SegmentControlProps<T extends string> {
  value: TabType<T>;
  valueList: TabType<T>[];
  onClick?: (value: TabType<T>) => void;
  isIcon?: boolean;
  isDisabled?: boolean;
}

export default function SegmentControl<T extends string>({
  value,
  valueList,
  onClick,
  isIcon = false,
  isDisabled = false,
}: SegmentControlProps<T>) {
  const variantStyle = {
    check: { wrapper: 'border-grey-300 bg-grey-200', button: 'cursor-pointer bg-grey-0' },
    uncheck: {
      wrapper: 'border-grey-300 bg-grey-200',
      button: 'cursor-pointer text-grey-500 bg-transparent hover:bg-grey-950/4 hover:text-grey-700',
    },
    disabled: {
      wrapper: 'border-grey-200 bg-grey-100',
      button: 'cursor-not-allowed text-grey-300 bg-transparent',
    },
  };

  return (
    <div
      className={`flex flex-1 flex-wrap justify-between gap-1 rounded-sm border-1 p-1 ${variantStyle[isDisabled ? 'disabled' : 'check'].wrapper}`}
    >
      {valueList?.map((item) => (
        <button
          key={`SegmentControl_${item.key}`}
          className={`flex flex-1 items-center justify-center gap-1 rounded-xs px-4 py-2 text-14 leading-20 ${variantStyle[isDisabled ? 'disabled' : value.key === item.key ? 'check' : 'uncheck'].button}`}
          onClick={() => onClick && onClick(item)}
          disabled={isDisabled}
        >
          {isIcon && <FaCheck size={16} />}
          <p>{item.value}</p>
        </button>
      ))}
    </div>
  );
}
