import Link from 'next/link';
import { allPosts, type Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { useTranslation, createTranslation } from '@/app/i18n';
import Like from './Like';

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t } = await createTranslation(lng, 'posts');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: '博客列表1',
      description: '这是博客列表页面1',
    },
  };
};

function PostCard({ lng, ...post }: Post & { lng: string }) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={`/${lng}${post.url}`}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {dayjs(post.date).format('DD/MM/YYYY')}
      </time>
      <Like lng={lng} />
    </div>
  );
}

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">{t('blogList')}</h1>
      {allPosts.map((post, idx) => (
        <PostCard key={idx} lng={lng} {...post} />
      ))}
    </div>
  );
}
