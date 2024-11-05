import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom'

const apiKey = import.meta.env.VITE_API_KEY;
// bei VITE projeckten muss .env so importiert werden, anders geht es nicht

export default function Home() {

  const [data, setData] = useState([]);
  const [topArticle, setTopArticle] = useState([]);

  const russianAlphabet = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
    'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
    'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // keine good practice mit dem hardgecodeten API key, aber wenigstens nicht direkt sichtbar
        // soll sonst verschlüsselt im backend auf dem server liegen und nur so oft wie nötig benutzt und übermittelt werden, da es ein sicherheitsrisiko ist


        // mit hardgecodetem API key funktioniert es

        const response = await fetch(`https://gnews.io/api/v4/search?q=cs2&apikey=${apiKey}`);
        const data = await response.json();
        // console.log(data);


        // filtert die Artiekl heraus die russische Schriftzeichen enthalten
        const filteredArticles = data.articles.filter(article => {
          // kombniniert den content von title description und content
          // durch concatenating aller characters zu einem string
          // ${article.title || ''} außdruck bedeutet wenn die property existiert dann wird sie benutzt, wenn nicht, wird ein leerer string genutzt
          const combinedText = `${article.title || ''} ${article.description || ''} ${article.content || ''}`;

          // der NOT operator ❗ bezieht sich auf das ergebnis der some methode
          // diese checkt ob mindestens ein element in einem array eine kondition erfüllt
          // hier wird geprüpft ob ein character von combinedText in russianAlpha enthalten ist.
          // NICHT russianAlpha in combinedText SONDERN ANDERS HERUM 🧠🤌
          return !combinedText.split('').some(char => russianAlphabet.includes(char));
        });

        // anweisung falls keine artikel mit den kriterien gefunden werden
        if (filteredArticles.length === 0) {
          console.warn('No articles found in English. Sorry.');
        } else {
          setData(filteredArticles);
          // console.log(filteredArticles);
          // console.log(filteredArticles[0]); // checken welcher teil gebraucht wird
          setTopArticle(filteredArticles[0]);
        }
      } catch (error) {
        console.error('Unable to fetch data from API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <h2>Top News</h2>
      <div className={styles.heroWrapper}>
        {data.slice(0, 2).map((article, index) => (
          <div className={styles.hero} key={index}>
            {/* Mit MongoDB objectID nutzen für den key in Zeile 69 */}
            <a href={article.url} target="_blank" rel="noopener noreferrer" key={index}>
              <h4>{article.title}</h4>
              <img src={article.image} alt="top article image" />
            </a>
          </div>
        ))}
      </div>
      <div className={styles.progress}>
        <NavLink to="/stats">
          <button className={styles.btn}>Track Progress</button>
        </NavLink>
      </div>
    </div>
  );
}

