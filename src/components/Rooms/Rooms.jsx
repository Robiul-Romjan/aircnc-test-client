import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../Shared/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import { getAllRooms } from "../../api/rooms";

const Rooms = () => {
    // eslint-disable-next-line no-unused-vars
    const [params, setParams] = useSearchParams();
    const category = params.get('category');

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllRooms()
            .then(data => {
                if (category) {
                    const filterRoom = data.filter(room => room.category === category);
                    setRooms(filterRoom)
                } else {
                    setRooms(data)
                }
                setLoading(false)
            })
    }, [category])

    if (loading) {
        return <Loader />
    }

    return (
        <div className='mt-12'>
            {
                rooms && rooms.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {
                        rooms.map((room, i) => <Card key={i} room={room} />)
                    }
                </div> :
                    <Heading
                        title="No Rooms Available For This Category"
                        subtitle="Please select another category"
                        center={true}
                    />
            }
        </div>
    );
};

export default Rooms;