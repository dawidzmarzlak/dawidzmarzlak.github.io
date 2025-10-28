import { redirect } from 'next/navigation';

export default function RootPage() {
  // Default redirect to Polish locale for static export
  redirect('/pl');
}
