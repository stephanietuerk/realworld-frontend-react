import { Outlet, useParams } from 'react-router-dom';
import { ArticleProvider } from '../../context/ArticleProvider';

export default function ArticleProviderLayout() {
  const { slug } = useParams();

  if (!slug) return null;

  return (
    <ArticleProvider slug={slug}>
      <Outlet />
    </ArticleProvider>
  );
}
