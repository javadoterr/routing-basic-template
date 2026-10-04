import React from 'react'
import { useSearchParams } from 'react-router-dom';

const dummyArticles = [
  {id: 1, title:'Laptop Review', views: 250, category: 'electronics'},
  {id: 2, title:'Smartphone Tips', views: 300, category: 'electronics'},
  {id: 3, title:'Running Shoes', views: 100, category: 'fashion'},
  {id: 4, title:'Washing Machine Guide', views: 150, category: 'electronics'},
];

const Articles = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const category = searchParams.get('category');
  const sortByViews = searchParams.get('sortByViews');

  let filteredArticle = dummyArticles;


  const handleSortBy = ()=>{
    setsearchParams({
      sortByViews: "true",
      category:"electronics"
    });
  };

  if(category){
    filteredArticle = filteredArticle.filter((article) => article.category === category);
  }
  if(sortByViews === "true"){
    filteredArticle = [...filteredArticle].sort((a, b) => b.views - a.views);
  }

  return (
    <div>
        <h2>Articles 
          <p>SortBy:{sortBy ?? (sortByViews === 'true' ? 'views' :'none')} |
              Category: {category ?? 'All'}</p></h2>
        <button onClick={handleSortBy}>Sort By Views</button>
        <ul>
          {
            filteredArticle.map((article) =>(
              <li key={article.id}>{article.title} 
                        - {article.views} views
                        ({article.category})
                        </li>
            ))
          }
        </ul>
    </div>
  )
}

export default Articles;