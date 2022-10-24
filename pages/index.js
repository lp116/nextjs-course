import { Fragment } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first Meetup',
    image : 'https://www.garzablancaresort.com/blog/wp-content/uploads/2017/12/holiday-or-vacation-what-s-the-difference-puerto-vallarta.jpg',
    address : '5, road abc, xxx street',
    description : 'This is a first meetup'
  },
  {
    id: 'm2',
    title: 'A second Meetup',
    image : 'https://www.garzablancaresort.com/blog/wp-content/uploads/2017/12/holiday-or-vacation-what-s-the-difference-puerto-vallarta.jpg',
    address : '5, road abc, xxx street',
    description : 'This is a second meetup'
  }
]

export async function getStaticProps(){
  
    const client = await MongoClient.connect('mongodb+srv://leeping13017:13017leeping@cluster0.sywpypj.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('myFirstDatabase')
    const meetups = await meetupsCollection.find().toArray();
    return{
      props : {
        meetups : meetups.map(meetup => ({
          title : meetup.title,
          address : meetup.address,
          image : meetup.image,
          description : meetup.description,
          id : meetup._id.toString()
        }))
      },
      revalidate : 1
    }
}

function HomePage(){
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  
  // useEffect(()=>{
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // },[]);

  

  return(<div className={styles.content}>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse a huge list of highly active React meetups!"></meta>
    </Head>
    <MeetupList
      meetups={DUMMY_MEETUPS}
    />
  </div>);
}


// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return{
//     props : {
//       meetups : DUMMY_MEETUPS
//     },
//   }
// }

// export async function getStaticProps(){
//   return{
//     props : {
//       meetups : DUMMY_MEETUPS
//     },
//     revalidate : 1
//   }
// }

export default HomePage;
