import { ReactNode} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ChildrenProps {
    children?: ReactNode;
}

export function ReactQueryProvider({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}