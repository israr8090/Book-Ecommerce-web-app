import React, { useContext } from 'react';
import './book.css';
import { StoreContext } from '../../context/StoreContext';
import BookItem from '../BookItem/BookItem';

function Bookdisplay({ category }) {

    const { book_list } = useContext(StoreContext);  //--book_list from store

    return (
        <>
            <div className="book-display" id="book-display">
                <h2>Top Books is Only For You</h2>
                <div className="book-display-list">
                    {
                        book_list.map((item, index) => {
                            // {console.log((category, item._id))}
                            if (category === "All" || category === item.category) {
                                return <BookItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Bookdisplay;