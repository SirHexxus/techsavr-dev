import { useAuth } from '@/lib/auth';
import useSWR from 'swr';
// import styles from '../styles/Home.module.css';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  const isPaidAccount = user?.stripeRole;

  // console.log(data);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={false} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {/* <UpgradeEmptyState /> */}
      {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  );
}
