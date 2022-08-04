import styles from '../styles/Listing.module.scss'
import utils from '../styles/utils.module.scss'
import Image from 'next/future/image'
import Tag from './Tag'
import { useState, useEffect } from 'react';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';

export default function Listing({data, order}){
    //to remove tag data from name and remove all caps
    const name = data.name.split("[")[0].toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    const derivative = data.derivative.split("[")[0];
    
    const [favourite, setFavourite] = useState(0);

    const monthly_price = (data.price/12).toFixed(2);

    function init_favourite(listing_id){
        if(!localStorage.getItem('user_favourites')){
            localStorage.setItem('user_favourites', JSON.stringify({[listing_id]: 0}))
            return 0;
        }
        let user_favourites = JSON.parse(localStorage.getItem('user_favourites'))
        if(user_favourites[listing_id] == undefined){
            user_favourites = {...user_favourites, ...{[listing_id]: 0}}
            localStorage.setItem('user_favourites', JSON.stringify(user_favourites))
            return 0;
        }
        if(user_favourites[listing_id]){
            return 1;
        }else if(!user_favourites[listing_id]){
            return 0;
        }

    }

    function updateFavourite(){
        let stored_favourites = JSON.parse(localStorage.getItem('user_favourites'));
        stored_favourites[data.advertisable_id] = (1-favourite);
        localStorage.setItem("user_favourites", JSON.stringify(stored_favourites))
        setFavourite(1-favourite)
    }

    useEffect(()=>{
        setFavourite(init_favourite(data.advertisable_id));
    }, [])

    return(
        <div className={styles.card}>
            <div className={styles.gallery}>
                <Image
                    src={data.media_urls[0].medium}
                    alt={data.name}
                    width="500"
                    height="330"
                    priority ={order < 6 ? true: false}
                />
                <div className={styles.listing_tag_container}>
                    <Tag data={data.advert_classification}/>
                </div>
                <div className={styles.spec_list_container}>
                    <div className={styles.spec_list}>
                        {
                            data.feature_classification[0].map((tag, index)=>
                                <Tag key={index} data={tag} size="md"/>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.details}>
                <h5 className={styles.name}>{name}</h5>
                <h6 className={styles.derivative}>{derivative}</h6>
                <div class={styles.card_footer}>
                    <a className={styles.pricing_button}>
                        <p className={styles.price}><span>£{monthly_price}</span>/mo (pcp)</p>
                        <p className={styles.contract_type}>£{data.price}</p>
                    </a>
                    <a className={styles.view_button}>
                        View
                    </a>
                </div>
                <button className={styles.favourite} onClick={updateFavourite}>
                {
                    favourite ?
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#7572FF"/>
                        </svg>
                    :
                        <svg width="18" height="18" viewBox="0 0 18 18" fill='none' xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.04894 1.92705C8.3483 1.00574 9.6517 1.00574 9.95106 1.92705L11.2451 5.90983C11.379 6.32185 11.763 6.60081 12.1962 6.60081H16.3839C17.3527 6.60081 17.7554 7.84043 16.9717 8.40983L13.5838 10.8713C13.2333 11.126 13.0866 11.5773 13.2205 11.9894L14.5146 15.9721C14.8139 16.8934 13.7595 17.6596 12.9757 17.0902L9.58778 14.6287C9.2373 14.374 8.7627 14.374 8.41221 14.6287L5.02426 17.0902C4.24054 17.6596 3.18607 16.8934 3.48542 15.9721L4.7795 11.9894C4.91338 11.5773 4.76672 11.126 4.41623 10.8713L1.02827 8.40983C0.244561 7.84043 0.647338 6.60081 1.61606 6.60081H5.8038C6.23703 6.60081 6.62099 6.32185 6.75486 5.90983L8.04894 1.92705Z" stroke="black"/>
                        </svg>
                }

                </button>
            </div>
        </div>
    )
}