import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import Container from './Container'; // Import the Container component

const Home = ({location}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  // Movie data
  const movies = [
    // Same movies array as in your Container component
    {
      title: 'VETTAIYAN',
      review : 9,
      rating: 'U/A',
      Genres :'Action,Drama',
      lang:'  Tamil',
      image: 'https://assetscdn1.paytm.com/images/cinema/Vettaiyan--608x800-e51b1660-8481-11ef-a9f3-bb0df457e7e9.jpg?format=webp&imwidth=576',
    },
    {
      title: 'LUBBER BANDHU',
      review : 9,
      rating: 'U/A',
      Genres :'Drama,Comedy',
      lang:   ' Tamil',
      image: 'https://assetscdn1.paytm.com/images/cinema/Lubber-pandhu-532bb140-7b05-11ef-8892-f397183e5623.jpg?format=webp&imwidth=576',
    },
    {
      title: 'G.O.A.T',
      review : 9,
      rating: 'U/A',
      Genres :'Drama,Comedy',
      lang:' Tamil ,Malayalam,Hindi',
      image: 'https://assetscdn1.paytm.com/images/cinema/GOAT-608x800-2-8b060d60-66b8-11ef-8bfd-85c2f3bcaac6.jpg?format=webp ',
    },
    {
      title: 'MEIYAZHAGAN',
      review : 7,
      rating: 'U/A',
      Genres :'Drama,Comedy',
      lang:  'Tamil',
      image: 'https://assetscdn1.paytm.com/images/cinema/Meiyazhagan-608x800-870a5280-4439-11ef-b2dc-a9298206546d.jpg?format=webp&imwidth=576',
    },
    {
      title: 'VENOM :The Last Dance',
      review : 9,
      rating: 'U ',
      Genres :'Action,Thriller',
      lang:'  Tamil ,English',
      image: 'https://assetscdn1.paytm.com/images/cinema/162917-b0808581-3e85-11ef-99b5-d35223c98590.jpg?format=webp&imwidth=582',
    },
    {
      title: 'AMARAN',
      review : 7,
      rating: 'U/A',
      Genres :'Action,Drama',
      lang:' Tamil,Malayalam,Hindi',
      image: 'https://assetscdn1.paytm.com/images/cinema/Amaran-608x800-3b60ca10-4594-11ef-83ec-5d141d381675.jpg?format=webp&imwidth=582',
    },
    {
      title: 'BLOODY BEGGAR',
      review : 7,
      rating: 'U/A',
      Genres :'Drama,Comedy',
      lang:'  Tamil,Telugu,Malayam',
      image: 'https://assetscdn1.paytm.com/images/cinema/blodd-ed697430-6f76-11ef-9863-5b37bda1f409.jpeg?format=webp&imwidth=582',
    },
    {
      title: 'KANGUVA',
      review : 9,
      rating: 'U',
      Genres :'Action,Drama',
      lang:'  Tamil,Hindi',
      image: 'https://assetscdn1.paytm.com/images/cinema/Kanguva---608x800-2f6be8e0-5933-11ef-8af8-5bfae72a9884.jpg?format=webp&imwidth=582',
    },
    {
      title: 'SMALL THINGS LIKE THESE',
      review : 7,
      rating: 'U/A ',
      Genres :'Drama',
      lang:'  English',
      image: 'https://assetscdn1.paytm.com/images/cinema/small_things_like_these--608x800-4dd64360-79af-11ef-a377-855d2183778a.jpg?format=webp&imwidth=582',
    },
    {
      title: 'LUCKY BASKAR',
      review : 5,
      rating: 'U/A ',
      Genres :'Action',
      lang:'  Tamil , Malayalam,Telugu',
      image: 'https://assetscdn1.paytm.com/images/cinema/164851-aa6a8550-4296-11ef-99b5-d35223c98590.jpg?format=webp&imwidth=582',
    },
    {
      title: 'DEVARA',
      review : 7,
      rating: 'U/A ',
      Genres :'Drama',
      lang:'  Tamil ,Malayalam ,Telugu,Hindi',
      image: 'https://assetscdn1.paytm.com/images/cinema/devaraIMAX-608x800%20(1)-dc242cd0-7c9e-11ef-816e-6191a0b38ee0.jpg?format=webp',
    },
    {
      title: 'BLACK',
      review : 3,
      rating: 'U/A ',
      Genres :'Horror',
      lang:'  Tamil',
      image: 'https://assetscdn1.paytm.com/images/cinema/_BLACK-Link--608x800-414e41b0-8481-11ef-a9f3-bb0df457e7e9.jpg?format=webp&imwidth=576',
    },
    // Add more movies here...
  ];
  return (
    <div className="home-container">
      <h1>Welcome to the Movie Booking App</h1>
      <p>Explore movies, book tickets, and more!</p>

      <div className="slider">
        <div className="slider-track">
          {/* Add 5 movie images */}
          <div className="slide"><img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202403/jr-ntr-190234525-16x9_0.jpg?VersionId=9vKe8vG0o0gNFgq87vGMJvC4CMM8xy__ " alt="Movie 1" /></div>
          <div className="slide"><img src="https://i.ytimg.com/vi/AdHLDvPH8BU/maxresdefault.jpg" alt="Movie 2" /></div>
          <div className="slide"><img src="https://imgeng.jagran.com/images/2024/09/16/article/image/GOAT%20(10)-1726452003334.jpg" alt="Movie 3" /></div>
          <div className="slide"><img src="https://static.moviecrow.com/marquee/coolie-characters-upendra-joins-rajinikanth-films-cast-as-kaleesha/233817_thumb_665.jpg" alt="Movie 4" /></div>
          <div className="slide"><img src="https://static.india.com/wp-content/uploads/2024/04/Kanguva-Suriya-Sivakumar-.png" alt="Movie 5" /></div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <br />
      <br/>
      <div className="container1">
        <select id="genres" className="selection-input" onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>
        <div className="container2">
        <select id="languages" className="selection-input" onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="Tamil">Tamil</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Hindi">Hindi</option>
          
        </select>
        </div>
        <div className="container3">
        <select id="rating" className="selection-input" onChange={(e) => setSelectedRating(e.target.value)}>
          <option value="">Rating</option>
          <option value="3">3 &#9733;</option>
          <option value="5">5 &#9733;</option>
          <option value="7">Above 7 &#9733;</option>
          <option value="9">Above 9 &#9733;</option>
        </select>

      </div>
      

      {/* Render the movie booking container below the search and filters */}
      <Container 
        movies={movies} 
        searchTerm={searchTerm} 
        selectedGenre={selectedGenre} 
        selectedLanguage={selectedLanguage} 
        selectedRating={selectedRating} 
        location={location}
      />
    </div>
  );
};

export default Home;