import React, { useEffect, useState } from 'react';
import './ArticleCard.css';


function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cleanHtmlContent(htmlContent) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const ArticleCard = (props) => {

  const [cleanContent, setCleanContent] = useState('');

  useEffect(() => {
    
    setCleanContent(cleanHtmlContent(props.content));
  }, [props.content]);

  const tagLabel = props.isTechNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

  return (
    <div className="article-card">
      <div className="article-info">
        <span className="article-date">{props.date}</span>
        <a href={props.url} className="article-source" target="_blank">{props.sourceName}</a>
      </div>
      <h3 className="article-title">{props.title}</h3>
      <div className="tag">{tagLabel}</div>
      <img src={props.picture} alt="Article" className="article-picture" />
      <p className="article-content">{cleanContent}</p>
      <div className="article-footer">
        <a href={props.url} className="button read-more" target="_blank" rel="noopener noreferrer">Читать в источнике</a>
        <span className="word-count">{props.wordCount} слова</span>
      </div>
    </div>
  );
};

export default ArticleCard;