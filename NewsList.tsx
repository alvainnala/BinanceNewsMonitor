import React, { useState } from 'react';

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
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter articles based on the search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search articles by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      />
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <p>Published Date: {article.publishedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;