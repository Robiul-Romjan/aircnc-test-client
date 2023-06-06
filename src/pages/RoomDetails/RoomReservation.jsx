/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import Calender from "../../components/Calender/Calender";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../../components/Modal/BookingModal";
import {formatDistance} from 'date-fns'
import { addBooking, updateStatus } from "../../api/booking";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line no-unused-vars
const RoomReservation = ({ roomData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, role} = useContext(AuthContext);

    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpen(false)
    }

    const [value, setValue] = useState({
        startDate: new Date(roomData?.from),
        endDate: new Date(roomData?.to),
        key: 'selection'
    })
    

    const totalPrice = parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(" ")[0]) * roomData.price


    const [bookingInfo, setBookingInfo] = useState({
        guest: {name: user.displayName, email: user.email, image: user.photoURL},
        host: roomData.host.email,
        location : roomData.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: roomData.title,
        roomId: roomData._id,
        image: roomData.image
    });

    const handleSelect = () => {
        setValue({...value})
    };

    const modalHandler = () => {
        addBooking(bookingInfo)
        .then(data=> {
            updateStatus(roomData._id, true)
            .then(data => {
                console.log(data)
                closeModal()
                toast("Successfully booking the room");
                navigate("/dashboard/my-bookings")
            }) 
        })
    };

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <div className="flex justify-center">
                <Calender handleSelect={handleSelect} value={value} />
            </div>
            <hr />
            <div className='p-4'>
                <Button onClick={()=> setIsOpen(true)} disabled={roomData.host.email === user.email || roomData.booked} label='Reserve' />
            </div>
            <hr />
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>

            <BookingModal bookingInfo={bookingInfo} modalHandler={modalHandler}  isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
};

export default RoomReservation;