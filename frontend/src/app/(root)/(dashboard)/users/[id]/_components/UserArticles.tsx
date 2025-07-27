import React from 'react';
import ArticleCard from './ArticleCard';

const UserArticles = async () => {
  return (
    <>
      {/* {articles.length > 0 ? (
        articles.map((article: ArticleWithSaveStatus) => <ArticleCard />)
      ) : (
        <p className="no-result">No articles yet</p>
      )} */}
      <ArticleCard />
    </>
  );
};

export default UserArticles;
