import { useContext, useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import { uploadImage } from "../../../api/uploadImage";
import { AuthContext } from "../../../providers/AuthProvider";


const AddRoom = () => {
    const {user} = useContext(AuthContext);

    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        ;
        const form = e.target;
        const location = form.location.value;
        const title = form.title.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = form.price.value;
        const total_guest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const category = form.category.value;

        const image = form.image.files[0];
        // upload image
        uploadImage(image)
        .then(data => {
            const roomData = {
                host: {
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email
                },
                image: data.data.display_url,
                location,
                from,
                to,
                title,
                price,
                total_guest,
                bedrooms,
                bathrooms,
                description,
                category
            }
            // post room data to mongodb
            fetch("http://localhost:5000/rooms", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(roomData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
         
    }

    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }

    const handleDates = ranges => {
        setDates(ranges.selection)
    }

    return (
        <AddRoomForm handleSubmit={handleSubmit} loading={loading} uploadButtonText={uploadButtonText} handleImageChange={handleImageChange} dates={dates} handleDates={handleDates} />
    );
};

export default AddRoom;