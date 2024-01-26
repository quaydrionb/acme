import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import InvoicesTable from '@/app/ui/invoices/table'; // Assuming you have an InvoicesTable component
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer',
};

export default function Page() {
  const query = '';
  const currentPage = 1;
  const totalPages = 10;

  return (
    <div className="w-full">
      <Suspense fallback={<TableRowSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
