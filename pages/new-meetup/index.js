import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetupPage(){
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData){
        const response = await fetch('/api/new-meetup',{
            method : 'POST',
            body : JSON.stringify(enteredMeetupData),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        console.log(data) 
        router.push('/');   
    }
    
    
    return (
        <div>
             <Head>
                <title>Add a new Meetup</title>
                <meta name="description" content="Browse a huge list of highly active React Add ypur own meetups and create amazing networking opporturinity!"></meta>
            </Head>
            <NewMeetupForm
                onAddMeetup={addMeetupHandler}
            />
        </div>
    )
}

export default NewMeetupPage;