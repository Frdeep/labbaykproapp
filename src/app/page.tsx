// Root page redirects to the app home
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}
