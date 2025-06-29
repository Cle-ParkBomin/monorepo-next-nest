import { Dispatch } from 'react';

import Badge, { BadgeColors } from '@repo/ui/src/components/badge/Badge';
import Button from '@repo/ui/src/components/button/Button';
import LinkButton from '@repo/ui/src/components/button/LinkButton';
import CheckBox from '@repo/ui/src/components/radio/CheckBox';
import { popupAtom, toastAtom } from '@ui/jotai/modalAtoms';
import { SetStateAction, useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { IoWarning } from 'react-icons/io5';

import ProgramAccordion from '@/app/[locale]/(protected)/hmgma/ProgramAccordion';
import { BrainEnum } from '@/graphql/generated/graphql';
import useClipboard from '@/hooks/useClipboard';
import { pcListType } from '@/types/graphql';
import { formatTimestampToDate } from '@/utils/format';

interface RenderCellProps {
  row: pcListType;
  rowKey: keyof pcListType;
  isOpenProgram: boolean;
  selectedPcs: pcListType[];
  setSelectedPcs: Dispatch<SetStateAction<pcListType[]>>;
}

export default function RenderCell({
  row,
  rowKey,
  isOpenProgram,
  selectedPcs,
  setSelectedPcs,
}: RenderCellProps) {
  const t = useTranslations('pc');
  const tHMGMA = useTranslations('hmgma');
  const router = useRouter();

  const copyToClipboard = useClipboard();

  const [, setPopup] = useAtom(popupAtom);
  const [, setToast] = useAtom(toastAtom);
  const isRowSelected = selectedPcs.some((item) => item.id === row.id);

  switch (rowKey) {
    case 'serialNumber':
      return (
        <div className='flex items-center gap-2'>
          <CheckBox
            isCheck={isRowSelected}
            onClick={() =>
              setSelectedPcs((prev) => {
                const alreadySelected = prev.some((item) => item.id === row.id);
                if (alreadySelected) {
                  return prev.filter((item) => item.id !== row.id);
                } else {
                  return [...prev, row];
                }
              })
            }
          />
          <LinkButton
            value={row[rowKey].toString()}
            onClick={() => {
              router.push(`/hmgma/${row.id}`);
            }}
          />
        </div>
      );

    case 'line':
    case 'position':
    case 'process':
      return (
        <Badge value={row[rowKey].name} color={BadgeColors[row[rowKey].id % BadgeColors.length]} />
      );

    case 'brain':
      return (
        <Badge value={row[rowKey]} color={row[rowKey] === BrainEnum.Main ? 'red' : 'yellow'} />
      );

    case 'isLicense':
      return (
        <CheckBox
          isCheck={row[rowKey]}
          onClick={() =>
            setPopup({
              visible: true,
              title: tHMGMA('license-popup-title'),
              content: tHMGMA('license-popup-content', { state: row[rowKey].toString() }),
              onCancel: () => {
                return;
              },
              onConfirm: () =>
                setToast({
                  visible: true,
                  text: tHMGMA('feature-unavailable', { feature: 'License' }),
                  icon: 'warn',
                }),
              cancelLabel: tHMGMA('no'),
              confirmLabel: tHMGMA('yes'),
            })
          }
          style='primary500'
        />
      );

    case 'isNetwork':
      return (
        <p
          className={`flex h-full flex-1 items-center p-2 ${row[rowKey] === false && 'text-primary-600'}`}
        >
          {tHMGMA('on&off', { state: row[rowKey].toString() })}
        </p>
      );

    case 'isProgram':
      return (
        <div
          className={`flex h-full flex-1 items-center gap-1 p-2 ${row[rowKey] === false && 'bg-primary-500 text-grey-0'}`}
        >
          {!row[rowKey] && <IoWarning className='animate-pulse' />}
          <p>{tHMGMA('on&off', { state: row[rowKey].toString() })}</p>
        </div>
      );

    case 'anydeskIp':
      return (
        <LinkButton
          value={row[rowKey].toString()}
          onClick={() => {
            void copyToClipboard(t('anydeskIp'), row[rowKey].toString());
            window.location.href = `anydesk:${row[rowKey]}`;
          }}
        />
      );

    case 'launcherUpdatedAt':
      return (
        <div className='flex flex-col gap-1'>
          <p>{formatTimestampToDate(row[rowKey])}</p>
          <Button
            value={tHMGMA('update-button')}
            size='s'
            onClick={() => {
              setToast({
                visible: true,
                text: tHMGMA('feature-unavailable', { feature: 'Launcher Update' }),
                icon: 'warn',
              });
            }}
          />
        </div>
      );

    case 'pcPrograms':
      return <ProgramAccordion list={row[rowKey]} isAllOpen={isOpenProgram} />;
  }

  return null;
}
