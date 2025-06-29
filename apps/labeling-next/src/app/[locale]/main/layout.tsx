import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className='flex flex-1'>{children}</div>;
}
