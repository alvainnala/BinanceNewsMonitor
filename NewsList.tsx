import React from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
}

interface NewsListProps {
  articles: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <p>Published Date: {article.publishedDate}</p>
        </li>
      ))}
    </ul>
  );
};

export default News