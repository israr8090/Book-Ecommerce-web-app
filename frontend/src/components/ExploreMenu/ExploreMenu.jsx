import React from 'react';
import './exploremenu.css';
import { menu_list} from '../../assets/assets';

function ExploreMenu({category, setCategory}) {

  return (
    <>
        <div className="explore-menu" id='explore-menu'>
            <h1>Explore our menu</h1>
            {/* <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae id a neque asperiores omnis quibusdam explicabo corporis, esse, tenetur quasi hic aspernatur tempore nemo aut culpa fuga pariatur doloremque aperiam!</p> */}
            <div className="explore-menu-list">
                { menu_list.map((item, index) => {
                        return (
                            <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} className="explore-menu-list-item" key={index}>
                                <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p className={category===item.menu_name ? "text-menu" : ""}>{item.menu_name}</p>
                            </div>
                        )
                    })}
            </div>
             <hr />
        </div>
    </>
  )
}

export default ExploreMenu