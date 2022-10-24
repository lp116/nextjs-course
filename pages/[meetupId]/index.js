import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://leeping13017:13017leeping@cluster0.sywpypj.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('myFirstDatabase')
    const meetups = await meetupsCollection.find({}, {_id:1}).toArray();
    client.close();
    return {
        fallback:true,
        paths : meetups.map(meetup=>({
            params : {
                meetupId : meetup._id.toString()
            }
         }))
        //[
        //     {
        //         params : {
        //             meetupId : 'm1',
        //         }
        //     },
        //     {
        //         params : {
        //             meetupId : 'm2',
        //         }
        //     }
        // ]
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://leeping13017:13017leeping@cluster0.sywpypj.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('myFirstDatabase')
    const selectedMeetup = await meetupsCollection.findOne({_id : ObjectId(meetupId)});
    client.close();
    return{
        props : {
            meetupData : {
                id : selectedMeetup._id.toString(),
                title : selectedMeetup.title,
                address : selectedMeetup.address,
                description : selectedMeetup.description
            }
        }
    }
}

function MeetupDetails(props){
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail
                // image={"https://www.garzablancaresort.com/blog/wp-content/uploads/2017/12/holiday-or-vacation-what-s-the-difference-puerto-vallarta.jpg"}
                // title={"First Meetup"}
                // address={"Some street 5, Some City"}
                // description={"This is first meetup"}
                image={props.image}
                title={props.title}
                address={props.address}
                description={props.description}
            />
        </Fragment>
    )
}

export default MeetupDetails;