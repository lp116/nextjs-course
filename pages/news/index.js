import React, { Fragment } from 'react';
import Link from 'next/link';

function NewsPage(){
    return (
      <Fragment>
        <h1>The News Page</h1>  
        <ul>
          <li><Link href="/news/nextjs-is-a-great-framework">Next Js bla bla bla</Link></li>
          <li>Lalala</li>
        </ul>
      </Fragment>
    )
      
    
  }
  
  export default NewsPage;