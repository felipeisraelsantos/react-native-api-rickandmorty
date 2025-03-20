import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Busca from '@/components/busca';

const queryClient = new QueryClient();

export default function Buscar() {
  return (
    <QueryClientProvider client={queryClient}>
      <Busca />
    </QueryClientProvider>
  );
}