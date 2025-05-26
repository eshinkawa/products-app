import { Stack, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { path } = Linking.parse(event.url);

      if (path?.startsWith('product/')) {
        const id = path.split('/')[1];
        if (id) router.push(`/product/${id}`);
      } else if (path?.startsWith('category/')) {
        const category = path.split('/')[1];
        if (category) router.push(`/category/${category}`);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Product Details' }} />
      </Stack>
    </QueryClientProvider>
  );
}
