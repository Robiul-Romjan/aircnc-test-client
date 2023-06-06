import { useLoaderData } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import RoomInfo from "./RoomInfo";
import RoomReservation from "./RoomReservation";


const RoomDetails = () => {
    const roomData = useLoaderData();

    return (
        <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
            <div className="flex flex-col gap-6">
                <Heading
                    title={roomData.title}
                    subtitle={roomData.location}
                />
                <div className='w-full  overflow-hidden rounded-xl'>
                    <img  className='object-cover md:h-[60vh] w-full' src={roomData.image} alt="" />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                    <RoomInfo roomData={roomData} />
                    <div className='mb-10 md:col-span-3 order-first md:order-last'>
                        <RoomReservation roomData={roomData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;